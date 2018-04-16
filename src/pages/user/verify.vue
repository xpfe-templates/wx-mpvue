<template>
  <div class="wrap userVerify">
    <div class="userVerify-bg">
      <img class="userVerify-bg__img" src="/static/img/img-bg-verify.jpg">
    </div>
    <div class="userVerify-action">
      <img class="userVerify-action__img" src="/static/img/icon-camera.png" @click="takePhoto">
      <div class="userVerify-action__text">开始拍摄</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['globalQuery'])
  },
  methods: {
    // 拍摄照片
    takePhoto() {
      this.$store
        .dispatch('UploadImage')
        .then(() => {
          this.jumpResult()
        })
        .catch(() => {
          this.jumpResult()
        })
    },
    // 跳转结果页
    jumpResult() {
      this.$router.replace({ path: '/pages/user/result' })
    }
  },

  onShow() {
    // 如果用户注册到绑脸阶段退出，再次进入该页面，自动绑脸
    const faceImgUrl = this.globalQuery.faceImgUrl
    if (faceImgUrl) {
      this.$store
        .dispatch('AutoBindFace', faceImgUrl)
        .then(() => {
          this.jumpResult()
        })
        .catch(() => {
          this.jumpResult()
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.userVerify {
  &-bg {
    position: relative;
    width: 100%;
    height: 780px;
    &__img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  &-action {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    &__img {
      width: 140px;
      height: 140px;
    }
    &__text {
      color: #666;
      font-size: 30px;
    }
  }
}
</style>
