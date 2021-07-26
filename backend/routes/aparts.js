const express = require('express');
const router = express.Router();
const repository = require('../db/repository/apartRepositrory')

router.get('/', (req, response) => {
   const aparts = repository.find({});
   response.header('Content-Type', 'application/json').send(

   )
});

router.get('/:id', (req, response) => {
   const apart = repository.find({id: req.params.id}).exec();
   response.header('Content-Type', 'application/json').send(

   )
});

module.exports = router