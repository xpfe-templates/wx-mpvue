<template>
  <div class="index">
    <toast :title="toastTitle" :visible.sync="toastShow" :icon="toastIcon" :duration="0"></toast>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userAuth } from '@/appConfig'
import toast from '@miniui/toast'

export default {
  components: {
    toast
  },
  data() {
    return {
      toastIcon: 'loading',
      toastTitle: '',
      toastShow: false
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'globalQuery'])
  },

  methods: {
    // 入口分析
    formatEntry(formatQ) {
      if (!formatQ || Object.keys(formatQ).length === 0) {
        // 普通进入，1s后进入
        setTimeout(() => {
          this.$router.replace({ path: '/pages/user/index' })
        }, 1000)
      }
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    if (userAuth) {
      this.$store.dispatch('GetUserInfo')
    }
  },
  mounted() {
    this.toastIcon = 'loading'
    this.toastTitle = '加载中'
    this.toastShow = true
  },
  onLoad() {
    console.log('传入的参数:', this.$root.$mp.query)
    this.$store.commit('SET_GLOBAL_QUERY', this.$root.$mp.query)
    this.formatEntry(this.$root.$mp.query)
  }
}
</script>
