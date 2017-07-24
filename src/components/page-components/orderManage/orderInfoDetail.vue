<template>
  <div id="orderInfoDetail">
    <div class="remarkArea">
      <div v-if="dining_mode == 1">
        <div>桌位：{{detailData.detail.table_title}}</div>
        <div>用餐人数：{{detailData.detail.person_num}}人</div>
      </div>
      <div class="remark" v-if="detailData.detail.remark">备注：{{detailData.detail.remark}}</div>
      <div class="remark" v-else>备注：无</div>
    </div>
    <ul class="orderInfoDetail">
      <li v-if="detailData.detail.order_detail.order_time">下单时间：{{detailData.detail.order_detail.order_time}}</li>
      <li v-if="detailData.detail.order_detail.order_shop">下单店铺：{{detailData.detail.order_detail.order_shop}}</li>
      <li v-if="detailData.detail.order_detail.ordersn">订单号：{{detailData.detail.order_detail.ordersn}}</li>
      <li v-if="detailData.detail.order_detail.takesn">取餐号：{{detailData.detail.order_detail.takesn}}</li>
      <li v-if="detailData.detail.order_detail.order_type">订单类型：{{detailData.detail.order_detail.order_type}}</li>
      <li v-if="detailData.detail.order_detail.pay_status">支付状态：{{detailData.detail.order_detail.pay_status | payStatus}}</li>
      <li v-if="detailData.detail.order_detail.order_status">订单状态：{{detailData.detail.order_detail.order_status | orderStatus}}</li>
      <li v-if="detailData.detail.order_detail.start_time">开台时间：{{detailData.detail.order_detail.start_time}}</li>
      <li v-if="detailData.detail.order_detail.end_time">结账时间：{{detailData.detail.order_detail.end_time}}</li>
      <li v-if="detailData.detail.order_detail.pay_time">清台时间：{{detailData.detail.order_detail.pay_time}}</li>
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
    },
    props: {
      detailData: Object,
      dining_mode: Number
    },
    filters: {
      orderStatus(num){
        switch (Number(num)) {
          case -1:
            return '已取消';
            break;
          case 0:
            return '待处理';
            break;
          case 1:
            return '已确认';
            break;
          case 3:
            return '已完成';
            break;

        }
      },
      payStatus(num){
        switch (Number(num)) {
          case 0:
            return '未支付';
            break;
          case 1:
            return '已支付';
            break;
        }
      }
    },
  };

</script>
