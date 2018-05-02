/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-11 04:00:18
 * @modify date 2018-04-11 04:00:18
 * @desc [protocol]
 */

import fly from '@/api/request'
import urls from '@/api/urls'

const protocol = {
  state: {
    protocol: ''
  },
  mutations: {
    SET_PROTOCOL(state, data) {
      state.protocol = data
    }
  },
  actions: {
    // 协议内容
    GetProtocol({ commit }, params) {
      return fly.request(urls.protocol, params).then((res) => {
        const value = res.value
        commit('SET_PROTOCOL', value.content)
        return res
      })
    }
  }
}

export default protocol
