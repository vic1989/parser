const request = require('request-promise')
const cheerio = require('cheerio')
const model = require('../models/onliner')
const fillModel = require('../utils/fillModel')
const repository = require('../db/repository/apartRepositrory')

let apparts = []
const parse = async (config) => {
    console.log('parsing onliner...!')
    const response = await request({
        url: config.usedUrls.onliner.url,
        headers: {
            accept: "application/json, text/plain, */*"
        }
    })
    const body = JSON.parse(response);
    if (body.apartments) {
        body.apartments.forEach(appart => parseApartments(appart))
        for (const appart of apparts) {
            const i = apparts.indexOf(appart);
            await parsePhotos(appart);
            const apart = await repository.save(appart)
            if (i === (apparts.length - 1)) {
                console.log('onliner saved');
            }
        }
    } else {
        console.error("\x1b[41m", 'onliner parsing err')``
    }
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
    const $ = cheerio.load(response.body)
    let photos = []
    $('.apartment-cover__thumbnail').each((i, elm) => {
         photos.push(elm.style.backgroundImage
             .replace(/"/g, "")
             .replace('url(','')
             .replace(')','')
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