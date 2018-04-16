import Vue from 'vue'
import store from '@/store'
import App from '@/App'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(MpvueRouterPatch)

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面配置
    pages: [
      'pages/index/index',
      'pages/user/index',
      'pages/user/register',
      'pages/user/verify',
      'pages/user/result',
      'pages/order/index',
      'pages/order/detail',
      'pages/order/result',
      'pages/wallet/index',
      'pages/wallet/charge',
      'pages/wallet/result',
      'pages/contract/index',
      'pages/protocol/index',
      'pages/door/index'
    ],
    // 微信window参数
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'mnui',
      navigationBarTextStyle: 'black'
    }
    // 有tabBar的时候配置
    // tabBar: {}
  }
}
