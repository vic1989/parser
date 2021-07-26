const request = require('request')
const cheerio = require('cheerio')
const model = require('../models/onliner')
const fillModel = require('../utils/fillModel')
const repository = require('../db/repository/apartRepositrory')

let apparts = []
const parse = (config) => {
    return new Promise((resolve) => {
        console.log('parsing onliner...!')
        request({
            url: config.usedUrls.onliner.url,
            headers: {
                accept: "application/json, text/plain, */*"
            }
        }, (error, response) => {
            // const $ = cheerio.load(response.body)
            // console.log($('.classifieds-list').html())
            const body = JSON.parse(response.body);
            if (body.apartments) {
                body.apartments.forEach(appart => parseApartments(appart))
                apparts.forEach((appart, i) => {
                    repository.save(appart)
                    if (i === (apparts.length - 1)) {
                        console.log('onliner saved');
                        resolve()
                    }
                })
            } else {
                console.error("\x1b[41m", 'onliner parsing err')
            }
        })
    })

}
const buildUrl = (params) => {

}

const parseApartments = (appart) => {
    apparts.push(fillModel(appart, model))
}
module.exports = {
    parse: parse
}