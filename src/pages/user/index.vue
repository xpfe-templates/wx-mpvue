<template>
  <div class="wrap user">
    <div class="user-bg">
      <img class="user-bg__img" src="/static/img/img-bg-company.jpg">
    </div>
    <div class="user-list">
      <list-group :data="menuList" @click="onJumpPage"></list-group>
    </div>
  </div>
</template>

<script>
import wx from 'wx'
import { serviceNumber } from '@/appConfig'
import listGroup from '@miniui/list'

export default {
  components: {
    listGroup
  },
  data() {
    return {
      menuList: [
        {
          icon: '/static/img/icon-lock.png',
          title: '浙江省杭州市余杭区仓兴街1号38幢',
          link: '/pages/user/location'
        },
        {
          type: 'phone',
          icon: '/static/img/icon-phone.png',
          title: '0571-28121848'
        },
        {
          icon: '/static/img/icon-help.png',
          title: '反馈问题',
          link: '/pages/user/feedback'
        }
      ]
    }
  },

  methods: {
    onJumpPage(item) {
      if (item.type === 'phone') {
        wx.makePhoneCall({ phoneNumber: serviceNumber })
      }
    }
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang="postcss" scoped>
.user {
  &-bg {
    position: relative;
    width: 100%;
    height: 540px;
    &__img {
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  &-list {
    width: 100%;
  }
}
</style>

