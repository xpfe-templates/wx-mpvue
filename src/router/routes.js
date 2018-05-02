/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-09 01:48:05
 * @modify date 2018-04-09 01:48:05
 * @desc [页面路由配置]
 */

module.exports = [
  {
    path: '/pages/index/index',
    config: {}
  },
  {
    path: '/pages/user/index',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/user/location',
    config: {
      navigationBarTitleText: '地址'
    }
  },
  {
    path: '/pages/user/feedback',
    config: {
      navigationBarTitleText: '反馈'
    }
  }
]
