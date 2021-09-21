const mongoose = require('mongoose')
require('mongoose-pager')(mongoose);
const formSchema = require('../model/form')

module.exports = {
    save: async (form) => {
        const existed = await module.exports.find()
        const formObj = new mongoose.model('form', formSchema)
        if (existed) {
            const doc = await formObj.findOneAndUpdate({'_id': existed.get('id').toString()}, {'data' : form.data})
            return doc
        }
        const entity = new formObj(form);
        return await entity.save()
    },
    find: async () => {
        const apartModel = new mongoose.model('form', formSchema)
        return await apartModel.findOne()
    },
}