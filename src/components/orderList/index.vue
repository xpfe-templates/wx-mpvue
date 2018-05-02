<template>
  <div class="orderList">
    <scroll-view class="orderList-view" scroll-y scroll-x @scrolltolower="onScroll">
      <div class="orderList-item" v-for="(item, index) in data" :key="index" @click="onClick(item.outCode)">
        <div class="orderList-item__shop">
          <span class="orderList-item__shopTitle u-ellipsis">{{item.submitTime}}</span>
          <span class="orderList-item__shopStatus u-ellipsis" :class="item.statusCls">
            {{item.statusDesc}}
          </span>
        </div>
        <scroll-view class="orderList-item__img" scroll-x v-if="item.goodImgs.length > 0">
          <img v-for="(item2, index2) in item.goodImgs" :key="index2" :src="item2">
        </scroll-view>
        <div class="orderList-item__info">
          <span class="orderList-item__infoCount">共{{item.count}}件商品</span>
          <span class="orderList-item__infoAmount">{{item.amount}}</span>
        </div>
        <div class="orderList-item__btn u-clearfix" v-if="item.status === 1">
          <btn class-name="u-right" type="plain" size="tiny" @click.stop="onOrderClick(item.outCode)" text="付 款"></btn>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import btn from '@miniui/btn'

export default {
  components: {
    btn
  },
  props: {
    data: {
      type: String,
      default: []
    }
  },
  methods: {
    onScroll () {
      this.$emit('scroll')
    },
    onClick (outCode) {
      this.$emit('click', outCode)
    },
    onOrderClick (outCode) {
      this.$emit('orderClick', outCode)
    }
  }
}
</script>

<style lang="postcss" scoped>
.orderList {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  &-view {
    position: absolute;
    top: 0;
    bottom: 0;
  }
  &-item {
    position: relative;
    padding: 30px;
    margin: 20px 20px 0;
    background-color: #fff;
    border-radius: 12px;
    &:last-child {
      margin-bottom: 20px;
    }
    &__shop {
      display: flex;
      align-items: center;
      font-size: 24px;
      line-height: 40px;
      &Icon {
        margin-right: 12px;
        width: 33px;
        height: 33px;
      }
      &Title {
        width: 400px;
        font-size: 28px;
      }
      &Status {
        width: auto;
        flex: 1;
        text-align: right;
        font-weight: normal;
        &.is-unpaid {
          color: #d0021b;
        }
      }
    }
    &__img {
      margin: 30px 0;
      width: 690px;
      height: 106px;
      white-space: nowrap;
      image {
        display: inline-block;
        margin-left: 30px;
        width: 106px;
        height: 106px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    &__info {
      display: flex;
      align-items: center;
      margin-top: 30px;
      color: #999;
      font-size: 24px;
      text-align: right;
      &Count {
        flex: 1;
        text-align: left;
      }
      &Amount {
        flex: 1;
        text-align: right;
        font-size: 28px;
        color: #333;
      }
    }
    &__btn {
      margin-top: 30px;
    }
  }
}
</style>
