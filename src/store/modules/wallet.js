/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-11 04:00:18
 * @modify date 2018-04-11 04:00:18
 * @desc [wallet]
 */

import fly from '@/api/request'
import urls from '@/api/urls'
import { thousands, formatPay, formatDate, formatWalletClass } from '@/utils'

const wallet = {
  state: {
    walletInfo: {},
    walletList: [],
    walletPage: {
      page: 1,
      pageSize: 10,
      isEnd: false // 是否最后一页
    },
    walletResult: {}
  },
  mutations: {
    SET_WALLET_INFO(state, data) {
      state.walletInfo = data
    },
    SET_WALLET_LIST(state, data) {
      state.walletList = data
    },
    SET_WALLET_PAGE(state, data) {
      if (!data.pageSize) data.pageSize = 10
      state.walletPage = data
    },
    RESET_WALLET_PAGE(state, data) {
      state.walletPage = {
        page: 1,
        pageSize: 10,
        isEnd: false
      }
    },
    SET_WALLET_RESULT(state, data) {
      state.walletResult = data
    }
  },
  actions: {
    // 钱包信息
    GetWalletInfo({ commit }, params) {
      return fly.request(urls.walletInfo, params).then(res => {
        const value = res.value
        value.balance = thousands(value.balance / 100, 2)
        commit('SET_WALLET_INFO', value)
        return res
      })
    },
    // 钱包流水
    GetWalletList({ state, commit }, params) {
      if (state.walletPage.isEnd) {
        return Promise.resolve(state.walletList)
      }
      return fly
        .request(urls.walletList, {
          currPageNo: state.walletPage.page,
          limit: state.walletPage.pageSize
        })
        .then(res => {
          const value = res.value
          const newList = value.map(item => {
            item.amount = formatPay(thousands(item.amount / 100), item.recordType)
            item.amountCls = formatWalletClass(item.recordType)
            item.submitDate = formatDate(item.tradeTime, 'YYYY-MM-DD hh:mm:ss')
            return item
          })
          state.walletList = state.walletList.concat(newList)
          if (value.length < state.walletPage.pageSize) {
            state.walletPage.isEnd = true
          }
          state.walletPage.page++
          commit('SET_WALLET_PAGE', state.walletPage)
          commit('SET_WALLET_LIST', state.walletList)
          return res
        })
    },
    // 充值
    ChargeWallet({ commit }, params) {
      return fly.request(urls.charge, params)
    }
  }
}

export default wallet
