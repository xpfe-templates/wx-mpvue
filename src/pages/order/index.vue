<template>
  <div class="wrap order">
    <div class="order-list" v-if="isInit && orderList.length > 0">
      <order-list :data="orderList" @scroll="onScroll" @click="onClick" @orderClick="onOrderClick"></order-list>
    </div>
    <div class="order-empty" v-if="isInit && orderList.length === 0">
      <empty-list text="暂无订单"></empty-list>
    </div>
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import { mapGetters } from 'vuex'
import toptips from '@miniui/toptips'
import orderList from '@/components/orderList'
import emptyList from '@/components/emptyList'

export default {
  components: {
    toptips,
    orderList,
    emptyList
  },
  data () {
    return {
      topTitle: '',
      topShow: false,
      isInit: false, // 初始化标记
      isLoading: false // 是否在请求中
    }
  },

  computed: {
    ...mapGetters(['orderList'])
  },

  methods: {
    onScroll () {
      this.fetchList()
    },
    onClick (outCode) {
      this.$router.push({ path: '/pages/order/detail?outCode=' + outCode })
    },
    onOrderClick (outCode) {
      if (this.isLoading) return
      this.isLoading = true
      this.$store.dispatch('OrderPay', { outCode })
        .then((res) => {
          this.isLoading = false
          this.$router.push({ path: '/pages/order/result' })
        })
        .catch(() => {
          this.isLoading = false
          this.$router.push({ path: '/pages/order/result' })
        })
    },
    // 获取订单列表
    fetchList () {
      if (this.isLoading) return
      this.isLoading = true
      return this.$store.dispatch('GetOrderList')
        .then(() => {
          if (!this.isInit) this.isInit = true
          this.isLoading = false
        })
        .catch((err) => {
          this.topTitle = err.codeDesc
          this.topShow = true
          this.isLoading = false
        })
    },
    // 重置订单页面数据
    resetList () {
      this.isLoading = false
      this.$store.commit('SET_ORDER_LIST', [])
      this.$store.commit('RESET_ORDER_PAGE')
    }
  },

  onShow () {
    this.fetchList()
  },
  onHide () {
    this.resetList()
  },
  onPullDownRefresh () {
    this.resetList()
    this.fetchList()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang="postcss" scoped>
.order {
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  &-list {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
