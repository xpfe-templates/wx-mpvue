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
  wxLogin: '/aierp/v1/user/wxLogin',
  addUser: '/aierp/v1/user/add',
  addPhone: '/aierp/v1/user/setPhoneWithFaceId',
  sendSMS: '/aierp/v1/user/sendSMS',
  upload: '/aierp/v1/user/pic/upload',
  bindFace: '/aierp/v1/user/bindFace',
  userDetail: '/aierp/v1/user/detail',
  openDoor: '/aierp/v1/user/openDoorByScanMagicBoxQrCode',
  openDoorPreCheck: '/aierp/v1/user/openDoorPreCheck',
  // 二维码模块
  getQrcode: '/aierp/v1/qrCode/generate',
  checkQrcode: '/aierp/v1/qrCode/check',
  // 协议模块
  protocol: '/aierp/v1/protocol/queryProtocolDetail',
  // 钱包模块
  walletInfo: '/aierp/v1/wallet/info',
  walletList: '/aierp/v1/wallet/list',
  // 订单模块
  charge: '/aierp/v1/order/recharge/submit',
  orderList: '/aierp/v1/order/list',
  orderDetail: '/aierp/v1/order/detail',
  // 支付模块
  orderPay: '/aierp/v1/pay/miniProgramPay',
  // 协议模块
  signContract: '/aierp/v1/contract/getContractData',
  contractStatus: '/aierp/v1/contract/getContractStatus',
  dimissContract: '/aierp/v1/contract/contractCancel',
  refundContract: '/aierp/v1/contract/contractRefund'
}

Object.keys(urls).forEach(key => {
  urls[key] = baseUrl + urls[key]
})

export default urls
