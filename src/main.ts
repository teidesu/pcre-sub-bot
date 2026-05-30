import { CallbackDataBuilder, Dispatcher, filters } from '@mtcute/dispatcher'
import { BotInlineMessage, BotKeyboard, proxyTransportFromUrl, TcpTransport, TelegramClient } from '@mtcute/deno'

import { findExpressionsInMessage, processExpressions } from './expression.ts'
import * as env from './env.ts'
import { unknownToError } from "@fuman/utils"

const tg = new TelegramClient({
    apiId: env.API_ID,
    apiHash: env.API_HASH,
    transport: env.HTTP_PROXY ? proxyTransportFromUrl(env.HTTP_PROXY) : new TcpTransport(),
    storage: 'bot-data/session',
    updates: {
        catchUp: env.IS_PRODUCTION,
    }
})

const dp = Dispatcher.for(tg)
const DeleteError = new CallbackDataBuilder('del', 'userId')

dp.onNewMessage(filters.reply, async (msg) => {
    const exprs = findExpressionsInMessage(msg.text)
    if (exprs.length === 0) {
        return
    }

    const repliedMsg = await msg.getReplyTo()
    if (!repliedMsg || !repliedMsg.text) return

    let newText
    try {
        newText = processExpressions(repliedMsg.text, exprs)
    } catch (e) {
        await msg.replyText(unknownToError(e).message, {
            replyMarkup: BotKeyboard.inline([
                [
                    BotKeyboard.callback(
                        '❌ Delete',
                        DeleteError.build({
                            userId: String(msg.sender.id),
                        }),
                    ),
                ],
            ]),
        })

        return
    }

    await tg.replyText(repliedMsg, newText)
})

dp.onBotGuestChatQuery(async (ctx) => {
    if (!ctx.replyToMessage) return

    let text = ctx.message.text
    const myUsername = tg.storage.self.getCached(true)?.usernames[0]
    if (myUsername) {
        text = text.replace('@' + myUsername, '').trim()
    }

    const exprs = findExpressionsInMessage(text)
    if (exprs.length === 0) {
        return
    }

    let newText
    try {
        newText = processExpressions(ctx.replyToMessage.text, exprs)
    } catch (e) {
        await ctx.answer(BotInlineMessage.text(unknownToError(e).message))

        return
    }

    await ctx.answer(BotInlineMessage.text(newText))
})

dp.onCallbackQuery(DeleteError.filter(), async (upd) => {
    const { userId } = upd.match
    if (upd.user.id !== Number(userId)) {
        return
    }

    await tg.deleteMessagesById(upd.chat, [upd.messageId])
})

const user = await tg.start({ botToken: env.BOT_TOKEN })
console.log('Logged in as', user.username)
