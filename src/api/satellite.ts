import request from '@/until/request'

const api = {
  getSatelliteList: '/star-geo/task/listSatellite',
}


/**
 *  获取卫星基本信息列表
*/
export function getSatelliteList() {
  return request({
    // baseURL: '/geo',
    url: api.getSatelliteList,
    method: 'get'
  })
}
