const PAGE_LIMIT = 3
const repository = require('../db/repository/apartRepositrory')
const request = require("request-promise");
const cheerio = require("cheerio");
const fillModel = require("../utils/fillModel");
const model = require("../models/onliner");
const connection = require('../db/connection')
const {watchFavorite} = require("../db/repository/favouritesRepository");
let URL = ''

let apparts = []
let totalAparts = 0

process.on('message', (msg) => {
    if (msg.type === 'initial') {
       URL = msg.url
    }
    if (msg.type === 'page') {
        const pages = msg.pages
        run(pages)
    }

    if (msg.type === 'shutdown') {
        process.exit(1)
    }
})

const run = async (pages) => {
    if (!connection.isConnected()) {
        await connection.connect()
    }

    for (const page of pages) {
        apparts = []
        const j = pages.indexOf(page);
        const response = await request({
            url: URL + `&page=${page}`,
            headers: {
                accept: "application/json, text/plain, */*"
            }
        })

        const body = JSON.parse(response);
        if (body.apartments) {
            body.apartments.forEach(appart => parseApartments(appart))
            for (const appart of apparts) {
                const i = apparts.indexOf(appart);
                // await parsePhotos(appart);
                let savedApart = await repository.upsert({id: appart.id}, appart)
                watchFavorite(savedApart.value)
                totalAparts++
                if (i === (apparts.length - 1)) {
                    console.log(`страница ${page} прочитана`)
                }
                if (i === (apparts.length - 1) && j === pages.length - 1) {
                    process.send(totalAparts)
                }
            }
        } else {
            console.error("\x1b[41m", 'onliner parsing err')``
        }
    }
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
const buildUrl = (params) => {
}

