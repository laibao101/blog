import qs from "qs";

export default class QueryString {
    static getQueryString(str) {
        return qs.parse(str);
    }
}
