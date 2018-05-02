/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-10 05:31:24
 * @modify date 2018-04-10 05:31:24
 * @desc [user]
 */

import fly from '@/api/request'
import urls from '@/api/urls'

const user = {
  state: {
    userDetail: {}
  },
  mutations: {
    SET_USER_DETAIL(state, data) {
      state.userDetail = data
    },
    SET_CONTRACT_STATUS(state, data) {
      state.contractStatus = data
    },
    SET_VERIFY_RESULT(state, data) {
      state.verifyResult = data
    }
  },
  actions: {
    // 获取用户信息
    GetUserDetail({ commit }, params) {
      return fly
        .request(urls.userDetail)
        .then(res => {
          commit('SET_USER_DETAIL', res.value)
        })
        .catch(() => {
          commit('SET_USER_DETAIL', {
            nickName: '匿名',
            faceImgUrl: '/static/img/img-face-default.png'
          })
        })
    }
  }
}

export default user
