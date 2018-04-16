<template>
  <div class="wrap orderDetail">
    <div class="orderDetail-info">
      <div class="orderDetail-hd">
        <img class="orderDetail-hd__img" :src="orderDetail.imgurl" alt="">
        <span calss="orderDetail-hd__name">{{orderDetail.storeName}}</span>
        <span class="orderDetail-hd__status" :class="orderDetail.statusCls">{{orderDetail.statusDesc}}</span>
      </div>
      <div class="orderDetail-bd">
        <div class="orderDetail-bd__item" v-for="(item, index) in orderDetail.goods" :key="index">
          <img class="orderDetail-bd__itemImg" :src="item.goodImg" alt="">
          <span class="orderDetail-bd__itemName">{{item.name}}</span>
          <div class="orderDetail-bd__itemPrice">
            <div>{{item.price}}</div>
            <div>x {{item.count}}</div>
          </div>
        </div>
      </div>
      <div class="orderDetail-ft">
        <div class="orderDetail-ft__total">
          <div class="orderDetail-ft__count">共{{orderDetail.count}}件商品</div>
          <div class="orderDetail-ft__amount">
            <span>{{orderDetail.status === 1 ? '需付款：' : '实付款：'}}</span>
            <span class="u-color-primary">{{orderDetail.amount}}</span>
          </div>
        </div>
        <div v-if="orderDetail.status === 1" class="orderDetail-ft__btn u-clearfix">
          <btn class-name="u-right" type="plain" size="tiny" @click.stop="onOrderClick(orderDetail.outCode)" text="付 款"></btn>
        </div>
      </div>
    </div>
    <div class="orderDetail-other">
      <div class="orderDetail-other__item">订单编号：{{orderDetail.outCode}}</div>
      <div class="orderDetail-other__item" v-if="orderDetail.payType">支付方式：{{orderDetail.payType}}</div>
      <div class="orderDetail-other__item" v-if="orderDetail.payLogid">支付交易号：{{orderDetail.payLogid}}</div>
      <div class="orderDetail-other__item">交易时间：{{orderDetail.submitTime}}</div>
      <div class="orderDetail-other__help">
        <help></help>
      </div>
    </div>
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import toptips from '@miniui/toptips'
import btn from '@miniui/btn'
import help from '@/components/help'

export default {
  components: {
    toptips,
    btn,
    help
  },
  data() {
    return {
      topTitle: '',
      topShow: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['orderDetail'])
  },

  methods: {
    // 支付订单
    onOrderClick(outCode) {
      if (this.isLoading) return
      this.isLoading = true
      this.$store
        .dispatch('OrderPay', { outCode })
        .then(res => {
          this.isLoading = false
          this.$router.push({ path: '/pages/order/result' })
        })
        .catch(() => {
          this.isLoading = false
          this.$router.push({ path: '/pages/order/result' })
        })
    },
    // 获取订单详情
    fetchDetail() {
      this.$store
        .dispatch('GetOrderDetail', { outCode: this.$root.$mp.query.outCode })
        .then(() => {})
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
        })
    }
  },

  onShow() {
    this.fetchDetail()
  },
  onPullDownRefresh() {
    this.fetchDetail()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang="postcss" scoped>
.orderDetail {
  &-info {
    box-sizing: border-box;
    width: 100%;
    background: #fff;
  }
  &-hd {
    display: flex;
    align-items: center;
    padding: 20px 0;
    margin: 0 15px;
    border-bottom: 1px solid #eee;
    &__img {
      width: 33px;
      height: 33px;
      margin: 0 15px;
    }
    &__name {
      flex: 2;
      font-size: 34px;
      color: #111;
      font-weight: bold;
    }
    &__status {
      margin-right: 15px;
      flex: 1;
      font-size: 26px;
      text-align: right;
      &.is-unpaid {
        color: #d0021b;
      }
    }
  }
  &-bd {
    &__item {
      padding: 30px 0;
      margin: 0 15px;
      display: flex;
      border-bottom: 1px solid #eee;
      &Img {
        width: 120px;
        height: 120px;
        margin: 0 20px 0 15px;
      }
      &Name {
        flex: 2;
        height: 80px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &Price {
        flex: 1;
        margin-right: 15px;
        div {
          line-height: 60px;
          text-align: right;
          &:last-child {
            font-size: 26px;
            color: #999;
          }
        }
      }
    }
  }
  &-ft {
    padding: 30px 0;
    margin: 0 30px;
    &__total {
      display: flex;
      align-items: center;
      font-size: 26px;
    }
    &__count {
      flex: 1;
    }
    &__amount {
      flex: 1;
      text-align: right;
    }
    &__btn {
      margin-top: 30px;
    }
  }
  &-other {
    box-sizing: border-box;
    padding: 30px;
    width: 100%;
    margin-top: 30px;
    background: #fff;
    &__item {
      font-size: 24px;
      color: #888;
      margin-top: 15px;
      &:first-child {
        margin-top: 0;
      }
    }
    &__help {
      margin-top: 100px;
    }
  }
}
</style>
