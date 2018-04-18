/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-09 03:17:50
 * @modify date 2018-04-09 03:17:50
 * @desc [app参数设置]
 */

const env = process.env.NODE_ENV

let debug = true // debug开关
// let baseUrl = 'https://test-aierp7.startdtapi.com' // 测试
// let baseUrl = 'https://prev-aierp.startdtapi.com' // 灰度
let baseUrl = 'https://aierp.startdtapi.com' // 线上

if (env === 'production') {
  debug = false
  baseUrl = 'https://aierp.startdtapi.com'
}

const appId = 'wx3dcfeef0d382c2a3'
const serviceNumber = '0571-28121848' // 客服电话
const userAuth = false // 用户授权开关
const payAuth = false // 委托代扣开关

module.exports = {
  debug,
  baseUrl,
  appId,
  serviceNumber,
  userAuth,
  payAuth
}
