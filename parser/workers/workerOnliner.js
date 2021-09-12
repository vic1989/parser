process.on('message', (msg) => {
    if (msg === 'shutdown') {
        process.exit(1)
    }
    setTimeout(() => {
        console.log(msg.join(',') + ' ' + process.pid)
        process.send(msg)
    }, 2000)
})