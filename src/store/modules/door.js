/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-11 04:00:18
 * @modify date 2018-04-11 04:00:18
 * @desc [door]
 */

import fly from '@/api/request'
import urls from '@/api/urls'
import { appId } from '@/appConfig'

const door = {
  state: {},
  mutations: {},
  actions: {
    OpenDoor({ commit }, params) {
      return fly.request(urls.openDoor, params)
    },
    OpenDoorPreCheck ({ commit }, params) {
      return fly.request(urls.openDoorPreCheck, {
        appId
      })
    }
  }
}

export default door
