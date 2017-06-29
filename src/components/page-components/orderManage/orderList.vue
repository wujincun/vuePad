<template>
  <div id="orderList">
    <table>
      <thead>
      <tr>
        <td>下单时间</td>
        <td v-if="dining_mode == 1">桌位</td>
        <td v-else>订单号</td>
        <td>金额</td>
        <td>支付状态</td>
        <td>订单状态</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in orderList">
        <td>{{item.time | formatDate}}</td>
        <td v-if="dining_mode == 1">{{item.show_table}}</td>
        <td v-else>{{item.ordersn}}</td>
        <td>{{item.show_price}}</td>
        <td>{{item.pay_status | payStatus}}</td>
        <td>{{item.order_status | orderStatus}}</td>
        <!--<td class="operation" @click="opreaHandle(item.id)"></td>-->
        <td class="operation" v-tap="{methods:opreaHandle,id:item.id}"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";
  #orderList {
    flex: 1;
    .operation {
      background-size: 28px 28px;
      .bg-image('icon_caozuo')
    }
  }
</style>
<script type="text/ecmascript-6">
  import {formatDate} from '../../../common/js/date'
  export default{
    data () {
      return {};
    },
    props: {
      orderList: {
        type: Array
      },
      dining_mode:{
        type:Number
      }
    },
    methods: {
      opreaHandle(params){
        this.$emit('opreaHandle',params.id)
      }
    },
    filters: {
      formatDate(time){
        let date = new Date(time * 1000);
        return formatDate(date, 'hh:mm');
      },
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
