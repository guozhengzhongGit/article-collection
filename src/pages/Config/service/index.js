import http from '../../../http/umi-request';

export const postCreateTag = async (params) => {
  return http({
      url: '/create_tag',
      data: params
  })
}

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

export const postCreatePlatform = async (params) => {
    return http({
        url: '/create_platform',
        data: params
    })
}

export const searchTagByKeywords = async (params) => {
    return http({
        url: '/searchtagbykeywords',
        data: params,
    })
}