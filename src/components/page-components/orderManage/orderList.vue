<template>
  <div id="orderList">
    <table>
      <thead>
      <tr>
        <td>下单时间</td>
        <td v-if="1">桌位</td>
        <td v-else>订单号</td>
        <td>金额</td>
        <td>支付状态</td>
        <td>订单状态</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in data">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="operation"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {};
    },
    props:{
      data:{
        type:Array
      }
    }
  };

</script>
