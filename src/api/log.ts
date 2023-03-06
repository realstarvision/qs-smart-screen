
import request from '@/until/request'

const api = {
  logList: '/star-auth/log/findOperationLogByPage',
}


/**
 *  分页获取日志列表
*/
export function getLogList(data) {
  return request({
    url: api.logList,
    method: 'POST',
    data
  })
}
