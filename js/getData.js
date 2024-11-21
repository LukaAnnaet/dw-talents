// getData.js
// cache and api call
const domain = 'https://api.deepwoken.co';

export default class getData {
    // cache functionality
    static ttlCache = 7; // {} days

    static getFromCache(key) {
        const cachedItem = localStorage.getItem(key);
        if (!cachedItem) return null;

        const item = JSON.parse(cachedItem);
        const now = new Date();
        if (cachedItem && now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return JSON.parse(item.data);
    }

    static setInCache(key, data, ttl=this.ttlCache*24*60*60*1000) /*measures in miliseconds*/ {
        const now = new Date();
        const item = {
            data: JSON.stringify(data),
            expiry: now.getTime() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    static isCached(key) {
        return localStorage.getItem(key) !== null;
    }

    // api call
    static async getAllAPITalents() {
        const APITalentsObject = (await axios.get(`${domain}/get?type=talent&name=all`)).data;
        return APITalentsObject;
    }

    static async getAllAPIMystic() {
        const APIMysticObject = (await axios.get(`${domain}/get?type=mystic&name=all`)).data;
        return APIMysticObject;
    }

    // main()
    static async fetchData(actionMethod) {
        if (this.isCached(actionMethod)) {
            return this.getFromCache(actionMethod);
        }

        const data = await this[actionMethod](); // try...catch is handled in index.js
        this.setInCache(actionMethod, data);
        return data;
    }
}
