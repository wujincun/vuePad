<template>
  <transition name="fade">
    <div id="orderDetail" :class="showDetail?'show':'hide'">
      <transition name="slideDetail">
        <div class="detailContent" :class="showDetail?'spread':'off'">
          222
        </div>
      </transition>
    </div>

  </transition>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderDetail {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    display: flex;
    align-items: center;
    &.show {
      transition: all 0.4s;
      opacity: 0.5;
    }
    &.hide {
      transition: opacity 0.4s;
      opacity: 0;
    }
    &.fade-enter, &.fade-leave-active {
      .orderDetail {
        opacity: 0;
      }
    }
    &.fade-enter-active, &.fade-leave {
      .orderDetail {
        opacity: 1;
      }
    }
    .detailContent {
      background-color: #fff;
      z-index: 20;
      &.spread {
        transition: transform 0.4s;
        transform: translateX(700px);
      }
      &.off {
        transition: transform 0.4s;
        transform: translateX(960px);
      }
      &.slideDetail-enter, &.slideDetail-leave-active {
        .detailContent {
          transform: translateX(960px);
        }
      }
      &.slideDetail-enter-active, &.slideDetail-leave {
        .detailContent {
          transform: translateX(700px);
        }
      }
    }

  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        showDetail: true,
      };
    }
  };

</script>
