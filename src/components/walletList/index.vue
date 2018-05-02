<template>
  <div class="walletList">
    <div class="walletList-title">交易记录</div>
    <scroll-view class="walletList-view" scroll-y @scrolltolower="onScroll">
      <div class="walletList-item" v-for="(item, index) in data" :key="index">
        <div class="walletList-item__title">{{item.title}}</div>
        <div class="walletList-item__time">{{item.submitDate}}</div>
        <div class="walletList-item__amount" :class="item.amountCls">{{item.amount}}</div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: []
    }
  },

  methods: {
    onScroll() {
      this.$emit('scroll')
    }
  }
}
</script>

<style lang="postcss" scoped>
.walletList {
  &-title {
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    color: #666;
    font-size: 28px;
  }
  &-view {
    position: absolute;
    top: 60px;
    bottom: 0;
  }
  &-item {
    position: relative;
    padding: 32px 40px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    &__title {
      font-size: 34px;
      color: #111;
    }
    &__time {
      font-size: 26px;
      color: #888888;
    }
    &__amount {
      position: absolute;
      top: 52px;
      right: 40px;
      font-size: 36px;
      color: #666;
    }
  }
}
</style>
