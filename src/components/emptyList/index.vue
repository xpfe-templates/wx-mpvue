<template>
  <div class="emptyList">
    <div class="emptyList-img">
      <img src="/static/img/icon-empty.png">
    </div>
    <div class="emptyList-text" v-if="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.emptyList {
  margin-top: 400px;
  &-img {
    text-align: center;
    img {
      width: 54px;
      height: 30px;
    }
  }
  &-text {
    margin-top: 44px;
    text-align: center;
    color: #999;
  }
}
</style>
