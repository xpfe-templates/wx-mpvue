<template>
  <div class="wrap userRegister">
    <div class="userRegister-face">
      <img class="u-face-white" :src="faceImgUrl" alt="">
    </div>
    <div class="userRegister-form">
      <div class="userRegister-formItem userRegister-phone">
        <input type="number" v-model="phone" placeholder="请输入手机号码" placeholder-style="color:#ccc;">
      </div>
      <div class="userRegister-formItem userRegister-code">
        <input type="number" v-model="code" placeholder="请输入验证码" placeholder-style="color:#ccc;">
        <div class="userRegister-code__btn u-color-primary" @click="onCode">{{codeText}}</div>
      </div>
      <div class="userRegister-submit">
        <btn class-name="u-bg-linear1" @click="onSubmit" text="开启服务"></btn>
      </div>
      <div class="userRegister-protocol">
        <div class="userRegister-protocol__text">点击开启服务，即表示已阅读并同意</div>
        <div class="userRegister-protocol__link u-color-primary">
          <a href="/pages/protocol/index?code=UNMANNED_SERVICE">《无人店服务协议》</a>
        </div>
      </div>
      <div class="userRegister-logo">
        <img src="/static/img/icon-logo.png">
      </div>
    </div>
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import { mapGetters } from 'vuex'
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
      phone: '',
      code: '',
      codeText: '获取验证码',
      timer: null // 验证码timer
    }
  },
  computed: {
    ...mapGetters(['globalQuery', 'userInfo']),
    faceImgUrl() {
      return this.globalQuery.faceImgUrl || '/static/img/img-face-default.png'
    },
    codeText() {
      if (this.countdown === 0) return '获取验证码'
      return this.countdown + 's'
    }
  },

  methods: {
    // 获取验证码
    onCode() {
      if (this.countdown > 0) return
      const phone = this.phone
      if (!validate.phone(phone)) {
        this.topTitle = '请输入正确的手机号码'
        this.topShow = true
        return
      }
      this.countdown = 60
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(this.timer)
        }
      }, 1000)
      this.$store
        .dispatch('SendSMS', { phone })
        .then(() => {})
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
          this.resetCountdown()
        })
    },
    // 提交
    onSubmit() {
      if (this.isLoading) return
      const faceId = this.globalQuery.faceId || ''
      const { phone, code } = this
      if (!validate.phone(phone)) {
        this.topTitle = '请输入正确的手机号码'
        this.topShow = true
        return
      }
      if (!code) {
        this.topTitle = '验证码不能为空'
        this.topShow = true
        return
      }
      this.isLoading = true
      let params = { phone, code, faceId }
      // 如果用户一直没授权，需要先添加信息
      const status = wx.getStorageSync('status')
      if (status === 0) {
        this.addUserInfo()
          .then(() => {
            this.addPhone(params)
          })
          .catch(err => {
            this.topTitle = err.codeDesc
            this.topShow = true
            this.isLoading = false
          })
      } else {
        this.addPhone(params)
      }
    },
    // 添加用户信息
    addUserInfo() {
      // status判断放在添加时候做，主要为了防止用户迟迟不授权的情况
      const status = wx.getStorageSync('status')
      if (status > 0) return Promise.reject()
      const userInfo = this.userInfo
      return this.$store
        .dispatch('AddUserInfo', userInfo)
        .then(() => {
          wx.setStorageSync('status', 1)
        })
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
        })
    },
    // 添加收集并注册
    addPhone(params) {
      return this.$store
        .dispatch('AddPhone', params)
        .then(() => {
          this.isLoading = false
          const status = params.faceId ? 3 : 2
          wx.setStorageSync('status', status)
          if (status === 2) {
            this.$router.replace({ path: '/pages/user/verify' })
          } else {
            this.$router.replace({ path: '/pages/user/index' })
          }
        })
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
          this.isLoading = false
        })
    },
    // 重置倒计时
    resetCountdown() {
      clearInterval(this.timer)
      this.countdown = 0
    }
  },

  onShow() {
    this.addUserInfo()
  },
  onHide() {
    this.resetCountdown()
  },
  onPullDownRefresh() {
    this.resetCountdown()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang="postcss" scoped>
.userRegister {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  &-face {
    margin-top: 90px;
    width: 100%;
    height: 160px;
    text-align: center;
    img {
      box-sizing: border-box;
      width: 160px;
      height: 160px;
      border-radius: 50%;
    }
  }
  &-form {
    margin-top: 90px;
    &Item {
      box-sizing: border-box;
      display: flex;
      height: 60px;
      padding: 6px 0;
      margin: 0 40px;
      border-bottom: 1px solid #ccc;
      input {
        flex: 1;
        line-height: 48px;
        font-size: 34px;
        color: #333;
      }
    }
  }
  &-code {
    margin-top: 70px;
    &__btn {
      width: 240px;
      font-size: 34px;
      text-align: right;
    }
  }
  &-submit {
    margin-top: 90px;
  }
  &-protocol {
    margin: 20px 100px 0;
    text-align: center;
    font-size: 24px;
    &__text {
      line-height: 32px;
      color: #999;
    }
    &__link {
      line-height: 32px;
    }
  }
  &-logo {
    margin-top: 170px;
    text-align: center;
    img {
      width: 350px;
      height: 150px;
    }
  }
}
</style>
