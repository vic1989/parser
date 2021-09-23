const mongoose = require('mongoose')
require('mongoose-pager')(mongoose);
const apartSchema = require('../model/apatment')
const PER_PAGE_DEFAULT = 50

module.exports = {
    save: (apartObj) => {
        const apartModelObj = new mongoose.model('apart', apartSchema)
        const entity = new apartModelObj(apartObj);
        return entity.save((err, apart) => {
            if(err) console.log('error saving apart:' + err)
            return apart
        })
    },
    find: async (filter, page, per_page, order) => {
        page = parseInt(page) === 1 ? 0 : parseInt(page)
        per_page = parseInt(per_page)
        const apartModel = new mongoose.model('apart', apartSchema)
        return await apartModel.find(filter).sort(order).skip(page * per_page).limit(per_page)/*.paginate(page, per_page || PER_PAGE_DEFAULT)*/.exec()
    },
    total: async () => {
        const apartModel = new mongoose.model('apart', apartSchema)
        return await apartModel.count().exec()
    },
    delete: (filter) => {
        const apartModel = new mongoose.model('apart', apartSchema)
        apartModel.deleteOne(filter, (err) => {
            console.log(err)
        })
    },
    update: (param, newParam, ) => {

    },
    count: async (filter) => {
        const apartModel = new mongoose.model('apart', apartSchema)
        return await apartModel.find(filter).count().exec()
    },

}