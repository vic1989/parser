class Storage {
    data = {}

    constructor() {
    }

    setData(key, data) {
        this.data[key] = data
    }

    addData(key, item) {
        if (this.data[key]) {
            this.data[key].push(item)
        } else {
            this.data[key] = [item]
        }

    }

    getData(key) {
        return this.data[key]
    }
}

module.exports = new Storage()