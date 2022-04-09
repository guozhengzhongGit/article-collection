import http from "../../../http/umi-request";


export const postFetchArticleList = async (params) => {
    return http({
        url: '/articlelist',
        data: params,
    })
}
