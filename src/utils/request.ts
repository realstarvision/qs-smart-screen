import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { getToken, removeToken, removeUserInfo } from './auth'
import Message from '@/components/Message'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    starToken: ''
  }
});


// request拦截器
instance.interceptors.request.use(
  (config: any) => {
    // 是否需要设置 token
    if (getToken()) {
      config.headers['starToken'] = getToken()  // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 跳转

    // 未设置状态码则默认成功状态
    const status = res.data.code || 200
    if (status === 401 || status === 10001) {
      Message({ content: '登录状态已过期，3秒后跳转到登录页' })
      setTimeout(() => {
        location.href = "/login"
        removeToken()
        removeUserInfo()
      }, 3000)
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (status === 500) {
      // Message.error('服务器错误')
      Message({ content: '服务器错误' })
      return Promise.reject(new Error('服务器错误'))
    } else if (status !== 200 && status !== 10002 && status !== 10004) {
      return Promise.reject(res.data)
    } else {
      return res.data
    }
  },
  (error) => {
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status status')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    return Promise.reject(error)
  }
)


export default instance