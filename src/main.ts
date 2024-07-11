import { Dispatcher, filters } from '@mtcute/dispatcher'
import { TelegramClient } from '@mtcute/deno'

import { compile, free, substitute } from "./bindings.ts";
import { findExpressionsInMessage } from "./expression.ts";
import * as env from './env.ts'

const tg = new TelegramClient({
    apiId: env.API_ID,
    apiHash: env.API_HASH,
    storage: 'bot-data/session',
})

const dp = Dispatcher.for(tg)

dp.onNewMessage(filters.reply, async (msg) => {
    const exprs = findExpressionsInMessage(msg.text)
    if (exprs.length === 0) {
        return
    }

    const repliedMsg = await msg.getReplyTo()
    if (!repliedMsg || !repliedMsg.text) return

    let text = repliedMsg.text
    for (const expr of exprs) {
        let compiled
        try {
            compiled = compile(expr.pattern, expr.flags)
        } catch (e) {
            await msg.replyText(`Failed to compile expression ${expr.pattern}\n\n${e.message}`)
            return
        }

        try {
            text = substitute(compiled, text, expr.replacement, expr.global)
        } catch (e) {
            await msg.replyText(`Failed to substitute expression ${expr.pattern}\n\n${e.message}`)
            return
        }
        
        free(compiled)
    }

    await tg.replyText(repliedMsg, text)
})

const user = await tg.start({ botToken: env.BOT_TOKEN })
console.log('Logged in as', user.username)
