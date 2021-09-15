const fillModel = (appart, model) => {
    appartObj = {}
    if (appart[model.id]) {
        appartObj.id = appart[model.id]
    }
    if (appart[model.link]) {
        appartObj.link = appart[model.link]
    }
    if (appart[model.price.name]) {
        appartObj.price = {}
        appartObj.price.currency = appart[model.price.name][model.price.currency]
        appartObj.price.amount = appart[model.price.name][model.price.amount]
    }
    if (appart[model.location.name]) {
        appartObj.location = {}
        if (appart[model.location.name][model.location.address]) {
            appartObj.location.address = appart[model.location.name][model.location.address]
        }
        if (appart[model.location.name][model.location.latitude]) {
            appartObj.location.latitude = appart[model.location.name][model.location.latitude]
        }
        if (appart[model.location.name][model.location.longitude]) {
            appartObj.location.longitude = appart[model.location.name][model.location.longitude]
        }
    }
    if (appart[model.updated_at]) {
        appartObj.updated_at = appart[model.updated_at]
    }
    if (appart[model.photos]) {
        appartObj.photos = []
        appartObj.photos.push(appart[model.photos])
    }
    if (appart[model.updated_at]) {
        appartObj.updated_at = appart[model.updated_at]
    }

    appartObj.new = true

    return appartObj;
}

module.exports = fillModel