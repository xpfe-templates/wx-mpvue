<template>
  <div class="wrap userResult">
    <div class="userResult-info">
      <div class="userResult-info__face">
        <img class="u-face-white" :src="verifyResult.faceImgUrl">
      </div>
      <div class="userResult-info__text" :class="verifyResult.typeCls">{{verifyText}}</div>
      <div class="userResult-info__tip" v-if="verifyResult.type !== 'success'">
        <div class="userResult-info__tipText">请保持</div>
        <div class="userResult-info__tipImg">
          <div class="userResult-info__tipImg-item">
            <img src="/static/img/icon-fail-light.png" alt="">
            <div>光线充足</div>
          </div>
          <div class="userResult-info__tipImg-item">
            <img src="/static/img/icon-fail-face.png" alt="">
            <div>正脸拍摄</div>
          </div>
          <div class="userResult-info__tipImg-item">
            <img src="/static/img/icon-fail-people.png" alt="">
            <div>光线充足</div>
          </div>
        </div>
      </div>
    </div>
    <div class="userResult-btn">
      <btn class-name="u-bg-linear1" v-if="verifyResult.type === 'success'" @click="jumpPage" :text="btnText"></btn>
      <btn class-name="u-bg-linear1" v-else @click="takePhoto" text="重新拍摄"></btn>
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
      timer: null,
      countdown: 0
    }
  },
  computed: {
    ...mapGetters(['contractStatus', 'verifyResult']),
    needAuth() {
      return authPay && this.contractStatus === 0
    },
    btnPre() {
      return this.needAuth ? '开通免密支付' : '立即进入'
    },
    btnText() {
      if (this.countdown === 0) return this.btnPre
      return `${this.btnPre}（${this.countdown}s）`
    },
    verifyText() {
      if (this.verifyResult.type === 'success') return '人脸认证成功！'
      return '人脸认证失败！'
    }
  },

  methods: {
    // 获取免密状态
    fetchContractStatus() {
      return this.$store.dispatch('GetContractStatus')
    },
    // 拍摄照片
    takePhoto() {
      this.$store.dispatch('UploadImage').then(() => {
        this.jumpPage()
      })
    },
    // 跳页
    jumpPage() {
      if (this.needAuth) {
        this.jumpContract()
      } else {
        this.jumpIndex()
      }
    },
    // 跳转首页
    jumpIndex() {
      this.$router.replace({ path: '/pages/user/index' })
    },
    // 签约
    jumpContract() {
      this.$router.replace({ path: '/pages/contract/index' })
    },
    // 倒计时
    doCount() {
      clearInterval(this.timer)
      this.countdown = 5
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(this.timer)
          this.jumpPage()
        }
      }, 1000)
    },
    // 重置倒计时
    resetCountdown() {
      clearInterval(this.timer)
      this.countdown = 0
    }
  },

  onShow() {
    if (authPay) {
      this.fetchContractStatus()
    }
    if (this.verifyResult.type === 'success') {
      this.doCount()
    }
  },
  onHide() {
    this.resetCountdown()
  }
}
</script>

<style lang="postcss" scoped>
.userResult {
  justify-content: center;
  background: #fff;
  &-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__face {
      img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
      }
    }
    &__text {
      margin-top: 60px;
      color: #333;
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      &.is-fail {
        color: #b81c22;
      }
    }
    &__tip {
      margin-top: 80px;
      &Text {
        color: #333;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
      }
      &Img {
        margin-top: 40px;
        padding: 0 130px;
        display: flex;
        align-items: center;
      }
    }
    &__tipImg-item {
      margin-right: 95px;
      flex: 1;
      text-align: center;
      img {
        width: 45px;
        height: 45px;
      }
      div {
        margin-top: 12px;
        color: #666;
        font-size: 24px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &-btn {
    box-sizing: border-box;
    width: 100%;
    padding: 0 40px;
    height: 350px;
  }
}
</style>
