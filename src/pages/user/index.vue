<template>
  <div class="wrap user">
    <div class="user-info">
      <img class="user-info__bg" src="/static/img/img-bg-round.jpg">
      <div class="user-info__face" v-if="userDetail.faceImgUrl" @click="onChangePhoto">
        <img class="user-info__faceImg u-face-bg" :src="userDetail.faceImgUrl">
        <img class="user-info__faceIcon" src="/static/img/icon-edit.png">
      </div>
      <div class="user-info__name u-ellipsis">{{userDetail.nickName}}</div>
    </div>
    <div class="user-list">
      <list-group :data="menuList" @click="onChangeContract"></list-group>
      <list-group v-if="authPay" :data="contractList" @click="onChangeContract"></list-group>
    </div>
    <div class="user-help">
      <help></help>
    </div>
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import { mapGetters } from 'vuex'
import { authPay } from '@/appConfig'
import toptips from '@miniui/toptips'
import listGroup from '@miniui/list'
import help from '@/components/help'

export default {
  components: {
    toptips,
    listGroup,
    help
  },
  data() {
    return {
      topTitle: '',
      topShow: false,
      authPay, // 免密代扣开关
      isInit: false, // 是否是第一次
      menuList: [
        {
          icon: '/static/img/icon-order.png',
          title: '订单',
          link: '/pages/order/index'
        },
        {
          icon: '/static/img/icon-wallet.png',
          title: '钱包',
          link: '/pages/wallet/index'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userDetail', 'contractStatus']),
    contractList() {
      let ret = [
        {
          icon: '/static/img/icon-lock.png',
          title: '免密支付',
          desc: '',
          arrow: false
        }
      ]
      if (this.contractStatus === 1) {
        ret[0].desc = '已开通'
        ret[0].arrow = false
      } else if (this.contractStatus === 0) {
        ret[0].desc = '未开通'
        ret[0].arrow = true
      }
      return ret
    }
  },

  methods: {
    // 签约
    onChangeContract(item) {
      if (this.contractStatus === 0) {
        this.$router.replace({ path: '/pages/contract/index?path=/pages/user/index' })
      } else if (this.contractStatus === 1) {
        this.dismissContract()
      }
    },
    // 更换照片
    onChangePhoto() {
      const token = wx.getStorageSync('token')
      if (!token) return
      wx
        .showModal({
          title: '提示',
          content: '是否重新拍摄？'
        })
        .then(res => {
          if (res.confirm) {
            this.takePhoto()
          }
        })
    },
    // 获取信息
    fetchData(init) {
      if (authPay) {
        return Promise.all([this.fetchUserDetail(), this.fetchContractStatus()])
      }
      return Promise.all([this.fetchUserDetail()])
    },
    fetchUserDetail() {
      return this.$store
        .dispatch('GetUserDetail')
        .then(() => {})
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
        })
    },
    fetchContractStatus() {
      this.$store.dispatch('GetContractStatus')
    },
    // 拍摄照片
    takePhoto() {
      this.$store
        .dispatch('UploadImage')
        .then(() => {})
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
        })
    },
    // 解约
    dismissContract() {
      wx
        .showModal({
          title: '提示',
          content: '确定关闭微信免密支付功能？'
        })
        .then(res => {
          if (res.confirm) {
            return this.$store.dispatch('DismissContract')
          }
        })
    }
  },

  mounted() {
    this.fetchData().then(() => {
      this.isInit = true
    })
  },
  onShow() {
    if (!this.isInit) return
    this.fetchData()
  },
  onPullDownRefresh() {
    this.fetchData()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang="postcss" scoped>
.user {
  &-info {
    position: relative;
    width: 100%;
    height: 300px;
    &__bg {
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    &__face {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 60px;
      width: 140px;
      height: 140px;
      text-align: center;
      &Img {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        box-shadow: 0 2px 13px 0 #999999;
      }
      &Icon {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 36px;
        height: 36px;
      }
    }
    &__name {
      margin: 20px 40px 0;
      line-height: 40px;
      color: #fff;
      text-align: center;
    }
    &__open {
      position: absolute;
      right: 30px;
      top: 30px;
      width: 85px;
      height: 85px;
    }
  }
  &-list {
    width: 100%;
    flex: 1;
  }
  &-help {
    padding-bottom: 30px;
  }
}
</style>

