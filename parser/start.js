const config = require('./config/config.json')
const start = async (connectCallback) => {
    await connectCallback()
    let promises = []
    let normalizedPath = require("path").join(__dirname, "commands");

    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        const runner = require("./commands/" + file);
        promises.push(runner.parse(config))
    });
    Promise.all(promises).then(() => {
        process.exit(1)
    })
}


module.exports = start