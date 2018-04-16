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
    path: '/pages/user/register',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '注册'
    }
  },
  {
    path: '/pages/user/verify',
    config: {
      navigationBarTitleText: '人脸认证'
    }
  },
  {
    path: '/pages/user/result',
    config: {
      navigationBarTitleText: '认证结果'
    }
  },
  {
    path: '/pages/order/index',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '订单'
    }
  },
  {
    path: '/pages/order/detail',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '订单详情'
    }
  },
  {
    path: '/pages/order/result',
    config: {
      navigationBarTitleText: '支付结果'
    }
  },
  {
    path: '/pages/wallet/index',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '钱包'
    }
  },
  {
    path: '/pages/wallet/charge',
    config: {
      navigationBarTitleText: '充值'
    }
  },
  {
    path: '/pages/wallet/result',
    config: {
      navigationBarTitleText: '充值结果'
    }
  },
  {
    path: '/pages/contract/index',
    config: {
      navigationBarTitleText: '免密代扣'
    }
  },
  {
    path: '/pages/protocol/index',
    config: {
      navigationBarTitleText: ''
    }
  },
  {
    path: '/pages/door/index',
    config: {
      navigationBarTitleText: '开门'
    }
  }
]
