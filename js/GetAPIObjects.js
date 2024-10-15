// GetAPIObjects.js
const domain = 'https://api.deepwoken.co';

export default class GetAPIObjects {
    static async getAPICategory(name) {
        const APICategory = (await axios.get(`${domain}/get?type=category&name=${name}`)).data;
        if (APICategory.status !== "success") return null;

        return APICategory.content;
    }

    static async getAPITalent(name) {
        const APITalent = (await axios.get(`${domain}/get?type=talent&name=${name}`)).data;
        if (APITalent.status !== "success") return null;

        return APITalent.content;
    }

    static async getAPIMystic(name) {
        const APIMystic = (await axios.get(`${domain}/get?type=mystic&name=${name}`)).data;
        if (APIMystic.status !== "success") return null;

        return APIMystic.content;
    }

    static async getAllAPICategories() {
        const APICategoriesObject = (await axios.get(`${domain}/get?type=category&name=all`)).data.content;

        return APICategoriesObject;
    }

    static async getAllAPITalents() {
        const APITalentsObject = (await axios.get(`${domain}/get?type=talent&name=all`)).data.content;

        return APITalentsObject;
    }

    static async getAllAPIMystic() {
        const APIMysticObject = (await axios.get(`${domain}/get?type=mystic&name=all`)).data.content;

        return APIMysticObject;
    }
}
