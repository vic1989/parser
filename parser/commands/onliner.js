const request = require('request-promise')
const cluster = require('cluster')
const totalCPUs = require('os').cpus().length - 1;
let page = 1
let last = 0
let totalAparts = 0

cluster.setupMaster({
    exec: __dirname + '/../workers/workerOnliner.js'
});
const childs = []
const parse = async (config) => {
    if (cluster.isMaster) {

        const response = await request({
            url: config.usedUrls.onliner.url,
            headers: {
                accept: "application/json, text/plain, */*"
            }
        })

        await parallelParse(response)
    }
}

const parallelParse = (response) => {
    return new Promise((resolve) => {
        const body = JSON.parse(response);
        page = body.page.current
        last = body.page.last
        let s = Array.from(Array(last+1).keys())
        s.shift()
        console.log('parsing onliner...')
        for (let i = 0; i <= totalCPUs; i++) {
            if(!s.length) {
                continue
            }
            const worker = cluster.fork();
            worker.send({type: 'page', pages: s.splice(0, 3)})
            childs.push(worker)
            worker.on('message', (msg) => {
                if (s.length) {
                    totalAparts+=msg
                    worker.send({type: 'page', pages: s.splice(0, 3)})
                } else {
                    childs.forEach(child =>  {
                        child.send({type: 'shutdown'})
                        child.disconnect()
                    });
                    console.log('парсинг онлайнера завершен')
                    console.log('Всего квартир ' + totalAparts)
                    resolve()
                }
            })
        }
    })
}


module.exports = {
    parse: parse
}