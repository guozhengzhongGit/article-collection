import http from '../../../http/umi-request';

export const postCreateTag = async (params) => {
  return http({
      url: 'http://192.168.0.103:7001/create_tag',
      data: params
  })
}

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

export const postCreatePlatform = async (params) => {
    return http({
        url: 'http://127.0.0.1:7001/create_platform',
        data: params
    })
}
