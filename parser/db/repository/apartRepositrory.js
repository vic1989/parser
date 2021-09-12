const mongoose = require('mongoose')
const apartSchema = require('../model/apatment')

module.exports = {
    save: async (apartObj) => {
        const apartModelObj = new mongoose.model('apart', apartSchema)
        const entity = new apartModelObj(apartObj);
        try {
            const apart = await entity.save()
            return apart
        } catch (e) {
            console.error(e)
        }
    },
    upsert: async (filter, apartObj ) => {
        const apartModelObj = new mongoose.model('apart', apartSchema)
        const apart = await apartModelObj.findOneAndUpdate(filter, apartObj, {upsert: true, new: true, rawResult: true})
        return apart
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