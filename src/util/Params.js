export default class Params {
    /**
     * 将参数对象转化成url的query字符串
     * @param obj 参数对象
     * @returns {string} query字符串
     */
    static objToQuery(obj) {
        let url = '';
        if (!obj) {
            return '';
        }
        Object.keys(obj).forEach(key => {
            url += `${key}=${obj[key]}&`;
        });
        return url;
    }

    /**
     * 序列化数据，将antd提供的数据转化成后端需要的参数数据
     * @param values antd提供的表单数据
     * @returns {object} 参数数据
     */
    static serializeSearchData(values) {
        const obj = {};
        for (const item in values) {
            if (values[item] !== undefined) {
                obj[item] = values[item];
            } else {
                obj[item] = '';
            }
        }
        return obj;
    }
}
