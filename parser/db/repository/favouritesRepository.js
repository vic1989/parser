const mongoose = require('mongoose')
require('mongoose-pager')(mongoose)
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
    watchFavorite: async (apart) => {
        const fav = await module.exports.find({apartId: apart.get('_id')})
        if (fav.length && fav[0].prices.length) {
            // берет первое значение а не последнее
            if (fav[0].prices[fav[0].prices.length - 1] !== apart.price.amount
            ) {
                fav[0].prices.push(apart.price.amount)
                return await module.exports.update(fav[0])
            }
        }
        return fav
    },
    markViewed: async (apart) => {
        if (apart) {
            apart.set({new: false})
            await module.exports.update(apart);
        }
    },
    find: async (filter, columns = [], page = 1) => {
        const favouriteModel = new mongoose.model('favourite', favouriteSchema)
        let apart
        if (columns.length) {
            apart = await favouriteModel.find(filter).select(columns).paginate(1, PER_PAGE_DEFAULT).exec();
        } else {
            apart = await favouriteModel.find(filter).populate("apartId").paginate(page, PER_PAGE_DEFAULT).exec();
        }

        return apart
    },
    delete: (filter) => {
        const favouriteModel = new mongoose.model('favourite', favouriteSchema)
        favouriteModel.deleteOne(filter, (err) => {
            console.log(err)
        })
    },
    update: async (apart) => {
        return await apart.save()
    },
}