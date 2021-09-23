const request = require('request-promise')
const cluster = require('cluster')
const build = require("../utils/urlBuilders/onliner");
const formRepository = require("../db/repository/formRepository");
const {eventEmitter} = require("../emitters/favEmitter");
const totalCPUs = require('os').cpus().length - 1;
const storage = require('../services/storage')
let page = 1
let last = 0
let totalAparts = 0
let read = 0

cluster.setupMaster({
    exec: __dirname + '/../workers/workerOnliner.js'
});
const childs = []
const parse = async (config) => {
    if (cluster.isMaster) {
        const formConfig = await formRepository.find()
        const link = build(formConfig.data)
        const response = await request({
            url: link,
            headers: {
                accept: "application/json, text/plain, */*"
            }
        })
        await parallelParse(response, link)
    }
}

const parallelParse = (response, link) => {
    return new Promise((resolve) => {
        const body = JSON.parse(response);
        page = body.page.current
        last = body.page.last
        let s = Array.from(Array(last + 1).keys())
        s.shift()
        console.log('parsing onliner...')
        for (let i = 0; i <= totalCPUs; i++) {
            if (!s.length) {
                continue
            }
            const worker = cluster.fork();
            worker.send({type: 'initial', url: link})
            worker.send({type: 'page', pages: s.splice(0, 3)})
            childs.push(worker)
            worker.on('message', (msg) => {
                if (msg.favoriteToSend) {
                    storage.addData('favoriteToSend', msg.favoriteToSend.apartId)
                    return
                }
                read += msg.pages.length
                if (read < last) {
                    totalAparts += msg.total
                    worker.send({type: 'page', pages: s.splice(0, 3)})
                } else {
                    totalAparts += msg.total
                    childs.forEach(child => {
                        child.send({type: 'shutdown'})
                        child.disconnect()
                    });
                    console.log('парсинг онлайнера завершен')
                    console.log('Всего квартир ' + totalAparts)
                    eventEmitter.emit('parseDone')
                    setTimeout(() => {resolve()} , 1000)

                }
            })
        }
    })
}

module.exports = {
    parse: parse
}