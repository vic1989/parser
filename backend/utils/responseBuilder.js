exports.buildResponse = (response, allowedKeys) => {
    let result = []
    response.map((data) => {
        data = data.toObject();
        const m = Object.keys(data)
            .filter(key => allowedKeys.includes(key))
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
        result.push(m)
    })
    return result;
}