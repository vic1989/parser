const express = require('express')
const app = express()
const apartRoute = require('./routes/aparts')
const connection = require('./db/connection')

const start = async () => {
    await connection.connect()
    app.use('/api/v1/aparts', apartRoute);
    app.listen(6001, console.log('listen 6000'))
}

start()

