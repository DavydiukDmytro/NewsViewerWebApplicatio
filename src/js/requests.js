import axios from "axios";

export class Requests {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }
    // створити URL адресу для популярних новин
    createTrendingNewsQueryUrl() {
        return this.url + '?api-key=' + this.key;
    }
    // зробити запит на адресу
    async getRequests(url) {
        const response = await axios.get(url);
        return response.data;
    }
}
