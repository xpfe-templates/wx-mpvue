/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:04:41
 * @modify date 2017-08-03 07:04:41
 * @desc [app store, 主要放置全站相关内容]
 */

import wx from 'wx'

const app = {
  state: {
    userInfo: {},
    globalQuery: {}
  },
  mutations: {
    SET_USERINFO(state, data) {
      state.userInfo = data
    },
    SET_GLOBAL_QUERY(state, data) {
      state.globalQuery = data
    }
  },
  actions: {
    GetUserInfo({ commit }, params) {
      return wx
        .login()
        .then(wx.getUserInfo)
        .then(res => {
          commit('SET_USERINFO', res.userInfo)
        })
    }
  }
}

export default app
