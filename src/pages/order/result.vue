<template>
  <div class="wrap orderResult">
    <div class="orderResult-view" v-if="orderResult.type === 'success'">
      <div class="orderResult-img">
        <img src="/static/img/icon-success.png" alt="">
      </div>
      <div class="orderResult-text">{{orderResult.text}}</div>
      <div class="orderResult-btn" v-if="isInit">
        <btn type="plain" size="small" @click="jumpPage" :text="btnText"></btn>
        <div class="orderResult-btn__sub" v-if="needAuth">开通后订单将自动支付，享受便捷体验</div>
      </div>
    </div>
    <div class="orderResult-view" v-else>
      <div class="orderResult-img">
        <img src="/static/img/icon-warn.png" alt="">
      </div>
      <div class="orderResult-text">{{orderResult.text}}</div>
      <div class="orderResult-btn">
        <btn type="plain" size="small" @click="jumpBack" text="返回"></btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import btn from '@miniui/btn'
import { authPay } from '@/appConfig'

export default {
  components: {
    btn
  },
  data() {
    return {
      isInit: false
    }
  },
  computed: {
    ...mapGetters(['orderResult', 'contractStatus', 'globalQuery']),
    needAuth() {
      return authPay && this.contractStatus === 0
    },
    btnText() {
      if (this.needAuth) return '开通免密支付'
      return '查看订单'
    }
  },

  methods: {
    // 获取免密状态
    fetchContractStatus() {
      return this.$store.dispatch('GetContractStatus')
    },
    // 跳页
    jumpPage() {
      if (this.needAuth) {
        this.jumpContract()
      } else {
        this.jumpBack()
      }
    },
    // 返回上页
    jumpBack() {
      if (this.globalQuery.from === 'door') { // 从扫码开门来
        this.$router.replace({ path: '/pages/door/index' })
      } else {
        this.$router.back()
      }
    },
    // 签约
    jumpContract() {
      this.$router.replace({ path: '/pages/contract/index?back=1' })
    }
  },

  onShow() {
    if (authPay) {
      this.fetchContractStatus().then(() => {
        this.isInit = true
      })
    } else {
      this.isInit = true
    }
  }
}
</script>

<style lang="postcss" scoped>
.orderResult {
  background: #fff;
  &-img {
    margin-top: 200px;
    text-align: center;
    img {
      width: 200px;
      height: 200px;
    }
  }
  &-text {
    text-align: center;
    margin-top: 90px;
    font-size: 36px;
    font-weight: bold;
  }
  &-btn {
    margin-top: 300px;
    &__sub {
      margin-top: 12px;
      font-size: 24px;
      color: #999;
    }
  }
}
</style>
