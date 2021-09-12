import axios from "axios";
import { config } from "../config/config.dev";

export default class ApartsStore {
    async loadAparts(page = 1, per_page = 50, search = '') {
        const params = {page: page, per_page: per_page, search: search}
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        const response = await axios.get(config.apiUrl + '?' + query)
        return response.data
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