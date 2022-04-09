import http from "../../../http/umi-request";

export const getTagList = async () => {
    return http({
        url: 'http://127.0.0.1:7001/tag/list',
        method: 'get'
    })
}

export const postFetchPlatformList = async () => {
    return http({
        url: 'http://127.0.0.1:7001/platformlist'
    })
}


export const postAddArticle = async ( params ) => {
    return http({
        url: 'http://127.0.0.1:7001/addarticle',
        data: params
    })
}
