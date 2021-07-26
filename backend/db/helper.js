const mongoose = require('mongoose')

module.exports = {
    makeSchema: (schema) => {
        return  new mongoose.Schema(schema);
    },
    makeModel: (name, schema) => {
       return mongoose.model(name, schema);
    }
}