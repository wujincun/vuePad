<template>
  <div id="orderDetail">
    <!--<div class="mask"></div>-->
    <div class="detailContent">
      <div class="btns">
        <!--<a class="detailBtn" >清单</a>
        <a class="detailBtn" >订单详情</a>-->
        <a class="detailBtn inventoryBtn" @click="choose = 1">清单</a>
        <a class="detailBtn infoDetailBtn" @click="choose = 2">订单详情</a>
      </div>
    </div>

    <div id="orderInventory" :class="choose == 1?'show':'hide'">
      <div class="hasContent">
        <ul class="dishList">
          <li class="dishItem"><span class="name ellipsis"><!---->
          参汤烩牛肚
          <span>(浅/小)</span></span> <span class="num">X2</span> <span class="price">30.00</span></li> <!---->
          <li class="dishItem betweenSpace"><span class="name">桌台费</span> <span class="price">10.00</span></li> <!---->
        </ul>
        <div class="totalDes">
          <div class="betweenSpace"><span>小计</span> <span>40.00</span></div> <!----> <!----></div>
        <div class="payDes">
          <div class="betweenSpace"><span>应付</span> <span class="moneyNum">40.00</span></div>
          <div class="actualPay">
            <div class="betweenSpace"><span>已付</span> <span class="moneyNum">40.00</span></div> <!----></div>
        </div>
      </div>
    </div>
    <div id="orderInfoDetail" :class="choose == 2?'show':'hide'">
      <div class="remarkArea">
        <div>
          <div>桌位：包厢-898</div>
          <div>用餐人数：1人</div>
        </div>
        <div class="remark">备注：无</div>
      </div>
      <ul class="orderInfoDetail">
        <li>下单时间：2017-07-27 17:16:44</li>
        <li>下单店铺：拉手餐厅</li>
        <li>订单号：072700001506628765</li> <!---->
        <li>订单类型：堂点-公众号下单</li>
        <li>支付状态：已支付</li>
        <li>订单状态：已完成</li>
        <li>开台时间：2017-07-27 17:16:25</li> <!---->
        <li>清台时间：2017-07-27 17:17:03</li>
      </ul>
    </div>
</div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderDetail {
    background-color: rgba(0, 0, 0, 0.5);
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    .detailContent {
      position: relative;
      width: 460px;
      height: 200px;
      background-color: #fff;
      z-index: 80;
      .btns {
        display: flex;
      }
      .detailBtn {
        width: 50%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #f5f5f5;
        &.active {
          background: red;
        }
      }
    }
  }
  #orderInfoDetail,#orderInventory{
    display: none;
    &.show{
      display: block;
    }
    &.hide{
      display: none;
    }
  }
</style>
<script type="text/ecmascript-6">

  export default{
    data () {
      return {
        choose:''
      };
    }


  };

</script>

