import request from '@/until/request'

const api = {
  dayListData: '/star-manage/satelliteData/listSatelliteDataForDay',
  weekListData: '/star-manage/satelliteData/listSatelliteDataForWeek',
  satelliteCount: '/star-manage/satelliteData/detail',
  memoryContrast: '/star-manage/satelliteData/getMemoryContrast',
  getFileList: '/star-geo/satellitees/searchFuzzyPage'
}


/**
 *  卫星数据总数
*/
export function satelliteCount(data: { satelliteId: string }) {
  return request({
    url: api.satelliteCount,
    method: 'post',
    data
  })
}


/**
 *  卫星每日新增数据(七天数据)
*/
export function getDayDataList(data: { satelliteId: number }) {
  return request({
    url: api.dayListData,
    method: 'post',
    data
  })
}
/**
 *  卫星每周新增数据(三个月数据)
*/
export function getWeekDataList(data: { satelliteId: number }) {
  return request({
    url: api.weekListData,
    method: 'post',
    data
  })
}


/**
 *  获取内存比率
*/
export function getMemoryContrast() {
  return request({
    url: api.memoryContrast,
    method: 'get'
  })
}


/**
 *  查询ES，文件数据列表
*/
export function getFileList(data: { satelliteId: number | undefined; identifier: string | undefined; shootEndTime: string; shootStartTime: string; cloudCoverage: number | undefined; pageNumber: number; pageSize: number; count: number; total: number }) {
  return request({
    // baseURL: '/geo',
    url: api.getFileList,
    method: 'post',
    data
  })
}

