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
    find: async (filter) => {
        const apartModel = new mongoose.model('apart', apartSchema)
        const result = await apartModel.find(filter).paginate(1, PER_PAGE_DEFAULT).exec()
        return result
    },
    delete: (filter) => {
        const apartModel = new mongoose.model('apart', apartSchema)
        apartModel.deleteOne(filter, (err) => {
            console.log(err)
        })
    },
    update: () => {

    }
}