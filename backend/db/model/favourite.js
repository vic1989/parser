const mongoose = require('mongoose');
const { Schema } = mongoose;
const favouriteSchema = new Schema({
    id: String,
    apartId: {
        type: Schema.Types.ObjectId,
        ref: "aparts"
    },
    prices: Array,
    currency: String,

})
module.exports = favouriteSchema