/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-10 05:17:11
 * @modify date 2018-04-10 05:17:11
 * @desc [utils方法]
 */

import { thousands, formatDate } from 'xp-utils'

export { thousands, formatDate }

// 校验
export const validate = {
  phone(str) {
    const reg = /^1\d{10}$/
    return reg.test(str)
  },
  amount(num) {
    if (isNaN(num) || num < 1) {
      return '请输入有效金额'
    } else if (num > 1000000) {
      return '充值金额不能超过10000'
    }
    return ''
  }
}

// 序列化query参数
export function query(str) {
  const reg = new RegExp(/(^|\?|&)(\w+)=([\w:/.-]*)/, 'g')
  const match = str.match(reg)
  let ret = {}
  if (Array.isArray(match)) {
    match.forEach(v => {
      let arr = v.split('=')
      if (arr[0].indexOf('?') > -1 || arr[0].indexOf('&') > -1) {
        arr[0] = arr[0].slice(1)
      }
      ret[arr[0]] = decodeURIComponent(arr[1])
    })
  }
  return ret
}

// 根据类型换算真实金额
// 流水记录类型（1：充值、2：消费、3：退款）
export function formatPay(num, recordType = 1) {
  num = Number(num)
  if (recordType === 2) {
    return '-' + num.toFixed(2)
  }
  return '+' + num.toFixed(2)
}

// 格式化返回函数
export function formatRes(res) {
  // 兼容auth老系统代码
  if (res.code !== undefined) {
    // 这是auth系统的老代码
    res = {
      success: res.code === 0,
      codeNum: res.code,
      codeDesc: res.errorMsg || '系统异常',
      value: res.data
    }
  } else {
    // 兼容value=""的情况
    if (!res.value) {
      res.value = {}
    }
  }
  return res
}

// 格式化订单的icon
export function formatOrderIcon(type) {
  let ret = '/static/img/icon-shop.png' // 默认为shop
  if (type === 2) {
    // 魔盒
    ret = '/static/img/icon-box.png'
  } else if (type === 3) {
    // 魔柜
    ret = '/static/img/icon-cabin.png'
  }
  return ret
}

// 格式化钱包流水class
export function formatWalletClass(type) {
  let ret = ''
  if (type === 1 || type === 3) {
    ret = 'u-color-primary'
  }
  return ret
}
