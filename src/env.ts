import '@std/dotenv/load'

const API_ID = Number.parseInt(Deno.env.get('API_ID')!)
const API_HASH = Deno.env.get('API_HASH')!
const BOT_TOKEN = Deno.env.get('BOT_TOKEN')!
const PCRE2_LIB = Deno.env.get('PCRE2_LIB')!

export const IS_PRODUCTION = Deno.env.get('ENV') === 'production'
export const HTTP_PROXY = Deno.env.get('http_proxy')

if (Number.isNaN(API_ID) || !API_HASH) {
    throw new Error('API_ID or API_HASH not set!')
}

if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN not set!')
}

if (!PCRE2_LIB) {
    throw new Error('PCRE2_LIB not set!')
}

export { API_HASH, API_ID, BOT_TOKEN, PCRE2_LIB }
