const config = require('./config/config.json')
const mongoose = require('mongoose')

const start = async (connectCallback) => {
    await connectCallback()
    let normalizedPath = require("path").join(__dirname, "commands");

    for (const file of require("fs").readdirSync(normalizedPath)) {
        const runner = require("./commands/" + file);
        await runner.parse(config)
        await mongoose.connection.close()
        process.exit(1)
    }
}


module.exports = start