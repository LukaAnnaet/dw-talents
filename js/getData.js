// getData.js
// cache and api call

const domain = 'https://api.deepwoken.co';

export default class getData {
    // cache functionality
    static cache = {};

    static getFromCache(key) {
        return this.cache[key] || null;
    }

    static setInCache(key, data) {
        this.cache[key] = data;
    }

    static isCached(key) {
        return Object.hasOwn(this.cache, key)
    }

    // api call
    static async getAllAPITalents() {
        const APITalentsObject = (await axios.get(`${domain}/get?type=talent&name=all`)).data.content;
        return APITalentsObject;
    }

    static async getAllAPIMystic() {
        const APIMysticObject = (await axios.get(`${domain}/get?type=mystic&name=all`)).data.content;
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
