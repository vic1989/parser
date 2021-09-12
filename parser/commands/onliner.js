const request = require('request-promise')
const cheerio = require('cheerio')
const model = require('../models/onliner')
const fillModel = require('../utils/fillModel')
const repository = require('../db/repository/apartRepositrory')
const cluster = require('cluster')
const totalCPUs = require('os').cpus().length - 1;

let apparts = []
const APARTMENTS_LIMIT_PER_PROCESS = 300
let page = 1
let last = 0
let timeout
cluster.setupMaster({
    exec: __dirname + '/../workers/workerOnliner.js'
});
const childs = []
let s = Array.from(Array(100).keys())
const parse = async (config) => {
    if (cluster.isMaster) {
        console.log('parsing onliner...')
        for (let i = 0; i <= totalCPUs; i++) {
            const worker = cluster.fork();
            worker.send(s.splice(0, 3))
            childs.push(worker)
            worker.on('message', (msg) => {
                if (s.length) {
                    worker.send(s.splice(0, 3))
                } else {
                    childs.forEach(child =>  {
                        child.disconnect()
                        child.send('shutdown')
                    });
                }
            })
        }
    }

    // const response = await request({
    //     url: config.usedUrls.onliner.url,
    //     headers: {
    //         accept: "application/json, text/plain, */*"
    //     }
    // })
    // if (body.apartments) {
    //
    //     const body = JSON.parse(response);
    //     page = body.page.current
    //     last = body.page.last
    //
    //     body.apartments.forEach(appart => parseApartments(appart))
    //     for (const appart of apparts) {
    //         const i = apparts.indexOf(appart);
    //         // await parsePhotos(appart);
    //         const apart = await repository.upsert({id: appart.id}, appart)
    //         if (i === (apparts.length - 1)) {
    //             ++page
    //             console.log('onliner saved');
    //         }
    //     }
    // } else {
    //     console.error("\x1b[41m", 'onliner parsing err')``
    // }
}

const buildUrl = (params) => {

}

const parsePhotos = async (apart) => {
    const response = await request({
        url: apart.link,
        headers: {
            accept: "application/json, text/plain, */*"
        }
    })
    const $ = cheerio.load(response)
    let photos = []
    $('.apartment-cover__thumbnail').each((i, elm) => {
        photos.push(elm.attribs.style
            .replace(/"/g, "")
            .replace('url(', '')
            .replace(')', '')
        )
    })
    apart.photos.concat(photos)
}

const parseApartments = (appart) => {
    apparts.push(fillModel(appart, model))
}
module.exports = {
    parse: parse
}