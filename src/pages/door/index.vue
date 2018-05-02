<template>
  <div class="wrap door">
    <div class="door-btn">
      <div class="door-btnItem u-bg-linear1" @click="openDoor">开 门</div>
    </div>
    <div class="door-logo">
      <img src="/static/img/icon-logo.png" alt="">
    </div>
    <toast :title="toastTitle" :visible.sync="toastShow"></toast>
  </div>
</template>

<script>
import wx from 'wx'
import { mapGetters } from 'vuex'
import toast from '@miniui/toast'

export default {
  components: {
    toast
  },
  data () {
    return {
      toastTitle: '',
      toastShow: false
    }
  },
  computed: {
    ...mapGetters(['globalQuery'])
  },

  methods: {
    openDoor() {
      const storeCode = this.globalQuery.storeCode
      this.$store
        .dispatch('OpenDoor', { storeCode })
        .then(() => {
          this.toastTitle = '门已开'
          this.toastShow = true
        })
        .catch(err => {
          wx.showModal({
            title: '提示',
            content: err.codeDesc,
            showCancel: false
          })
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.door {
  background: #fff;
  &-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &Item {
      width: 220px;
      height: 220px;
      line-height: 220px;
      text-align: center;
      color: #fff;
      font-size: 40px;
      border-radius: 50%;
    }
  }
  &-logo {
    height: 300px;
    text-align: center;
    img {
      width: 350px;
      height: 150px;
    }
  }
}
</style>
