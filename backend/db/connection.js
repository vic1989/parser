const mongoose = require('mongoose')

module.exports = {
    connect: () => {
        return new Promise((resolve) => {
            mongoose.connect('mongodb://untitled1_mongo_1:27017/parser', {useNewUrlParser: true, useUnifiedTopology: true}).catch((err) => {
                console.error("\x1b[41m", 'db connection error:' + err)
                process.exit(1);
            });
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function() {
                console.log('db connected')
                resolve()
            });
        })
    },
}