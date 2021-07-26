const mongoose = require('mongoose');
const { Schema } = mongoose;
const apartSchema = new Schema({
    id: String,
    price: {
        amount: Number,
        currency: String
    },
    link: String,
    photos: Array,
    location: {
        address: String,
        latitude: String,
        longitude: String
    }

})
module.exports = apartSchema