/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 03:44:42
 * @modify date 2017-08-03 06:04:07
 * @desc [store]
*/

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import order from './modules/order'
import wallet from './modules/wallet'
import protocol from './modules/protocol'
import door from './modules/door'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    order,
    wallet,
    protocol,
    door
  },
  getters
})

export default store
