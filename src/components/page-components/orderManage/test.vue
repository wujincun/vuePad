<template>
  <div class="detailContent "><!---->
    <div class="orderInfo" style="height: 580px; margin-top: 20px;">
      <div class="detailBtn"><a href="www.baidu.com"  class="inventoryBtn">清单</a></div>
      <div class="detailBtn"><a  class="inventoryBtn  router-link-exact-active active">详情</a></div>
      <div class="detailInfo">
        <div id="orderInventory">
          <div class="hasContent">
            <ul class="dishList">
              <li class="dishItem"><span class="name ellipsis"><span>（打包）</span>
          这是一个商品
                <!----></span> <span class="num">X3</span> <span class="price">0</span></li>
              <li class="dishItem"><span class="name ellipsis"><!---->
          多规格的
                <!----></span> <span class="num">X1</span> <span class="price">100</span></li>
              <li class="dishItem"><span class="name ellipsis"><span>（打包）</span>
          绿黄瓜
                <!----></span> <span class="num">X12</span> <span class="price">1200</span></li>
              <li class="dishItem"><span class="name ellipsis"><!---->
          这是一个商品
                <!----></span> <span class="num">X21</span> <span class="price">0</span></li>
              <li class="dishItem"><span class="name ellipsis"><!---->
          岛主的菜
                <!----></span> <span class="num">X9</span> <span class="price">90</span></li>
              <li class="dishItem"><span class="name ellipsis"><!---->
          无规格特价
                <!----></span> <span class="num">X1</span> <span class="price">198</span></li>
              <li class="dishItem"><span class="name ellipsis"><span>（赠）</span>
          岛主的菜
                <!----></span> <span class="num">X8</span> <span class="price">0</span></li>
              <li class="dishItem"><span class="name ellipsis"><span>（赠）</span>
          无规格特价
                <!----></span> <span class="num">X1</span> <span class="price">0</span></li>
              <li class="dishItem"><span class="name ellipsis"><span>（赠）</span>
          这是一个商品
                <!----></span> <span class="num">X5</span> <span class="price">0</span></li>
              <li class="dishItem"><span class="name ellipsis"><span>（打包）</span>
          岛主的菜
                <!----></span> <span class="num">X2</span> <span class="price">20</span></li>
              <li class="dishItem"><span class="name ellipsis"><!---->
          绿黄瓜
                <!----></span> <span class="num">X2</span> <span class="price">200</span></li>
              <li class="dishItem"><span class="name ellipsis"><span>（赠）</span>
          多规格的
                <!----></span> <span class="num">X4</span> <span class="price">0</span></li>
              <li class="dishItem"><span class="name ellipsis"><span>（赠）</span>
          多规格的
                <!----></span> <span class="num">X4</span> <span class="price">0</span></li>
              <li class="dishItem"><span class="name ellipsis"><span>（赠）</span>
          岛主的菜
                <!----></span> <span class="num">X1</span> <span class="price">0</span></li> <!---->
              <li class="dishItem betweenSpace"><span class="name">桌台费</span> <span class="price">600.00</span></li>
              <!----></ul>
            <div class="totalDes">
              <div class="betweenSpace"><span>小计</span> <span>2408.00</span></div>
              <div class="betweenSpace"><span>加收</span> <span>0.00</span></div>
              <div class="coupon">
                <div class="betweenSpace"><span>优惠</span> <span>-1400.3</span></div>
                <ul class="couponDetail">
                  <li class="betweenSpace"><span>优惠券与会员卡</span> <span>-1400.30</span></li> <!----> <!----></ul>
              </div>
            </div>
            <div class="payDes">
              <div class="betweenSpace"><span>应付</span> <span class="moneyNum">2388.00</span></div>
              <div class="actualPay">
                <div class="betweenSpace"><span>已付</span> <span class="moneyNum">987.70</span></div> <!----></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="opreaBtns">
      <div class="opreaBtn getOrder disabled">接单</div>
      <div>
        <div class="opreaBtn pay disabled">结账</div> <!----></div>
      <div class="opreaBtn print">打印</div>
      <div class="opreaBtn cancel disabled">取消</div>
    </div>
    <div class="close"></div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  .detailContent {
    position: absolute;
    width: 460px;
    height: 100%;
    top: 0;
    right: 0;
    background-color: #fff;
    z-index: 80;
    padding: 0 40px 0;
    color: @fontColor;
    &.spread {
      transition: transform 0.4s;
      transform: translate3d(0, 0, 0);
    }
    &.off {
      transition: transform 0.4s;
      transform: translate3d(112%, 0, 0);
    }
    .clientInfo {
      font-size: 16px;
      line-height: 30px;
      padding: 14px 0;
    }
    .orderInfo {
      border-radius: 6px;
      border: 1px solid @borderColor;
      height: -webkit-calc(~"100% - 72px");
      font-size: 0;
      margin-top: 20px;

      .detailBtn {
          display: inline-block;
          width: 50%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #f5f5f5;
          a{
            font-size: 16px;
            display: block;
            &.active {
              background: linear-gradient(to right, #fd8165, #f1ab45);
              color: #fff;
            }
          }

        }
      .detailInfo {
        border-radius: 8px;
        overflow-y: scroll;
        height: -webkit-calc(~"100% - 40px");
      }
    }
    .opreaBtns {
      display: flex;
      padding: 20px 0;
      justify-content: space-between;
      .opreaBtn {
        height: 32px;
        width: 60px;
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        &.getOrder {
          background-color: #ffae33;
        }
        &.pay {
          background-color: #63c768;
        }
        &.print {
          background-color: #58aef5;
        }
        &.cancel {
          background-color: #858585;
        }
        &.disabled {
          background-color: #cccccc;
        }
      }
    }
    .close {
      position: absolute;
      left: -48px;
      top: 4px;
      height: 40px;
      width: 40px;
      background-size: 40px 40px;
      .bg-image('icon_x')
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
