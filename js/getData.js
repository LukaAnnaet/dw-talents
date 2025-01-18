// getData.js
// cache and api call
const apiDomain = 'https://api.deepwoken.co';
const domain = 'https://lukaannaet.github.io/dw-talents/';

export default class getData {
    // cache functionality
    static ttlCache = 3; // {} days

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
    static async getTalents() {
        const talentsObject = (await axios.get(`${apiDomain}/get?type=talent&name=all`)).data;
        return talentsObject;
    }

    static async getMystic() {
        const mysticObject = (await axios.get(`${apiDomain}/get?type=mystic&name=all`)).data;
        return mysticObject;
    }

    // main()
    static async fetchData(actionMethod) {
        if (this.isCached(actionMethod)) {
            return this.getFromCache(actionMethod);
        }

        try {
            const data = await this[actionMethod]();
            this.setInCache(actionMethod, data);
            return data;
        } catch (error) {
        console.error('Error occured in getData:', error);
    }
    }
}
