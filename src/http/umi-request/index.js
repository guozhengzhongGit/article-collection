import { extend } from 'umi-request';
const instance = extend({
    timeout: 1500,
})

function http(options) {
    const { url, method, data } = options;
    return instance(url, {
        method: method || 'post',
        data,
    })
}

export default http;
