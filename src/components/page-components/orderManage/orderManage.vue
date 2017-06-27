<template>
  <div id="orderManage">
    <div class="orderManageHeader header">
      <div class="spreadBtn leftIcon" @click="spreadHandler"></div>
      <select-data class="time" :listData="daysList" :listShow="listShow" :chooseItem="chooseDate" @getList="getDaysList" @chooseHandler="chooseDateHandler"></select-data>
      <select-data class="place" :listData="placeList" :listShow="listShow" :chooseItem="choosePlace" @getList="getPlaceList" @chooseHandler="choosePlaceHandler"></select-data>
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

  import qs from 'qs';
  import axios from 'axios';
  export default{
    data () {
      return {
        orderStyle: 0,
        daysList:[],
        placeList:[],
        listShow:false,
        chooseDate:'',
        choosePlace:''
      };
    },
    components: {
      orderList,
      orderDetail,
      selectData
    },
    created(){},
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
