import fetch from 'isomorphic-unfetch';

const genQuery = (queryData) => {
    if (!queryData) return '';
    let ret = '';
    queryData.timestamp = new Date().getTime();
    Object.keys(queryData).forEach(key => {
        ret += `&${key}=${encodeURIComponent(queryData[key])}`;
    });
    return ret.replace(/&/, '?');
};


const Method = {
    GET: 'GET',
    POST: 'POST'
};

const http = (method, url, data, type = 'json') => {
    if (!url) {
        return null;
    }
    let sendURL = url;
    const config = {
        url: sendURL,
        withCredentials: true,
        credentials: 'include',
        method,
    };

    if (method === Method.GET) {
        sendURL += genQuery(data);
        config.url = sendURL;
    } else {
        let contentType = '';
        let cfgData = data;
        switch (type) {
            case 'json':
                contentType = 'application/json';
                cfgData = JSON.stringify(data || {});
                break;
            case 'file':
                contentType = 'multipart/form-data';
                cfgData = new FormData();
                Object.keys(data).forEach(key => {
                    cfgData.append(key, data[key]);
                });
                break;
            case 'formData':
                contentType = 'application/x-www-form-urlencoded';
                config.transformRequest = [(requestData) => {
                    let ret = '';
                    let index = 0;
                    Object.keys(requestData).forEach(key => {
                        ret += `${index === 0 ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(requestData[key])}`;
                        index += 1;
                    });
                    return ret;
                }];
                break;
            default:
                break;
        }
        config.headers = {'Content-Type': contentType};
        config.body = cfgData;
    }
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(config.url, config);
            const data = await res.json();
            if (res.status === 200 && data.code === 0) {
                resolve(data);
            } else if (res.status === 401) {
                window.location.href = '/';
            } else {
                reject({
                    error: -1,
                    code: data.code,
                    reason: data.msg,
                    data: data.data,
                });
            }
        } catch (err) {
            reject({
                error: -1,
                reason: `网络异常或服务器错误: [${err.message}]`,
            });
        }
    });
};

export default class Http {
    static get(url, data) {
        return http(Method.GET, `${url}`, data);
    }

    static post(url, data, type) {
        return http(Method.POST, `${url}`, data, type);
    }
}
