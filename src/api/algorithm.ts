import request from '@/until/request'

const api = {
  listOriginalSetByPage: '/star-dataset/data/listOriginalSetByPage',
  lsitLabelSetByPage: '/star-dataset/data/lsitLabelSetByPage',
  searchTag: '/star-dataset/tag/searchTag',
  serchLabelByUuid: '/star-dataset/data/serchLabelByUuid',
  serchOriginalByUuid: '/star-dataset/data/serchOriginalByUuid'
}


/**
 *  模糊查询原始数据集列表
*/
export function getListOriginalSet(data: { tagName: string; taskName: string; pageNumber: number; pageSize: number; total: number }) {
  return request({
    // baseURL: '/data-set',
    url: api.listOriginalSetByPage,
    method: 'post',
    data
  })
}

/**
 *  原始数据根据uuid查询
*/
export function getOriginaByUuid(data: { extend: string }) {
  return request({
    // baseURL: '/data-set',
    url: api.serchOriginalByUuid,
    method: 'post',
    data
  })
}

/**
 *  模糊查询标注数据数据集列表
*/
export function getListLabelSet(data: { tagName: string; taskName: string; pageNumber: number; pageSize: number; total: number }) {
  return request({
    // baseURL: '/data-set',
    url: api.lsitLabelSetByPage,
    method: 'post',
    data
  })
}

/**
 *  原始数据根据uuid查询
*/
export function getLabelByUuid(data: { uuid: string }) {
  return request({
    // baseURL: '/data-set',
    url: api.serchLabelByUuid,
    method: 'post',
    data
  })
}

/**
 *  根据标签名获取标签列表，参数为空则返回前100条数据
*/
export function getTagList() {
  return request({
    url: api.searchTag,
    method: 'post',
    data: {}
  })
}
