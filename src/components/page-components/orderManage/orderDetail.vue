<template>
  <div id="orderDetail">
    <transition name="fade">
      <div class="mask" :class="detailShow?'show':'hide'"></div>
    </transition>
    <transition name="slideDetail">
      <div class="detailContent" :class="detailShow?'spread':'off'">
        <div class="clientInfo" v-if="dining_mode == 2 || dining_mode == 3">
          <div class="infoLIne1">
            <div class="name">联系人：{{}}</div>
            <div class="tel">联系电话：{{}}</div>
          </div>
          <div class="address" v-if="dining_mode == 2">收货地址：{{}}</div>
          <div class="infoLine2" v-if="dining_mode == 3">
            <div class="tableType">桌台类型：{{}}</div>
            <div class="time">到店时间：{{}}</div>
          </div>
        </div>
        <div class="orderInfo">
          <router-link  class="inventoryBtn" :to="{path:'/orderInventory',params:detailData.list}">清单</router-link>
          <router-link to="/orderInfoDetail" class="infoDetailBtn" >订单详情</router-link>
          <router-view></router-view>
        </div>
        <div class="close" @click="closeDetailPop"></div>
      </div>
    </transition>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderDetail {
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      &.show {
        transition: all 0.4s;
        opacity: 0.5;
      }
      &.hide {
        transition: all 0.4s;
        opacity: 0;
        pointer-events: none;
      }
      &.fade-enter, &.fade-leave-active {
        .mask {
          opacity: 0;
        }
      }
      &.fade-enter-active, &.fade-leave {
        .mask {
          opacity: 0.5;
        }
      }
    }
    .detailContent {
      position: absolute;
      width: 460px;
      height: 100%;
      top: 0;
      background-color: #fff;
      z-index: 20;
      &.spread {
        transition: transform 0.4s;
        transform: translateX(500px);
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
      .clientInfo{

      }
      .orderInfo{
        border: 1px solid #cccccc;
        border-radius: 6px;

      }
      .close{
        height: 40px;
        width: 40px;
        background-size: 40px 40px;
        .bg-image('icon_x')
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {};
    },
    props: {
      detailData: {
        type: Object
      },
      detailShow: {
        type: Boolean
      },
      dining_mode: {
        type: Number
      }
    },
    methods:{
      closeDetailPop(){
        this.$emit('closeDetailPop')
      }
    }

  };

</script>
