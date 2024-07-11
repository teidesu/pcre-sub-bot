import { assertEquals, assertThrows } from '@std/assert'
import {
    findExpressionsInMessage,
    parseExpression,
    processExpressions,
} from './expression.ts'

Deno.test('parseExpression', async (t) => {
    await t.step('parses without trailing slash', () => {
        assertEquals(parseExpression('s/foo/bar'), {
            pattern: 'foo',
            replacement: 'bar',
            global: false,
            flags: undefined,
        })
    })

    await t.step('parses with trailing slash', () => {
        assertEquals(parseExpression('s/foo/bar/'), {
            pattern: 'foo',
            replacement: 'bar',
            global: false,
            flags: '',
        })
    })

    await t.step('parses with flags', () => {
        assertEquals(parseExpression('s/foo/bar/g'), {
            pattern: 'foo',
            replacement: 'bar',
            global: true,
            flags: '',
        })

        assertEquals(parseExpression('s/foo/bar/gix'), {
            pattern: 'foo',
            replacement: 'bar',
            global: true,
            flags: 'ix',
        })

        assertEquals(parseExpression('s/foo/bar/ix'), {
            pattern: 'foo',
            replacement: 'bar',
            global: false,
            flags: 'ix',
        })
    })
})

Deno.test('findExpressionsInMessage', async (t) => {
    await t.step('finds expressions', () => {
        const message = 's/not an expr\ns/an/expr\ns/another/expr/g'

        assertEquals(findExpressionsInMessage(message), [
            {
                pattern: 'an',
                replacement: 'expr',
                global: false,
                flags: undefined,
            },
            {
                pattern: 'another',
                replacement: 'expr',
                global: true,
                flags: '',
            },
        ])
    })
})

Deno.test('processExpressions', async (t) => {
    await t.step('applies simple expressions', () => {
        assertEquals(
            processExpressions('hello world!', [
                {
                    pattern: 'world',
                    replacement: '',
                    global: false,
                    flags: undefined,
                },
            ]),
            'hello !',
        )
    })

    await t.step('applies global expressions', () => {
        assertEquals(
            processExpressions('hello world world world!', [
                {
                    pattern: ' world',
                    replacement: '',
                    global: true,
                    flags: undefined,
                },
            ]),
            'hello!',
        )
    })

    await t.step('applies case-insensitive expressions', () => {
        assertEquals(
            processExpressions('hello World world WORLD!', [
                {
                    pattern: 'world',
                    replacement: 'foo',
                    global: true,
                    flags: 'i',
                },
            ]),
            'hello foo foo foo!',
        )
    })

    await t.step('applies expressions with substitutions', () => {
        assertEquals(
            processExpressions('hello world!', [
                {
                    pattern: 'worl(d)',
                    replacement: '$1',
                    global: false,
                    flags: undefined,
                },
            ]),
            'hello d!',
        )
    })

    await t.step('throws on invalid expressions', () => {
        assertThrows(() => {
            processExpressions('hello world!', [
                {
                    pattern: 'worl(d',
                    replacement: '$2',
                    global: false,
                    flags: undefined,
                },
            ])
        }, 'PCRE2_ERROR_MISSING_CLOSING_PARENTHESIS')
    })
})
