const mongoose = require('mongoose')
const apartSchema = require('../model/apatment')

module.exports = {
    save: (apartObj) => {
        const apartModelObj = new mongoose.model('apart', apartSchema)
        const entity = new apartModelObj(apartObj);
        return entity.save((err, apart) => {
            if(err) console.log('error saving apart:' + err)
            return apart
        })
    },
    find: (filter) => {
        const apartModel = new mongoose.model('apart', apartSchema)
        return apartModel.find(filter);
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