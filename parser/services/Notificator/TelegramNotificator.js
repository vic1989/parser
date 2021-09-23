class TelegramNotificator
{
    TOKEN = '2040893534:AAHuZfhjuZnCYtm8OLlKzkBtNFkwiJduuZs'
    chatId = '698916856'
    BOT_NAME = '@vicparserbot'

    constructor() {
        const TelegramBot = require('node-telegram-bot-api')
        this.bot = new TelegramBot(this.TOKEN, { polling: true })
    }

    onSend () {
        this.bot.onText(/\/start (.+)/, (msg, match) => {
            const chatId = msg.chat.id
            const text = match[1]
            console.log(text)
            bot.sendMessage(chatId, resp)
        })
    }

    sendMessage(chatId, msg) {
        return this.bot.sendMessage(chatId, msg)
    }
}
module.exports = TelegramNotificator