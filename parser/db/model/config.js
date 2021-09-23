const mongoose = require('mongoose');
const { Schema } = mongoose;
const configSchema = new Schema({
    data: Object,
})
module.exports = configSchema