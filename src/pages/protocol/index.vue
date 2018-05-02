<template>
  <div class="wrap protocol">
    <div class="protocol-wrap">
      <wx-parse noData="" :content="protocol"></wx-parse>
    </div>
    <toptips class-name="u-toptips-red" :title="topTitle" :visible.sync="topShow"></toptips>
  </div>
</template>

<script>
import wx from 'wx'
import wxParse from 'mpvue-wxparse'
import { mapGetters } from 'vuex'
import { appId } from '@/appConfig'
import toptips from '@miniui/toptips'

export default {
  components: {
    toptips,
    wxParse
  },
  data () {
    return {
      topTitle: '',
      topShow: false
    }
  },
  computed: {
    ...mapGetters(['protocol'])
  },

  methods: {
    fetchData() {
      const code = this.$root.$mp.query.code
      if (!code) return
      this.$store
        .dispatch('GetProtocol', { appId, code })
        .then(res => {
          const value = res.value
          wx.setNavigationBarTitle({ title: value.name })
        })
        .catch(err => {
          this.topTitle = err.codeDesc
          this.topShow = true
        })
    }
  },

  onShow() {
    this.fetchData()
  },
  onPullDownRefresh() {
    this.fetchData()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang="postcss">
@import url("mpvue-wxparse/src/wxParse.css");
.protocol {
  padding: 20px;
  &-wrap {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding: 40px;
    background: #fff;
  }
}
</style>
