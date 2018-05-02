<template>
  <div class="help" @click="makeCall">
    <div class="help-img"><img src="/static/img/icon-help.png"></div>
    <div class="help-text">需要帮助</div>
  </div>
</template>

<script>
import wx from 'wx'
import { serviceNumber } from '@/appConfig'

export default {
  methods: {
    makeCall () {
      wx.makePhoneCall({ phoneNumber: serviceNumber })
    }
  }
}
</script>

<style lang="postcss" scoped>
.help {
  display: flex;
  flex-direction: column;
  &-img {
    height: 30px;
    text-align: center;
    image {
      width: 30px;
      height: 30px;
    }
  }
  &-text {
    margin-top: 6px;
    line-height: 30px;
    text-align: center;
    font-size: 24px;
    color: #666;
  }
}
</style>
