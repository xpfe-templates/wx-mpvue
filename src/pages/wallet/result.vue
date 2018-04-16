<template>
  <div class="wrap walletResult">
    <div class="walletResult-view" v-if="walletResult.type === 'success'">
      <div class="walletResult-img">
        <img src="/static/img/icon-success.png" alt="">
      </div>
      <div class="walletResult-text">{{walletResult.text}}</div>
      <div class="walletResult-btn">
        <btn type="plain" size="small" @click="jumpBack" text="完成"></btn>
      </div>
    </div>
    <div class="walletResult-view" v-else>
      <div class="walletResult-img">
        <img src="/static/img/icon-warn.png" alt="">
      </div>
      <div class="walletResult-text">{{walletResult.text}}</div>
      <div class="walletResult-btn">
        <btn type="plain" size="small" @click="jumpBack" text="返回"></btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import btn from '@miniui/btn'

export default {
  components: {
    btn
  },
  computed: {
    ...mapGetters(['walletResult'])
  },

  methods: {
    // 返回上页
    jumpBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="postcss" scoped>
.walletResult {
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
    text-align: center;
  }
}
</style>
