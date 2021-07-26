const express = require('express');
const yargs = require('yargs')
const start = require('./start.js')
const connection = require('./db/connection')
yargs.version('17.0.1')
yargs.command(
    {
        command: 'start',
        describe: 'start parsing',
        handler: () => {
            start(connection.connect)
        }
    }
)
yargs.parse()
