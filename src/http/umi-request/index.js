import { extend } from 'umi-request';
const instance = extend({
    timeout: 1500,
})
const baseUrl = import.meta.env.PROD ? 'http://124.70.83.234:6609' : 'http://124.70.83.234:6609';
function http(options) {
    const { url, method, data } = options;
    return instance(`${baseUrl}${url}`, {
        method: method || 'post',
        data,
    })
}

export default http;
