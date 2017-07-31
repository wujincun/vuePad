<template>
  <div id="orderInventory">
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
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderInventory {
    font-size: 14px;
    padding: 0 20px;
    .dishList {
      padding: 13px 10px 8px;
      border-bottom: 1px solid @borderColor;
      .dishItem {
        display: flex;
        line-height: 31px;
        .name{
          width: 160px;
        }
        .num, .price {
          flex: 1;
          text-align: right;
        }
      }
    }
    .totalDes {
      padding: 8px 10px 10px;
      border-bottom: 1px dashed @borderColor;
      line-height: 31px;
      .couponDetail {
        line-height: 24px;
        font-size: 12px;
        padding-left: 20px;
      }
    }
    .payDes {
      padding: 8px 10px 42px;
      font-size: 16px;
      line-height: 32px;
      .moneyNum {
        color: #ff9900;
      }
      .actualPayDetail {
        line-height: 26px;
        font-size: 12px;
        padding-left: 20px;
      }
    }
    /*只显示预定费*/
    .onlyHasOrderPrice{
      padding: 0 20px;
      line-height: 57px;
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {};
    }
  };
</script>
