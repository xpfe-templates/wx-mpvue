<template>
  <div class="index">
    <toast :title="toastTitle" :visible.sync="toastShow" :icon="toastIcon" :duration="0"></toast>
  </div>
</template>

<script>
import wx from 'wx'
import { mapGetters } from 'vuex'
import toast from '@miniui/toast'

export default {
  components: {
    toast
  },
  data() {
    return {
      toastIcon: 'loading',
      toastTitle: '',
      toastShow: false
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'globalQuery'])
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
          this.toastIcon = 'warn'
          this.toastTitle = err.codeDesc
          this.toastShow = true
        })
    },
    // 开门前状态检测
    preCheck() {
      return this.$store
        .dispatch('OpenDoorPreCheck')
        .then(() => {
          this.$router.replace({ path: '/pages/door/index' })
        })
        .catch(err => {
          if (err.codeNum === 80009) {
            this.$router.replace({ path: '/pages/contract/index?path=/pages/door/index' })
          } else if (err.codeNum === 80008) {
            this.$store.commit('SET_GLOBAL_QUERY', {
              ...this.globalQuery,
              ...{ outCode: err.value.unPayCode, from: 'door' }
            })
            this.$router.replace({ path: '/pages/order/detail?outCode=' + err.value.unPayCode })
          }
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
        this.preCheck()
        // 开门
        // this.$router.replace({ path: '/pages/door/index' })
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
  mounted() {
    this.toastIcon = 'loading'
    this.toastTitle = '加载中'
    this.toastShow = true
  },
  onLoad() {
    // q = 'https://prev-aierp.startdtapi.com/aierp/v1/qrCode/generateQrCode10008?action=grantAuth'
    console.log('传入的参数:', this.$root.$mp.query)
    this.$store.commit('SET_GLOBAL_QUERY', this.$root.$mp.query)
    this.fetchLogin(this.$root.$mp.query)
  }
}
</script>
