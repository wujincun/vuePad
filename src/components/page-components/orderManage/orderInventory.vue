<template>
  <div id="orderInventory" >
    <div class="noContent" v-if="dining_mode == 3 && detailData.list.goods.length == 0 && !detailData.list.total_info.order_price">
      <div class="text">
        顾客仅预定了座位哟
      </div>
    </div>
    <div class="onlyHasOrderPrice betweenSpace" v-else-if="dining_mode == 3 && detailData.list.goods.length == 0 && detailData.list.total_info.order_price">
      <span class="name">预付</span>
      <span class="price">{{detailData.list.total_info.order_price}}</span>
    </div>
    <div class="hasContent" v-else>
      <ul class="dishList" >
        <li class="dishItem" v-for="item in detailData.list.goods">
          <span class="name ellipsis">{{item.good_title}}<span v-if="item.option_name">({{item.option_name}})</span></span>
          <span class="num">X{{item.eatin_num*1 + item.unpack_num*1}}</span>
          <span class="price">{{item.price}}</span>
        </li>
        <li class="dishItem betweenSpace" v-if="dining_mode == 3 && detailData.list.total_info.order_price">
          <span class="name">预付</span>
          <span class="price">{{detailData.list.total_info.order_price}}</span>
        </li>
        <li class="dishItem betweenSpace" v-if="(dining_mode == 1 || dining_mode == 6) && detailData.list.total_info.table_price">
          <span class="name">桌台费</span>
          <span class="price">{{detailData.list.total_info.table_price}}</span>
        </li>
        <li class="dishItem betweenSpace" v-if="dining_mode == 2 && detailData.list.total_info.dispatch_price">
          <span class="name">配送费</span>
          <span class="price">{{detailData.list.total_info.dispatch_price}}</span>
        </li>
      </ul>
      <div class="totalDes">
        <div class="betweenSpace">
          <span>小计</span>
          <span>{{detailData.list.total_info.sub_total}}</span>
        </div>
        <div class="betweenSpace" v-if="detailData.list.total_info.add_total"><!--or not-->
          <span>加收</span>
          <span>{{detailData.list.total_info.add_total}}</span>
        </div>
        <div class="coupon" v-if="detailData.list.total_info.discount_total.value">
          <div class="betweenSpace">
            <span>优惠</span>
            <span>{{detailData.list.total_info.discount_total.value}}</span>
          </div>
          <ul class="couponDetail">
            <li class="betweenSpace" v-for="item in detailData.list.total_info.discount_total.discount_ways">
              <span>{{item.discount_way}}</span>
              <span>{{item.discount_num}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="payDes">
        <div class="betweenSpace">
          <span>应付</span>
          <span class="moneyNum">{{detailData.list.pay_info.should_pay}}</span>
        </div>
        <div class="actualPay">
          <div class="betweenSpace">
            <span>已付</span>
            <span class="moneyNum">{{detailData.list.pay_info.actual_pay.value}}</span>
          </div>
          <ul class="actualPayDetail" v-if="detailData.pay_status">
            <li class="betweenSpace" v-for="item in detailData.list.pay_info.actual_pay.pay_ways">
              <span>{{item.pay_way}}</span>
              <span class="moneyNum">{{item.pay_num}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderInventory {
    font-size: 14px;
    padding: 0 20px;
    height: 100%;
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
      padding: 8px 20px 42px;
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
    },
    props: {
      detailData: {
        type: Object
      },
      dining_mode:{
        type:Number
      }
    }
  };

</script>
