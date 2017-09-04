<template>
  <div id="orderManage" v-if="!waiting"><!--v-if="!waiting"-->
    <div class="orderManageContent" v-if="!failLoadFlag">
      <div class="orderManageHeader header">
        <div class="leftOpreas">
          <div class="spreadBtn leftIcon" @click="leftSpreadHandler"></div>
          <div class="shortLine"></div>
          <div class="datePicker">
            <select-data :time="true" class="time" :listData="daysList" :listShow="daysListShow"
                         :chooseItem="chooseDate"
                         @getList="showHideDaysList" @chooseHandler="chooseDateHandler"
                         @selectClose="daysListShow = false"></select-data>
          </div>
          <div class="placePicker" v-if="hasShopRight">
            <select-data :place="true" class="place" :listData="placeList" :listShow="placeListShow"
                         :chooseItem="choosePlace"
                         @getList="showHidePlaceList" @chooseHandler="choosePlaceHandler"
                         @selectClose="placeListShow = false"></select-data>
          </div>
          <div class="search" v-show="toSearch">
            <input class="searchText ellipsis" v-model="searchText" placeholder="请输入搜索内容，手机号或订单号"/>
            <div class="shortLine"></div>
            <i class="clearIcon icon" @click="searchHandle"></i>
          </div>
        </div>
        <div class="rightBtns">
          <div class="searchBtn opreaBtn" v-show="!toSearch" @click="toSearch = !toSearch">
            <i class="searchIcon icon"></i>
            <span>搜索</span>
          </div>
          <div class="reloadBtn opreaBtn" @click="reloadHandle">
            <i class="reloadIcon icon"></i>
            <span>刷新</span>
          </div>
        </div>
      </div>
      <div class="orderListContainer">
        <ul class="navList">
          <li class="navItem" v-for="item in navList" :class="dining_mode == item.dining_mode?'active':''"
              @click="tap(item.dining_mode)">
            <div class="text">{{item.text}}</div>
            <div v-show="item.hintNum>0">({{item.hintNum}})</div>
          </li>
        </ul>
        <order-list :orderList="orderList" :dining_mode="dining_mode" :upGetList="upGetList" :callFlag="callFlag"
                    :callIdCollection="callIdCollection" :page="page"
                    :scrollDire="scrollDire" :chooseId="chooseId" :listDataBack="listDataBack"
                    :waitingIconShow="waitingIconShow"
                    @toDetailHandle="getAndShowDetail" @callHandle="callHandle" @downReload="reloadHandle"
                    @scrollHandle="listScrollHandle"></order-list>
      </div>
      <order-detail :dining_mode="dining_mode" :detailData="detailData" :hasCountTime="hasCountTime"  :detailShow="detailShow" :callFlag="callFlag"
                    :callIdCollection="callIdCollection"
                    @closeDetailPop="closePop" @manageBtn="orderManager"
                    @getPayStatus="getPayStatus" @callHandle="callHandle"></order-detail>
    </div>
    <fail-load v-else @reloadPage="reloadPage"></fail-load>
  </div>
  <waiting-icon v-else class="inCenter"></waiting-icon>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";
  #orderManage {
    position: relative;
    height: 100%;
    font-size: 18px;
    overflow: hidden;
    .orderManageContent {
      height: 100%;
      .orderManageHeader {
        background-color: #fff;
        position: relative;
        z-index: 20;
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
          .shortLine {
            height: 24px;
          }
          .datePicker {
            padding-left: 20px;
            margin-right: 24px;
            .calenderStage {
              font-weight: bold;
              color: #333333;
            }
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
                  width: 92px;
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
            position: absolute;
            left: 43%;
            width: 39%;
            margin: 16px 48px;
            height: 32px;
            line-height: 32px;
            background-color: #f0f0f0;
            border-radius: 100px;
            padding-left: 15px;
            display: flex;
            .searchText {
              width: 100%;
              line-height: 32px;
              background-color: #f0f0f0;
              vertical-align: middle;
              outline: none;
            }
            .shortLine {
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
              width: 22px;
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
        height: -webkit-calc(~"100% - 64px");
        display: flex;
        .navList {
          width: 120px;
          height: 2000px; //由于华为荣耀左导航的蓝色条会有闪烁，写死2000px明显好转
          background-color: #54548c;
          .navItem {
            color: #ccc;
            text-align: center;
            line-height: 24px;
            padding: 17px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            &:last-child {
              border-bottom: none;
            }
            &.active {
              color: @strongRedColor;
            }
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
  import waitingIcon from 'components/common-components/waitingIcon';
  import failLoad from 'components/common-components/failLoad';
  import {formatDate} from '../../../common/js/utils'
  import {getUrlParams} from '../../../common/js/utils'

  import qs from 'qs';
  import axios from 'axios';
  export default{
    data () {
      return {
        waiting: true,//主页面的等待flag
        waitingIconShow: false,//列表的等待flag
        failLoadFlag: false,//网络等失败提示的flag
        callFlag: 0,//是否开启叫号
        callIdCollection: {},//30s内点击叫号的订单
        navList: [
          {
            text: '堂食订单',
            dining_mode: 1,
            hintNum: 0
          },
          {
            text: '外带订单',
            dining_mode: 6,
            hintNum: 0
          },
          {
            text: '外卖订单',
            dining_mode: 2,
            hintNum: 0
          },
          {
            text: '预订订单',
            dining_mode: 3,
            hintNum: 0
          },
          {
            text: '快餐订单',
            dining_mode: 4,
            hintNum: 0
          }
        ],
        dining_mode: 1,
        daysList: [],
        placeList: [],
        orderList: [],
        detailData: {
          list: {
            goods: [],
            total_info: {
              discount_total: {
                discount_ways: []
              }
            },
            pay_info: {
              actual_pay: {
                pay_ways: []
              }
            }
          },
          detail: {
            order_detail: []
          },
          client_info: {}
        },
        daysListShow: false,
        placeListShow: false,
        detailShow: false,
        chooseDate: '',
        choosePlace: '1号店',
        choosePlaceId: 0,
        hasShopRight: false,
        searchText: '',
        num: 1,
        toSearch: false,
        //noticeId: '',
        chooseId: '',//在列表页点击操作出现订单详情的订单，此条订单选中，写在此处是reload时要把之前选中状态清掉
        upGetList: true,
        scrollDire: '',//列表滚动的方向up，down，重置、刷新时是reload
        listDataBack: false,//接口数据回来了的标识
        timer: null,//计时器
        page: 1,//列表数据分页
        hasCountTime:false//是否显示倒计时
      };
    },
    components: {
      orderList,
      orderDetail,
      selectData,
      waitingIcon,
      failLoad
    },
    created(){
      this.init()
    },
    mounted(){
      //暴露给app的方法
      window.reload = ()=> {
        this.chooseDate = formatDate(new Date(), 'yyyy-MM-dd');
        this.reloadHandle()
      };
      window.changeTap = (num)=> {
        this.dining_mode = num;
        this.chooseDate = formatDate(new Date(), 'yyyy-MM-dd');
        this.getOrderList();
        this.getMessHint()
      };
      window.notice = (notificationid)=> {
        this.page = 1;
        this.getOrderList({"noticeId": notificationid});
      };
    },
    methods: {
      //初始化数据
      init(){
        //choosePlace 从原生获取
        if (typeof (padApp) != 'undefined') {
          this.choosePlace = JSON.parse(padApp.getCurrentShop()).title;
        }
        this.choosePlaceId = this.fromApp.storeid;//main.js里定义的fromAPP
        this.getDaysList();
        this.getPlaceList();
        this.getMessHint();
        //判断是否从通知过来,在mounted里暴露方法给app，此处不用了
        /*let notificationid = getUrlParams('notificationid');
        let dining_mode = getUrlParams('dining_mode');
        if (notificationid) {
          this.page = 1;
          this.getOrderList({"noticeId": notificationid});
        } else {
          if (dining_mode) {
            this.dining_mode = dining_mode
          }
          this.getOrderList();
        }*/
      },
      //网络失败，刷新重试
      reloadPage(){
        this.page = 1;
        this.init()
      },
      //调取APP接口，显示左导航
      leftSpreadHandler(){
        if (typeof (padApp) != 'undefined') {
          padApp.showNav()
        }
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
      getPlaceList(){
        if (this.placeList.length === 0) {
          //调取数据
          axios.get('/api/index.php?c=entry&do=store.getUserStore&m=weisrc_dish' + this.paramsFromApp).then((res) => {
            this.waiting = false;
            let data = res.data;
            if (data.code == 200) {
              this.placeList = data.data.list;
              this.hasShopRight = (data.data.role == "manager" ? true : false)
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
      getOrderList(params){
        /*data可能是消息提醒来的noticeId，也可能是页数page*/
        let notice_id = "";
        if (params) {
          params.noticeId ? this.chooseId = notice_id = params.noticeId : this.page = params;
        }
        axios.get(`/api/index.php?c=entry&do=order.getList&m=weisrc_dish&ver=2&keyword=${this.searchText}&dining_mode=${this.dining_mode}&page=${this.page}&notice_id=${notice_id}&time=${this.chooseDate}&storeid=${this.choosePlaceId}&auth_token=${this.fromApp.auth_token}&bindid=${this.fromApp.bindid}&device_id=${this.fromApp.device_id}&i=${this.fromApp.i}`).then((res) => {
            this.waiting = false;
            let data = res.data;
            if (data.code == 200) {
              this.listDataBack = true;
              this.waitingIconShow = false;
              /*if (action != '') {
               if (this.dining_mode == data.data.dining_mode) {
               if (action == 'up') {
               if (data.data.list.length > 0) {
               this.orderList = this.orderList.concat(data.data.list);
               this.scrollDire = 'up';
               }
               if (data.data.list.length < 10) {
               this.upGetList = false;
               }
               } else if (action == 'down') {
               if (data.data.list.length > 0) {
               this.orderList = data.data.list.concat(this.orderList)//数据都插在后面
               this.scrollDire = 'down';
               }
               }
               }
               } else {
               this.orderList = data.data.list;
               this.dining_mode = data.data.dining_mode;
               this.choosePlace = data.data.store_title;
               this.callFlag = data.data.tv_broadcast_set;
               if (last_id != '') {
               this.noticeId = last_id;
               this.getAndShowDetail(last_id)
               }
               if (this.orderList.length < 10) {
               this.upGetList = false
               }
               }*/
              if (this.page > 1) {
                if (this.dining_mode == data.data.dining_mode) {
                  if (data.data.list.length > 0) {
                    this.orderList = this.orderList.concat(data.data.list);
                  }
                  if (data.data.list.length < 10) {
                    this.upGetList = false;
                  }
                }
              } else {
                this.orderList = data.data.list;
                this.callFlag = data.data.tv_broadcast_set;
                if(params) {
                  if (params.noticeId) {
                    this.dining_mode = data.data.dining_mode;
                    this.getAndShowDetail(params.noticeId);
                  }
                }
              }
              this.page = data.data.page;
              this.chooseDate = data.data.show_time;
              this.getMessHint();
            } else {
              console.log(data.message);
            }
          }
        ).catch(function (error) {
          this.failLoadFlag = true;
          console.log(error);
        });
      },
      getMessHint(){
        //判断是不是轮询获取未处理订单数，今天轮询，其他不轮询
        axios.get(`/api/index.php?c=entry&do=order.getAllOrderUndo&m=weisrc_dish&ver=2&time=${this.chooseDate}` + this.paramsFromApp).then((res) => {
          this.waiting = false;
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
        if (this.chooseDate == formatDate(new Date(), 'yyyy-MM-dd')) {
          this.timer = setTimeout(this.getMessHint, 5000)
        } else {
          clearTimeout(this.timer)
        }
      },
      showHideDaysList(){
        this.daysListShow = !this.daysListShow;
        this.daysListShow && (this.placeListShow = false);
        this.$nextTick(()=> {
          let time = document.getElementsByClassName('time')[0],
            calenderList = time.getElementsByClassName('calenderList')[0];
          calenderList.scrollTop = calenderList.scrollHeight;
        })
      },
      showHidePlaceList(){
        this.placeListShow = !this.placeListShow;
        this.placeListShow && (this.daysListShow = false);
      },
      chooseDateHandler(date){
        this.page = 1;
        this.chooseDate = date;
        this.daysListShow = false;
        this.waitingIconShow = true;
        this.getOrderList();
      },
      choosePlaceHandler(item){
        this.page = 1
        this.choosePlace = item.title;
        this.choosePlaceId = item.id;
        this.placeListShow = false;
        this.getOrderList()
      },
      getAndShowDetail(id){
        this.detailShow = true;
        this.chooseId = id;
        axios.get(`/api/index.php?c=entry&do=order.getDetail&m=weisrc_dish&ver=2&orderid=${id}` + this.paramsFromApp).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.detailData = data.data;
            this.detailData.detailId = id;
            this.hasCountTime = (this.detailData.detail.order_detail.order_status == 0 ||(this.detailData.detail.order_detail.order_status > 0 && this.detailData.detail.order_detail.refund_status == 1));
          } else {
            console.log(data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      /*详情页操作按钮点击后相关状态更改*/
      orderManager(data){
        data[1] && (this.detailData.detail.order_detail.order_status = data[1]);
        data[2] && (this.detailData.detail.order_detail.pay_status = data[2]);//需要更改吗？
        data[3] && (this.detailData.detail.order_detail.refund_status = data[3]);
        this.hasCountTime = (this.detailData.detail.order_detail.order_status == 0 || (this.detailData.detail.order_detail.order_status > 0 && this.detailData.detail.order_detail.refund_status == 1));
        this.orderList.forEach((value)=> {
          if (value.id == data[0]) {
            data[1] && (value.order_status = data[1]);
            data[2] && (value.pay_status = data[2]);
          }
        })
      },
      /*结账回来的状态更改*/
      getPayStatus(id){
        axios.get(`/api/index.php?c=entry&do=order.getPayInfo&m=weisrc_dish&ver=2&orderid=${id}` + this.paramsFromApp).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.detailData.detail.order_detail.order_status = data.data.order_status;
            this.detailData.detail.order_detail.pay_status = data.data.pay_status;
            this.detailData.list.total_info.add_total = data.data.total_info.add_total;
            this.detailData.list.total_info.discount_total = data.data.total_info.discount_total;
            this.detailData.list.pay_info = data.data.pay_info;
          } else {
            console.log(data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      /*订单类型选择*/
      tap(num){
        this.dining_mode = num;
        this.upGetList = true;
        this.scrollDire = 'reload';
        this.orderList = [];
        this.page = 1;
        this.waitingIconShow = true;
        this.getOrderList();
      },
      /*关闭弹窗*/
      closePop(closeReload){
        this.detailShow = false;
        this.scrollDire = 'reload';
        closeReload && this.getOrderList();
      },
      /*刷新按钮刷新*/
      reloadHandle(){
        this.searchText = "";
        this.page = 1;
        this.chooseId = '';
        this.toSearch = false;
        this.waitingIconShow = true;
        this.scrollDire = 'reload';
        this.upGetList = true;
        this.getOrderList();
      },
      /*搜索*/
      searchHandle(){
        this.waitingIconShow = true;
        this.scrollDire = 'reload';
        this.upGetList = true;
        this.getOrderList();
      },
      /*滑动*/
      listScrollHandle(data){
        this.getOrderList(data)
      },
      /*叫号功能*/
      callHandle(id){
        this.callIdCollection[id] = true;
        this.callIdCollection = Object.assign({}, this.callIdCollection);//
        setTimeout(()=> {
          this.callIdCollection[id] = false
        }, 30000);

        axios.get(`/api/index.php?i=I&c=entry&do=Order.broadcast&m=weisrc_dish&orderid=${id}` + this.paramsFromApp).then((res) => {
          let data = res.data;
          if (data.code != 200) {
            alert(data.message)
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  };

</script>
