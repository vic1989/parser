import axios from "axios";
import { config } from "../config/config.dev";

export default class ApartsStore
{
    async loadAparts (page = 1) {
        const response = await axios.get(config.apiUrl)
        return  response.data.aparts
    }

    addToFavorites(id) {
        axios.post(config.favoriteUrk)
    }

    async loadApart(id) {
        const response = await axios.get(config.apiUrl + `/${id}`)
        return  response.data.aparts[0]
    }
}