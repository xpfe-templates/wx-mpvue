<template>
  <div class="wrap userFeedback">
    <div class="userFeedback-textarea">
      <textarea placeholder="请输入反馈内容，最多不超过140个字" v-model="text"></textarea>
    </div>
    <div class="userFeedback-btn">
      <btn @click="onSubmit" text="提交"></btn>
    </div>
    <toptips :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import btn from '@miniui/btn'
import toptips from '@miniui/toptips'

export default {
  components: {
    btn,
    toptips
  },
  data() {
    return {
      topTitle: '',
      topShow: false,
      text: ''
    }
  },

  methods: {
    onSubmit() {
      if (!this.text) {
        this.topTitle = '内容不能为空'
        this.topShow = true
        return
      }
      wx.showToast({
        title: '提交成功',
        showCancel: false
      })
      setTimeout(() => {
        this.$router.back()
      }, 1500)
    }
  }
}
</script>

<style lang="postcss" scoped>
.userFeedback {
  &-textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 60px 40px;
    textarea {
      box-sizing:border-box;
      width: 100%;
      height: 300px;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
    }
  }
  &-btn {
    box-sizing: border-box;
    margin-top: 30px;
    padding: 0 40px;
    width: 100%;
  }
}
</style>
