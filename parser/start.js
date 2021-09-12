const config = require('./config/config.json')
const mongoose = require('mongoose')

const start = async (connectCallback) => {
    await connectCallback()
    let promises = []
    let normalizedPath = require("path").join(__dirname, "commands");

    require("fs").readdirSync(normalizedPath).forEach(async (file) => {
        const runner = require("./commands/" + file);
        await runner.parse(config)
        mongoose.connection.close()
        process.exit(1)
    });
}


module.exports = start