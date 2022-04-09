import http from "../../../http/umi-request";


export const postFetchArticleList = async (params) => {
    return http({
        url: 'http://127.0.0.1:7001/articlelist',
        data: params,
    })
}
