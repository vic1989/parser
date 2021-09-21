import axios from "axios";
import { config } from "../config/config.dev";

let aparts = []

export default class ApartsStore {
    async loadAparts(page = 1, per_page = 50, search = '') {
        const params = {page: page, per_page: per_page, search: search}
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        const response = await axios.get(config.apiUrl + '?' + query)
        aparts = response.data.aparts
        return response.data
    }

    async loadFormData() {
        return await axios.get(config.formUrl)
    }

    async saveFormData(data) {
        return await axios.post(config.formUrl, {data: data})
    }

    getAparts() {
        return aparts
    }

    async loadFavourites(page = 1) {
        const response = await axios.get(config.getFavoriteUrk)
        return response.data.favourites
    }

    addToFavorites(id) {
        return axios.post(config.favoriteUrk, {id: id})
    }

    async loadApart(id) {
        const response = await axios.get(config.apiUrl + `/${id}`)
        return response.data.aparts[0]
    }
}