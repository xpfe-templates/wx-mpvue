<template>
  <div class="wrap walletCharge">
    <div class="walletCharge-board">
      <img class="walletCharge-board__bg" src="/static/img/img-bg-rect.jpg">
      <div class="walletCharge-board__input">
        <input type="digit" v-model.lazy="amount" placeholder="请输入充值金额">
      </div>
      <div class="walletCharge-board__btn">
        <btn type="white" size="tiny" @click="onCharge" text="支 付"></btn>
      </div>
    </div>
    <div class="walletCharge-view">
      <div class="walletCharge-fast">
        <div class="walletCharge-fast__title">快速充值</div>
        <div class="walletCharge-fast__list">
          <div class="walletCharge-fast__listBtn" v-for="(item, index) in fastList" :key="index">
            <btn type="plain" size="small" @click="onCharge(item, 'fast')" :text="item + ' 元'"></btn>
          </div>
        </div>
        <div class="walletCharge-protocol">
          <span>充值即表示已阅读并同意</span>
          <a class="u-color-primary" href="/pages/protocol/index?code=UNMANNED_SERVICE">《无人店服务协议》</a>
        </div>
      </div>
    </div>
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import toptips from '@miniui/toptips'
import btn from '@miniui/btn'
import { validate } from '@/utils/index'

export default {
  components: {
    toptips,
    btn
  },
  data() {
    return {
      topTitle: '',
      topShow: false,
      isLoading: false,
      amount: '',
      fastList: ['100', '200', '300', '400', '500', '1000']
    }
  },

  methods: {
    onCharge(amount, type) {
      if (this.isLoading) return
      this.isLoading = true
      if (type !== 'fast') {
        // 自定义充值金额，不能用amount判断，该值可能为e
        amount = this.amount
      }
      amount = Number(amount * 100) // 转化为分
      const validateStr = validate.amount(amount)
      if (validateStr) {
        this.topTitle = validateStr
        this.topShow = true
        this.isLoading = false
        return
      }
      this.$store
        .dispatch('ChargeWallet', {
          totalFee: amount,
          tradeType: 3 // 小程序支付
        })
        .then(res => {
          const value = res.value
          return wx.requestPayment(value)
        })
        .then(payRes => {
          const resultObj = {
            type: 'success',
            text: '已成功充值 ' + amount / 100 + ' 元！'
          }
          this.$store.commit('SET_WALLET_RESULT', resultObj)
          this.isLoading = false
          this.$router.push({ path: '/pages/wallet/result' })
        })
        .catch(err => {
          this.isLoading = false
          if (err.errMsg === 'requestPayment:fail cancel') {
            // 手动取消
            this.topTitle = '手动取消'
            this.topShow = true
          } else if (err.value && err.value.tradeMessage) {
            const text = '充值失败，' + err.value.tradeMessage
            const resultObj = {
              type: 'warn',
              text
            }
            this.$store.commit('SET_WALLET_RESULT', resultObj)
            this.$router.push({ path: '/pages/wallet/result' })
          } else {
            this.topTitle = err.codeDesc
            this.topShow = true
          }
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.walletCharge {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  &-board {
    position: relative;
    height: 288px;
    width: 100%;
    &__bg {
      z-index: -1;
      position: absolute;
      top: 0;
      width: 100%;
      height: 288px;
    }
    &__input {
      box-sizing: border-box;
      display: flex;
      width: 350px;
      padding-top: 140px;
      margin-left: 40px;
      border-bottom: 2px solid #fff;
      input {
        flex: 1;
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 36px;
      }
    }
    &__btn {
      position: absolute;
      top: 130px;
      right: 60px;
      &Item {
        color: #fff;
        background: transparent;
        border: 2px solid #fff;
      }
    }
  }
  &-view {
    position: absolute;
    top: 288px;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
  &-fast {
    &__title {
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      color: #666;
      font-size: 28px;
      background: #f8f8f8;
    }
    &__list {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding: 10px 50px 50px;
      &Btn {
        margin-top: 40px;
      }
    }
  }
  &-protocol {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size: 22px;
  }
}
</style>
