import http from "../../../http/umi-request";

export const getTagList = async () => {
    return http({
        url: '/tag/list',
        method: 'get'
    })
}

export const postFetchPlatformList = async () => {
    return http({
        url: '/platformlist'
    })
}


export const postAddArticle = async ( params ) => {
    return http({
        url: '/addarticle',
        data: params
    })
}
