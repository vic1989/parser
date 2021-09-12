const mongoose = require('mongoose')
let connected = false
module.exports = {
    isConnected: () => {
        return connected;
    },
    connect: () => {
        return new Promise((resolve) => {
            mongoose.set('useFindAndModify', false);
            mongoose.connect('mongodb://localhost:27017/parser', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).catch((err) => {
                console.error("\x1b[41m", 'db connection error:' + err)
                process.exit(1);
            });
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                console.log('db connected!')
                connected = true
                resolve()
            });
        })
    },
}