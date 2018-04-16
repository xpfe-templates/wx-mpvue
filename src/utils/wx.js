/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-09 05:33:26
 * @modify date 2018-04-09 05:33:26
 * @desc [重写wx]
*/

import whiteList from './wxWhiteList'

function promisify (apiName) {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      wx[apiName](Object.assign({}, options, { success: resolve, fail: reject }), ...params)
    })
  }
}

// 因为wx对象没有setter，需要新建一个对象
const promiseWx = {}
Object.keys(wx).forEach(api => {
  // 同步接口不需要promise化
  if (whiteList.indexOf(api) === -1) {
    promiseWx[api] = promisify(api)
  }
})
const finalWx = Object.assign({}, wx, promiseWx)

export default finalWx
