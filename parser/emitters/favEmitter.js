const favStorage = require('../services/storage')
const EventEmitter = require('events');
class Emitter extends EventEmitter { }
const eventEmitter = new Emitter();
const TelegramNotificator = require('../services/Notificator/TelegramNotificator')
const notificator = new TelegramNotificator()
let favaparts = []
const listener = (deb) => {
    const a = favStorage.getData('favoriteToSend');
    if(a && a.length){
        const msg = a.map(s => s.link)
        return notificator.sendMessage(698916856,'Цена изменилась \n' + msg.join(' '));
    }

}
const addApart = (appart) => {
    favaparts.push(appart)
}
eventEmitter.on('parseDone', listener)
module .exports = {
    eventEmitter,
    addApart
}