<template>
  <div id="orderManage">
    <div class="orderManageHeader header">
      <div class="spreadBtn leftIcon" @click="spreadHandler"></div>
      <div class="datePicker">
        <select-data class="time" :listData="daysList" :listShow="listShow" :chooseItem="chooseDate" @getList="getDaysList" @chooseHandler="chooseDateHandler"></select-data>
      </div>
      <div class="placePicker">
        <select-data class="place" :listData="placeList" :listShow="listShow" :chooseItem="choosePlace" @getList="getPlaceList" @chooseHandler="choosePlaceHandler"></select-data>
      </div>

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
    <order-detail></order-detail>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderManage {
    position: relative;
    height: 100%;
    .orderManageHeader {
      .spreadBtn {
        .bg-image('head_cedaohang')
      }
      .datePicker{
        margin: 20px 24px 20px 0;
        padding-left: 20px;
        border-left: 1px solid @lineColor;
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
  import orderDetail from "components/page-components/orderManage/orderDetail";
  import selectData from 'components/common-components/select-data';
  import {formatDate} from '../../../common/js/date'

  import qs from 'qs';
  import axios from 'axios';
  export default{
    data () {
      return {
        orderStyle: 0,
        daysList: [],
        placeList: [],
        listShow: false,
        chooseDate: '',
        choosePlace: ''
      };
    },
    components: {
      orderList,
      orderDetail,
      selectData
    },
    created(){
      let today = new Date(), year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate();
      let lastMonthLastDate = new Date(year, month-1 , 0), lastMonthLastDay = lastMonthLastDate.getDate();
      this.chooseDate = formatDate(today, 'yyyy-MM-dd');
      for (let i = day; i <= lastMonthLastDay; i++) {
        this.daysList.push(formatDate(new Date(year, month - 2 , i), 'yyyy-MM-dd'))
      }
      for (let i = 1; i <= day; i++) {
        this.daysList.push(formatDate(new Date(year, month - 1 , i), 'yyyy-MM-dd'))
      }
    },
    methods: {
      spreadHandler(){
        //调取APP接口}
      },
      getDaysList(){

      },
      chooseDateHandler(){

      },
      getPlaceList(){

      },
      choosePlaceHandler(){

      }
    }
  };

</script>
