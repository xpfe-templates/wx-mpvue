/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-09 03:03:20
 * @modify date 2018-04-09 03:03:20
 * @desc [flyio请求库]
 */

import Fly from 'flyio'
import wx from 'wx'
import appConfig from '@/appConfig'
import { formatRes } from '@/utils/index'

const service = new Fly()

service.config.baseURL = appConfig.baseUrl
service.config.timeout = 10 * 1000
service.config.withCredentials = false
service.config.method = 'post'

// request拦截器
service.interceptors.request.use(config => {
  // 添加统一信息
  config.body = config.body || {}
  if (!config.noToken) {
    // 当noToken为true时，不添加token，否则默认添加
    config.body.token = wx.getStorageSync('token')
  }
  return config
})

// response拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    res = formatRes(res)
    // debug模式，打印结果
    if (appConfig.debug) {
      console.log('url:', response.request.url)
      console.log('value:', res.value)
    }
    // success表示业务成功，直接resolve
    if (res.success) {
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  },
  error => {
    // 打印结果
    if (appConfig.debug) {
      console.log('url:', error.request.url)
      console.log('err:', error.value)
    }
    return Promise.reject({ codeDesc: '网络异常' })
  }
)

export default service
