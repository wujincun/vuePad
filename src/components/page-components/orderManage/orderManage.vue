<template>
  <div id="orderManage">
    <div class="orderManageHeader header">
      <div class="leftOpreas">
        <div class="spreadBtn leftIcon" @click="spreadHandler"></div>
        <div class="shortLine"></div>
        <div class="datePicker">
          <select-data :time="true" class="time" :listData="daysList" :listShow="daysListShow" :chooseItem="chooseDate"
                       @getList="showHideDaysList" @chooseHandler="chooseDateHandler"></select-data>
        </div>
        <div class="placePicker" v-if="hasShopRight">
          <select-data :place="true" class="place" :listData="placeList" :listShow="placeListShow" :chooseItem="choosePlace"
                       @getList="showHidePlaceList" @chooseHandler="choosePlaceHandler"></select-data>
        </div>
        <div class="search" v-show="toSearch">
          <input class="searchText ellipsis" v-model="searchText" placeholder="请输入搜索内容，手机号或订单号"/>
          <div class="shortLine"></div>
          <i class="clearIcon icon" @click="getOrderList()"></i>
        </div>
      </div>
      <div class="rightBtns">
        <div class="searchBtn opreaBtn" v-show="!toSearch" @click="toSearch = !toSearch">
          <i class="searchIcon icon"></i>
          <span>搜索</span>
        </div>
        <div class="reloadBtn opreaBtn" @click="getOrderList()">
          <i class="reloadIcon icon"></i>
          <span>刷新</span>
        </div>
      </div>
    </div>
    <div class="orderListContainer">
      <ul class="navList">
        <li class="navItem" v-for="item in navList" :class="dining_mode == item.dining_mode?'active':''" @click="tap(item.dining_mode)">
          <div class="text">{{item.text}}</div>
          <div v-show="item.hintNum>0">({{item.hintNum}})</div>
        </li>
      </ul>
      <order-list :orderList="orderList" :dining_mode="dining_mode" @opreaHandle="getAndShowDetail"></order-list>
    </div>
    <order-detail :dining_mode="dining_mode" :detailData="detailData" :detailShow="detailShow" @closeDetailPop="closePop"></order-detail>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";
  #orderManage {
    position: relative;
    height: 100%;
    font-size: 18px;
    .orderManageHeader {
      justify-content: space-between;
      //搜索 清空 刷新icon
      .icon {
        display: inline-block;
        background-size: 20px 20px;
      }
      /*竖断线*/
      .shortLine {
        border-left: 0.010417rem solid #e6e6e6;
        margin: auto;
      }
      .leftOpreas {
        display: flex;
        .spreadBtn {
          .bg-image('head_cedaohang')
        }
        .shortLine{
          height: 24px;
        }
        .datePicker {
          padding-left: 20px;
          margin-right: 24px;
        }
        .placePicker {
          margin: 16px 0;
          background-color: #7373bf;
          padding: 0 15px;
          border-radius: 100px;
          .place {
            line-height: 32px;
            .calenderStage {
              .text {
                width: 82px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #fff;
              }
              &:after {
                top: 11px
              }
            }
            .calenderBody {
              top: 45px;
              left: -55px;
            }
          }
        }
        .search {
          margin: 16px 0 16px 48px;
          height: 32px;
          line-height: 32px;
          background-color: #f0f0f0;
          border-radius: 100px;
          padding-left: 15px;
          display: flex;
          /*placehold颜色*/
          ::-moz-placeholder {
            color: #ccc;
          }
          ::-webkit-input-placeholder {
            color: #ccc;
          }
          :-ms-input-placeholder {
            color: #ccc;
          }
          .searchText {
            width: 304px;
            line-height: 32px;
            background-color: #f0f0f0;
            vertical-align: middle;
            outline: none;
          }
          .shortLine{
            height: 16px;
            margin-left: 30px;
          }
          .clearIcon {
            width: 50px;
            height: 32px;
            .bg-image('icon_fangdajing')
          }
        }
      }
      .rightBtns {
        display: flex;
        .opreaBtn {
          display: flex;
          padding: 0 10px;
          .icon {
            width: 20px;
            height: 64px;
            margin-right: 5px;
          }
          span {
            color: @fontColor;
          }
        }
        .searchBtn {
          margin-right: 20px;
          .searchIcon {
            .bg-image('icon_sousuo')
          }
        }
        .reloadBtn {
          margin-right: 10px;
          .reloadIcon {
            .bg-image('icon-shuaxin')
          }
        }
      }
    }
    .orderListContainer {
      display: flex;
      .navList {
        width: 120px;
        min-height: 476px;
        background-color: #54548c;
        .navItem {
          color: #fff;
          text-align: center;
          line-height: 24px;
          padding: 17px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          &:last-child{
            border-bottom: none;
          }
          &.active {
            color: @strongRedColor;
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
        navList:[
          {
            text:'堂食订单',
            dining_mode:1,
            hintNum:0
          },
          {
            text:'外带订单',
            dining_mode:6,
            hintNum:0
          },
          {
            text:'外卖订单',
            dining_mode:2,
            hintNum:0
          },
          {
            text:'预订订单',
            dining_mode:3,
            hintNum:0
          },
          {
            text:'快餐订单',
            dining_mode:4,
            hintNum:0
          }
        ],
        dining_mode: 1,
        daysList: [],
        placeList: [],
        orderList: [],
        detailData:{},
        daysListShow: false,
        placeListShow: false,
        detailShow:false,
        chooseDate: '',
        choosePlace: '1号店',
        choosePlaceId: '0',
        hasShopRight: false,
        searchText: '',
        num: 1,
        toSearch:false
      };
    },
    components: {
      orderList,
      orderDetail,
      selectData
    },
    created(){
      //choosePlace 从原生获取
      this.getDaysList();
      this.getOrderList();
      this.getMessHint();
      this.getPlaceList()
    },
    methods: {
      spreadHandler(){
        //调取APP接口}
      },
      getDaysList(){
        let today = new Date(), year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate();
        let lastMonthLastDate = new Date(year, month - 1, 0), lastMonthLastDay = lastMonthLastDate.getDate();
        this.chooseDate = formatDate(today, 'yyyy-MM-dd');
        for (let i = day; i <= lastMonthLastDay; i++) {
          this.daysList.push(formatDate(new Date(year, month - 2, i), 'yyyy-MM-dd'))
        }
        for (let i = 1; i <= day; i++) {
          this.daysList.push(formatDate(new Date(year, month - 1, i), 'yyyy-MM-dd'))
        }
      },
      showHideDaysList(){
        this.daysListShow = !this.daysListShow;
        this.daysListShow && (this.placeListShow = false);
      },
      showHidePlaceList(){
        this.placeListShow = !this.placeListShow;
        this.placeListShow && (this.daysListShow = false);
      },
      chooseDateHandler(date){
        this.chooseDate = date;
        this.daysListShow = false;
      },
      getPlaceList(){
        if (this.placeList.length === 0) {
          //调取数据
          axios.get('/api/index.php?c=entry&do=store.getUserStore&m=weisrc_dish' + this.paramsFromApp).then((res) => {
            let data = res.data;
            if (data.code == 200) {
              this.placeList = data.data.list;
              this.hasShopRight = data.data.role == "manager"?false:true
            } else {
              console.log(data.message);
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          this.placeListShow = !this.placeListShow
          this.placeListShow && (this.daysListShow = false);
        }
      },
      choosePlaceHandler(item){
        this.choosePlace = item.title;
        this.choosePlaceId = item.id;
        this.placeListShow = false;
      },
      getOrderList(){
        //last_id action:up/down
        //time=${this.chooseDate}
        axios.get(`/api/index.php?i=8&c=entry&do=order.getList&m=weisrc_dish&keyword=${this.searchText}&dining_mode=${this.dining_mode}&last_id=${name}&action=${name}` + this.paramsFromApp).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.orderList = data.data.list;
          } else {
            console.log(data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getAndShowDetail(id){
        this.detailShow = true;
        axios.get('/api/index.php?c=entry&do=order.getDetail&m=weisrc_dish&orderid='+ id + this.paramsFromApp).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.detailData = data.data;
          } else {
            console.log(data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      tap(num){
        this.dining_mode = num;
        this.getOrderList()
      },
      getMessHint(){
        axios.get('/api/index.php?c=entry&do=order.getAllOrderUndo&m=weisrc_dish' + this.paramsFromApp).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.navList.forEach(function (value) {
              value.hintNum = data.data.dining_mode[value.dining_mode]
            })
          } else {
            console.log(data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      closePop(){
        this.detailShow = false
      }
    }
  };

</script>
