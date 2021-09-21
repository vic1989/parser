const mongoose = require('mongoose')
require('mongoose-pager')(mongoose);
const formSchema = require('../model/form')

module.exports = {
    find: async () => {
        const apartModel = new mongoose.model('form', formSchema)
        return await apartModel.findOne()
    },
}