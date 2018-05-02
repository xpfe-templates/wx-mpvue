/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @modify date 2018-04-10 05:12:40
 * @modify date 2018-04-10 05:12:40
 * @desc [api]
 */

import { baseUrl } from '@/appConfig'

const urls = {
  // 用户模块
  wxLogin: '/aierp/v1/user/wxLogin'
}

Object.keys(urls).forEach(key => {
  urls[key] = baseUrl + urls[key]
})

export default urls
