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
      'pages/user/location',
      'pages/user/feedback'
    ],
    // 微信window参数
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'MNUI',
      navigationBarTextStyle: 'black'
    }
    // 有tabBar的时候配置
    // tabBar: {}
  }
}
