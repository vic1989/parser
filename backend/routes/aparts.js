const express = require('express');
const router = express.Router();
const repository = require('../db/repository/apartRepositrory')
const responseBuilder = require('../utils/responseBuilder')

router.get('/', (req, response) => {
   (async () => {
      const aparts = await repository.find({});
      response.header('Content-Type', 'application/json').send(
         responseBuilder.buildResponse(aparts, [
           'price',
           'location',
           'photos',
           'id',
           'link'
         ])
      )
   })()
});

router.get('/:id', (req, response) => {
   const apart = repository.find({id: req.params.id}).exec();
   response.header('Content-Type', 'application/json').send(

   )
});

module.exports = router