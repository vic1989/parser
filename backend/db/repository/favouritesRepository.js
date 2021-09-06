const mongoose = require('mongoose')
require('mongoose-pager')(mongoose);
const favouriteSchema = require('../model/favourite')
const PER_PAGE_DEFAULT = 50
const apartSchema = require('../model/apatment')
const aparts = mongoose.model('aparts', apartSchema)


module.exports = {
    save: async (favouriteObj) => {
        const favouriteModelObj = new mongoose.model('favourite', favouriteSchema)
        const entity = new favouriteModelObj(favouriteObj);
        const apart = await entity.save()
        return apart
    },
    find: async (filter, columns = []) => {
        const favouriteModel = new mongoose.model('favourite', favouriteSchema)
        let apart
        if (columns.length) {
            apart = await favouriteModel.find(filter).select(columns).paginate(1, PER_PAGE_DEFAULT).exec();
        } else {
            apart = await favouriteModel.find(filter).populate("apartId").paginate(1, PER_PAGE_DEFAULT).exec();
        }

        return apart
    },
    delete: (filter) => {
        const favouriteModel = new mongoose.model('favourite', favouriteSchema)
        favouriteModel.deleteOne(filter, (err) => {
            console.log(err)
        })
    },
    update: (param, newParam,) => {

    },

}