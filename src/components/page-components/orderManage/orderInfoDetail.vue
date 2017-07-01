<template>
  <div id="orderInfoDetail">
    <div class="remarkArea">
        <div v-if="detailData.detail.table_title">桌位：{{detailData.detail.table_title}}</div>
        <div v-if="detailData.detail.person_num">用餐人数：{{detailData.detail.person_num}}人</div>
        <div class="remark" v-if="detailData.detail.remark">备注：{{detailData.detail.remark}}</div>
        <div class="remark" v-else>备注：无</div>
    </div>
    <ul class="orderInfoDetail">
      <li v-for="item in detailData.detail.order_detail">{{item.detail_name}}:{{item.detail_content}}</li>
        <!--<div>下单时间：2017-05-08 18：00</div>
        <div>下单店铺：一号分店</div>
        <div>订单号：1156456456</div>
        <div>订单类型：堂点-服务员点餐</div>
        <div>支付状态：已支付</div>
        <div>订单状态：待处理</div>
        <div>开台时间：12:00</div>
        <div>清台时间：16：50</div>
        <div>结账时间：17:20</div>-->
    </ul>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";
  #orderInfoDetail {
    font-size: 14px;
    line-height: 31px;
    padding: 0 20px;
      .remarkArea{
        padding: 12px 10px 26px;
        border-bottom: 1px solid @borderColor;
        .remark{
          padding-top: 4px;
          line-height: 22px;
        }
      }
    .orderInfoDetail{
      padding: 12px 10px 60px;
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
      }
    }
  };

</script>
