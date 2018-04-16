<template>
  <div class="wrap wallet">
    <div class="wallet-info">
      <img class="wallet-info__bg" src="/static/img/img-bg-rect.jpg">
      <div class="wallet-info__title">余额（元）</div>
      <div class="wallet-info__text">{{walletInfo.balance}}</div>
      <div class="wallet-info__btn">
        <btn type="white" size="tiny" @click="onJumpCharge" text="充 值"></btn>
      </div>
    </div>
    <div class="wallet-list" v-if="isInit && walletList.length > 0">
      <wallet-list :data="walletList" @scroll="onScroll"></wallet-list>
    </div>
    <div class="wallet-empty" v-if="isInit && walletList.length === 0">
      <empty-list text="暂无交易记录"></empty-list>
    </div>
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import { mapGetters } from 'vuex'
import toptips from '@miniui/toptips'
import btn from '@miniui/btn'
import walletList from '@/components/walletList'
import emptyList from '@/components/emptyList'

export default {
  components: {
    toptips,
    btn,
    walletList,
    emptyList
  },
  data() {
    return {
      topTitle: '',
      topShow: false,
      isInit: false, // 初始化标记
      isLoading: false // 是否在请求中
    }
  },

  computed: {
    ...mapGetters(['walletInfo', 'walletList'])
  },

  methods: {
    onScroll() {
      this.fetchList()
    },
    // 跳转充值页
    onJumpCharge() {
      this.$router.push({ path: '/pages/wallet/charge' })
    },
    // 获取钱包信息
    fetchInfo() {
      return this.$store.dispatch('GetWalletInfo')
    },
    // 获取钱包列表
    fetchList() {
      if (this.isLoading) return
      this.isLoading = true
      return this.$store
        .dispatch('GetWalletList')
        .then(() => {
          if (!this.isInit) this.isInit = true
          this.isLoading = false
        })
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
          this.isLoading = false
        })
    },
    // 获取信息集合
    fetchData() {
      this.fetchInfo()
      this.fetchList()
    },
    // 重置订单页面数据
    resetList() {
      this.isLoading = false
      this.$store.commit('SET_WALLET_LIST', [])
      this.$store.commit('RESET_WALLET_PAGE')
    }
  },

  onShow() {
    this.fetchData()
  },
  onHide() {
    this.resetList()
  },
  onPullDownRefresh() {
    this.resetList()
    this.fetchData()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang="postcss" scoped>
.wallet {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  &-info {
    position: relative;
    height: 288px;
    width: 100%;
    color: #fff;
    &__bg {
      z-index: -1;
      position: absolute;
      top: 0;
      width: 100%;
      height: 288px;
    }
    &__title {
      padding: 75px 0 0 40px;
      font-size: 28px;
    }
    &__text {
      padding: 0 40px;
      font-size: 80px;
      font-weight: bold;
    }
    &__btn {
      box-sizing: border-box;
      position: absolute;
      top: 130px;
      right: 60px;
    }
  }
  &-list {
    position: absolute;
    top: 288px;
    bottom: 0;
    width: 100%;
  }
}
</style>
