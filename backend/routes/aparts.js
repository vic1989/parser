const express = require('express');
const router = express.Router();
const repository = require('../db/repository/apartRepositrory')
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

module.exports = router