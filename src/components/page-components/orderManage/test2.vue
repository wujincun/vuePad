<template>
  <div id="orderInfoDetail">
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
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";
  #orderInfoDetail {
    font-size: 14px;
    line-height: 31px;
    padding: 0 20px;
    .remarkArea {
      padding: 12px 10px 26px;
      border-bottom: 1px solid @borderColor;
      .remark {
        padding-top: 4px;
        line-height: 22px;
        word-wrap: break-word;
      }
    }
    .orderInfoDetail {
      padding: 12px 10px 60px;
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
