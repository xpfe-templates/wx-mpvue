<template>
  <div class="index">
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import { mapGetters } from 'vuex'
import toptips from '@miniui/toptips'

export default {
  components: {
    toptips
  },
  data() {
    return {
      topTitle: '',
      topShow: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    // 登录方法
    fetchLogin(formatQ) {
      this.$store
        .dispatch('WxLogin')
        .then(res => {
          const { token, status } = res.value
          wx.setStorageSync('token', token)
          wx.setStorageSync('status', status)
          if (status === 0 || status === 1) {
            // 注册绑脸
            this.$router.replace({ path: '/pages/user/register' })
          } else if (status === 2) {
            // 未绑脸
            this.$router.replace({ path: '/pages/user/verify' })
          } else {
            this.formatEntry(formatQ)
          }
        })
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
        })
    },
    // 入口分析
    formatEntry(formatQ) {
      if (!formatQ || Object.keys(formatQ).length === 0) {
        // 普通进入
        this.$router.replace({ path: '/pages/user/index' })
      } else if (formatQ.faceId) {
        // 注册绑脸
        this.$router.replace({ path: '/pages/user/register' })
      } else if (formatQ.outOrderCode) {
        // 未支付订单
        this.$router.replace({ path: '/pages/order/detail' })
      } else if (formatQ.storeCode) {
        // 开门
        this.$router.replace({ path: '/pages/door/index' })
      } else if (formatQ.action === 'grantAuth') {
        // 开通免密
        this.$router.replace({ path: '/pages/contract/index' })
      }
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.$store.dispatch('GetUserInfo')
  },
  onLoad() {
    // q = 'https://prev-aierp.startdtapi.com/aierp/v1/qrCode/generateQrCode10008?action=grantAuth'
    console.log('传入的参数:', this.$root.$mp.query)
    this.$store.commit('SET_GLOBAL_QUERY', this.$root.$mp.query)
    this.fetchLogin(this.$root.$mp.query)
  }
}
</script>
