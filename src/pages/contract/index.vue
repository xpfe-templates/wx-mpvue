<template>
  <div class="wrap contract">
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import toptips from '@miniui/toptips'

export default {
  components: {
    toptips
  },
  data() {
    return {
      topTitle: '',
      topShow: false,
      from: '' // 返回场景
    }
  },

  methods: {
    // 跳回首页
    jumpPage() {
      const q = this.$root.$mp.query
      if (q.back) {
        const delta = -q.back
        this.$router.go(delta)
      } else {
        const path = q.path || '/pages/user/index'
        this.$router.replace({ path })
      }
    },
    // 获取免密状态
    fetchContractStatus() {
      this.$store
        .dispatch('GetContractStatus')
        .then(res => {
          const status = res.value.status
          if (status) {
            this.jumpPage()
          } else {
            this.signContract()
          }
        })
        .catch(() => {
          this.jumpPage()
        })
    },
    // 签约
    signContract() {
      this.$store
        .dispatch('SignContract')
        .then(res => {
          this.form = 'signApp'
          const extraData = res.value
          return wx.navigateToMiniProgram({
            appId: 'wxbd687630cd02ce1d',
            path: 'pages/index/index',
            extraData
          })
        })
        .catch(err => {
          this.topTitle = err.codeDesc || err.errMsg
          this.topShow = true
          // 显示错误，3s后跳转
          setTimeout(this.jumpPage, 3000)
        })
    }
  },

  onShow() {
    if (this.from === 'signApp') { // 从签约App返回
      this.from = ''
      this.jumpPage()
    } else {
      this.fetchContractStatus()
    }
  }
}
</script>

<style lang="postcss" scoped>
.contract {
}
</style>
