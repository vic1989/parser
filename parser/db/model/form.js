const mongoose = require('mongoose');
const { Schema } = mongoose;
const favouriteSchema = new Schema({
    data: Object,
})
module.exports = favouriteSchema