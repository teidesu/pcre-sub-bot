import { unknownToError } from "@fuman/utils";
import { compile, free, substitute } from './bindings.ts'
import { RepliedMessageInfo } from "@mtcute/deno";

interface Expression {
    pattern: string
    replacement: string
    global: boolean
    flags?: string
}

export function splitWithEscape(
    str: string,
    separator: string,
    esc = '\\',
): string[] {
    const parts: string[] = []
    let current = ''
    let escaped = false

    for (const char of str) {
        if (char === separator && !escaped) {
            parts.push(current)
            current = ''
        } else {
            current += char
            escaped = char === esc
        }
    }

    parts.push(current)

    return parts
}

export function parseExpression(expr: string): Expression | null {
    const parts = splitWithEscape(expr, '/')
    if (parts[0] !== 's') return null

    // parts: [prefix, pattern, replacement, flags?]
    //         0       1        2            3

    let flags: string | undefined
    let global = false
    if (parts.length === 3) {
        // no trailing slash, assume no flags
        flags = undefined
    } else if (parts.length === 4) {
        flags = parts[3]

        const gIdx = flags.indexOf('g')
        if (gIdx !== -1) {
            global = true
            flags = flags.slice(0, gIdx) + flags.slice(gIdx + 1)
        }
    } else {
        return null
    }

    return {
        pattern: parts[1],
        replacement: parts[2],
        global,
        flags,
    }
}

export function findExpressionsInMessage(message: string): Expression[] {
    const lines = message.split('\n')
    const expressions: Expression[] = []

    lines.forEach((line) => {
        if (line.startsWith('s/')) {
            const expr = parseExpression(line)

            if (expr) {
                expressions.push(expr)
            }
        }
    })

    return expressions
}

export class ExpressionError extends Error {
    constructor(
        expr: Expression,
        when: 'compile' | 'substitute',
        message: string,
    ) {
        super(`Failed to ${when} expression ${expr.pattern}\n\n${message}`)
    }
}

export function processExpressions(
    text: string,
    expressions: Expression[],
): string {
    let newText = text
    for (const expr of expressions) {
        let compiled
        try {
            compiled = compile(expr.pattern, expr.flags)
        } catch (e) {
            throw new ExpressionError(expr, 'compile', unknownToError(e).message)
        }

        try {
            newText = substitute(compiled, newText, expr.replacement, expr.global)
        } catch (e) {
            free(compiled)
            throw new ExpressionError(expr, 'substitute', unknownToError(e).message)
        }

        free(compiled)
    }

    return newText
}

export function processExpressionsWithMessage(
    fullText: string,
    replyTo: RepliedMessageInfo,
    expressions: Expression[],
): string {
    if (!replyTo.isQuote) {
        return processExpressions(fullText, expressions)
    }

    // apply expressions to just the quoted slice, then splices it back into the full text
    const start = replyTo.quoteOffset ?? fullText.indexOf(replyTo.quoteText)
    if (start === null) {
        // can't reconcile (message edited past recognition) — return just the substituted quote
        return processExpressions(replyTo.quoteText, expressions)
    }

    const before = fullText.slice(0, start)
    const after = fullText.slice(start + replyTo.quoteText.length)
    return before + processExpressions(replyTo.quoteText, expressions) + after
}
