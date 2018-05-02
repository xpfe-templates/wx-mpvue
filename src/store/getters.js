const getters = {
  // user模块
  userInfo: state => state.app.userInfo,
  globalQuery: state => state.app.globalQuery,
  userDetail: state => state.user.userDetail,
  contractStatus: state => state.user.contractStatus,
  verifyResult: state => state.user.verifyResult,
  // order模块
  orderList: state => state.order.orderList,
  orderPage: state => state.order.orderPage,
  orderResult: state => state.order.orderResult,
  orderDetail: state => state.order.orderDetail,
  // wallet模块
  walletInfo: state => state.wallet.walletInfo,
  walletList: state => state.wallet.walletList,
  walletPage: state => state.wallet.walletPage,
  walletResult: state => state.wallet.walletResult,
  // protocol模块
  protocol: state => state.protocol.protocol
}
export default getters
