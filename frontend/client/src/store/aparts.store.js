import axios from "axios";
import { config } from "../config/config.dev";

export default class ApartsStore
{
    async loadAparts (page = 1) {
        const response = await axios.get(config.apiUrl)
        return  response.data.aparts
    }

    async loadFavourites (page = 1) {
        const response = await axios.get(config.getFavoriteUrk)
        return  response.data.favourites
    }

    addToFavorites(id) {
       return   axios.post(config.favoriteUrk, {id: id})
    }

    async loadApart(id) {
        const response = await axios.get(config.apiUrl + `/${id}`)
        return  response.data.aparts[0]
    }
}