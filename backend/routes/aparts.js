const express = require('express');
const router = express.Router();
const repository = require('../db/repository/apartRepositrory')
const favRepository = require('../db/repository/favouritesRepository')
const responseBuilder = require('../utils/responseBuilder')

router.get('/', (req, response) => {
    (async () => {
        const aparts = await repository.find({});
        response.header('Content-Type', 'application/json').send(
            {
                aparts: responseBuilder.buildResponse(aparts, [
                    'price',
                    'location',
                    'photos',
                    'id',
                    'link'
                ])
            }
        )
    })()
});

router.get('/favourites', (req, response) => {
    (async () => {
        const aparts = await favRepository.find({});
        response.header('Content-Type', 'application/json').send(
            {
                favourites: responseBuilder.buildResponse(
                    aparts.map(ap => {return {
                        prices: ap.prices,
                        currency: ap.currency,
                        ...ap.get('apartId').toObject()
                    }})
                    , [
                    'price',
                    'prices',
                    'location',
                    'photos',
                    'id',
                    'link'
                ])
            }
        )
    })()
});

router.get('/:id', (req, response) => {
    (async () => {
        const apart = await repository.find({id: req.params.id});
        response.header('Content-Type', 'application/json').send(
            {
                aparts: responseBuilder.buildResponse(apart, [
                    'price',
                    'location',
                    'photos',
                    'id',
                    'link'
                ])
            }
        )
    })()
});

router.post('/add-to-favourites', (req, response) => {
    (async (req, res) => {
        debugger
        const apartId = req.body.id
        let apart = await repository.find({id: apartId})
        apart = apart[0] ? apart[0].toObject() : null
        const favourite = await favRepository.find({apartId: apart._id})
        if (favourite) {
            await favRepository.delete({_id: favourite._id})
            response.sendStatus(200)
            return
        }
        const fav = await favRepository.save({
            apartId: apart._id,
            price: [apart.price.amount],
            currency: apart.price.currency
        })
        response.sendStatus(200)
    })(req, response)
});

module.exports = router