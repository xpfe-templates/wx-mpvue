/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-11 04:00:18
 * @modify date 2018-04-11 04:00:18
 * @desc [order]
 */

import fly from '@/api/request'
import urls from '@/api/urls'
import { thousands, formatDate, formatOrderIcon } from '@/utils'

const order = {
  state: {
    orderList: [],
    orderPage: {
      page: 1,
      pageSize: 10,
      isEnd: false // 是否最后一页
    },
    orderResult: {},
    orderDetail: {
      goods: []
    }
  },
  mutations: {
    SET_ORDER_LIST(state, data) {
      state.orderList = data
    },
    SET_ORDER_PAGE(state, data) {
      if (!data.pageSize) data.pageSize = 10
      state.orderPage = data
    },
    RESET_ORDER_PAGE(state, data) {
      state.orderPage = {
        page: 1,
        pageSize: 10,
        isEnd: false
      }
    },
    SET_ORDER_RESULT(state, data) {
      state.orderResult = data
    },
    SET_ORDER_DETAIL(state, data) {
      state.orderDetail = data
    },
    RESET_ORDER_DETAIL(state, data) {
      state.orderDetail = { goods: [] }
    }
  },
  actions: {
    // 订单列表
    GetOrderList({ state, commit }, params) {
      if (state.orderPage.isEnd) {
        return Promise.resolve(state.orderList)
      }
      return fly
        .request(urls.orderList, {
          currPageNo: state.orderPage.page,
          limit: state.orderPage.pageSize
        })
        .then(res => {
          const value = res.value
          const newList = value.map(item => {
            item.amount = '¥ ' + thousands(item.amount / 100)
            item.submitTime = formatDate(item.submitTime, 'YYYY-MM-DD hh:mm:ss')
            item.imgurl = formatOrderIcon(item.type)
            item.statusDesc = item.status === 1 ? '待支付' : '交易成功'
            item.statusCls = item.status === 1 ? 'is-unpaid' : ''
            return item
          })
          state.orderList = state.orderList.concat(newList)
          if (value.length < state.orderPage.pageSize) {
            state.orderPage.isEnd = true
          }
          state.orderPage.page++
          commit('SET_ORDER_PAGE', state.orderPage)
          commit('SET_ORDER_LIST', state.orderList)
          return res
        })
    },
    // 订单支付
    OrderPay({ commit }, params) {
      return fly
        .request(urls.orderPay, { outOrderCode: params.outCode })
        .then(res => {
          commit('SET_ORDER_RESULT', { type: 'success', text: '支付成功' })
          return res
        })
        .catch(err => {
          commit('SET_ORDER_RESULT', { type: 'warn', text: err.codeDesc || '支付失败' })
          return Promise.reject(err)
        })
    },
    // 订单详情
    GetOrderDetail({ commit }, params) {
      return fly
        .request(urls.orderDetail, params)
        .then(res => {
          const value = res.value
          value.amount = '¥ ' + thousands(value.amount / 100)
          value.submitTime = formatDate(value.submitTime, 'YYYY-MM-DD hh:mm:ss')
          value.imgurl = formatOrderIcon(value.type)
          value.statusDesc = value.status === 1 ? '待支付' : '交易成功'
          value.statusCls = value.status === 1 ? 'is-unpaid' : ''
          value.goods = value.goods.map(item => {
            item.price = '¥' + thousands(item.price / 100)
            return item
          })
          commit('SET_ORDER_DETAIL', value)
          return res
        })
        .catch(err => {
          commit('RESET_ORDER_DETAIL')
          return Promise.reject(err)
        })
    }
  }
}

export default order
