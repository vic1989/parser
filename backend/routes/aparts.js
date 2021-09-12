const express = require('express');
const router = express.Router();
const repository = require('../db/repository/apartRepositrory')
const favRepository = require('../db/repository/favouritesRepository')
const responseBuilder = require('../utils/responseBuilder')
const { spawn } = require("child_process");

router.get('/', (req, response) => {
    (async () => {
        let aparts = await repository.find({});
        let favourites = await favRepository.find({apartId: {$in: aparts.map(ap => ap.get('_id').toString())}}, "apartId")
        favourites = favourites.map(fav => {
            return fav.toObject()['apartId'].toString()
        })
        aparts = aparts.map((apart) => {
            const  app = apart.toObject()
            const s = favourites
            app.isFavourite = favourites.includes(apart.get('_id').toString());
            return app
        })
        response.header('Content-Type', 'application/json').send(
            {
                aparts: responseBuilder.buildResponse(aparts, [
                    'price',
                    'location',
                    'photos',
                    'id',
                    'isFavourite',
                    '_id',
                    'link'
                ])
            }
        )
    })()
});

router.get('/parse', (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);


    req.on('close', () => {
        console.log(` Connection closed`);
    });

    const child = spawn('node',
        ['./parser/index.js','start'],
        {stdio: ['ignore', 'pipe', 'pipe']}
    )
    child.on('error', (err) => {
        res.write(`data: ${JSON.stringify(err.toString())}\n\n`)
    })
    child.on('close', (code) => {
        res.write(`data: ${JSON.stringify('process end')}\n\n`)
    })

    child.stdout.on('data', (outdata) => {
        res.write(`data: ${JSON.stringify(outdata.toString())}\n\n`)
    })

    child.stderr.on('data', (errdata) => {
        res.write(`data: ${JSON.stringify(errdata.toString())}\n\n`)
    })
});


router.get('/favourites', (req, response) => {
    (async () => {
        const aparts = await favRepository.find({});
        response.header('Content-Type', 'application/json').send(
            {
                favourites: responseBuilder.buildResponse(
                    aparts.map(ap => {
                        return {

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
                    '_id',
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
                    '_id',
                    'link'
                ])
            }
        )
    })()
});

router.post('/add-to-favourites', (req, response) => {
    (async (req, res) => {
        const apartId = req.body.id
        let apart = await repository.find({id: apartId})
        apart = apart[0] ? apart[0].toObject() : null
        const favourite = await favRepository.find({apartId: apart._id})
        if (favourite.length) {
            await favRepository.delete({_id: favourite[0]._id})
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