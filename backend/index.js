const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const apartRoute = require('./routes/aparts')
const connection = require('./db/connection')
const cors = require('cors');
app.use(bodyParser.raw())
app.use(bodyParser.text())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://172.25.0.3:3000/'
}));
// parse application/json
app.use(bodyParser.json())

const start = async () => {
    await connection.connect()
    app.use('/api/v1/aparts', apartRoute);
    app.listen(6001, console.log('listen 6000'))
}

start()

