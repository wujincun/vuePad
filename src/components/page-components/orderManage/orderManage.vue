<template>
  <div id="orderManage">
    <div class="orderManageHeader header">
      <div class="spreadBtn leftIcon" @click="spreadHandler"></div>
      <div class="search"></div>
      <date-picker ></date-picker>
      <div class="orderPlace"></div>
      <div class="payStatus"></div>
      <div class="orderStatus"></div>
    </div>
    <div class="orderListContainer">
      <ul class="navList">
        <li class="navItem">堂食订单</li>
        <li class="navItem">外带订单</li>
        <li class="navItem">外卖订单</li>
        <li class="navItem">预订订单</li>
      </ul>
      <order-list></order-list>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderManage {
    .orderManageHeader {
      .spreadBtn {
        .bg-image('head_cedaohang')
      }
    }
    .orderListContainer {
      display: flex;
      .navList {
        width: 100px;
        .navItem {
          color: #fff;
          background-color: blue;
          &.active {

          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import orderList from "components/page-components/orderManage/orderList";
  import qs from 'qs';
  import axios from 'axios';
  import datePicker from 'vue-datepicker';
  export default{
    data () {
      return {
        orderStyle: 0,
        orderPlace: '',
        payStatus: '',
        orderStatus: '',
        //datePicker参数
        startTime: {
          time: ''
        },
        endtime: {
          time: ''
        },
        option: {
          type: 'day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY-MM-DD',
          placeholder: 'when?',
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '2px solid #fff',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#5F5F5F'
          },
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: 'Ok',
            cancel: 'Cancel'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        },
        timeoption: {
          type: 'min',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY-MM-DD HH:mm'
        },
        multiOption: {
          type: 'multi-day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: "YYYY-MM-DD HH:mm"
        },
        limit: [
          {
            type: 'weekday',
            available: [1, 2, 3, 4, 5]
          },
          {
            type: 'fromto',
            from: '2016-02-01',
            to: '2016-02-20'
          }
        ]
      };
    },
    components: {
      orderList,
      datePicker
    },
    created(){},
    methods: {
      spreadHandler(){
        //调取APP接口}
      }
    }
  };

</script>
