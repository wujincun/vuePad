<template>
  <div id="orderDetail">
    <div class="mask" :class="detailShow?'show':'hide'"></div>
    <div class="detailContent" :class="detailShow?'spread':'off'">
      <div class="clientInfo" v-if="dining_mode == 2 || dining_mode == 3">
        <div class="infoLIne1 betweenSpace">
          <div class="name">联系人：{{detailData.client_info.name}}</div>
          <div class="tel">联系电话：{{detailData.client_info.tel}}</div>
        </div>
        <div class="address" v-if="dining_mode == 2">收货地址：{{detailData.client_info.address}}</div>
        <div class="infoLine2 betweenSpace" v-if="dining_mode == 3">
          <div class="tableType">桌台类型：{{detailData.client_info.table_type}}</div>
          <div class="time">到店时间：{{detailData.client_info.time}}</div>
        </div>
      </div>
      <div class="orderInfo" ref="orderInfo">
        <div class="detailBtn"><a class="inventoryBtn" :class="{'active':detailTap == 1}" @click="detailTap = 1">清单</a></div>
        <div class="detailBtn"><a class="infoDetailBtn" :class="{'active':detailTap == 2}" @click="detailTap = 2">订单详情</a></div>
        <div class="detailInfo">
          <!--由于用router-link在米3上回出现抖动效果，此处匆忙改成tap，需优化-->
          <div id="orderInventory" v-show="detailTap == 1">
            <div class="noContent"
                 v-if="dining_mode == 3 && detailData.list.goods.length == 0 && !detailData.list.total_info.order_price">
              <div class="text">顾客仅预定了座位哟</div>
            </div>
            <div class="onlyHasOrderPrice betweenSpace"
                 v-else-if="dining_mode == 3 && detailData.list.goods.length == 0 && detailData.list.total_info.order_price">
              <span class="name">预付</span>
              <span class="price">{{detailData.list.total_info.order_price}}</span>
            </div>
            <div class="hasContent" v-else>
              <div class="dishList">
                <!--引入饿了么等第三方订单-->
                <div class="partFoods" v-for="values in detailData.list.goods">
                  <div v-if="values.title" class="partTitle">{{values.title}}</div>
                  <div class="dishItem" v-for="item in values.goods">
                    <span class="name ellipsis">
                      <span v-if="item.has_reject">(退)</span>
                      <span v-else-if="item.has_free">(赠)</span>
                      <span v-else-if="item.has_pack">(打包)</span>
                      {{item.good_title}}
                      <span v-if="item.option_name">({{item.option_name}})</span>
                    </span>
                    <span class="num">X{{item.num}}</span>
                    <span class="price"><span v-if="item.has_reject">-</span>{{(item.price*item.num).toFixed(2)}}</span>
                  </div>
                </div>
                <div class="dishItem betweenSpace"
                     v-if="detailData.list.goods.length == 0 && dining_mode == 3 && detailData.list.total_info.order_price > 0">
                  <span class="name">预付</span>
                  <span class="price">{{detailData.list.total_info.order_price}}</span>
                </div>
                <div class="dishItem betweenSpace"
                     v-if="(dining_mode == 1 || dining_mode == 6) && detailData.list.total_info.table_price > 0">
                  <span class="name">台位费</span>
                  <span class="price">{{detailData.list.total_info.table_price}}</span>
                </div>
                <div class="dishItem betweenSpace" v-if="dining_mode == 2 && detailData.list.total_info.box_price > 0">
                  <span class="name">餐盒费</span>
                  <span class="price">{{detailData.list.total_info.box_price}}</span>
                </div>
                <div class="dishItem betweenSpace"
                     v-if="dining_mode == 2 && detailData.list.total_info.dispatch_price > 0">
                  <span class="name">配送费</span>
                  <span class="price">{{detailData.list.total_info.dispatch_price}}</span>
                </div>
              </div>
              <div class="totalDes">
                <div class="betweenSpace">
                  <span>小计</span>
                  <span>{{detailData.list.total_info.sub_total}}</span>
                </div>
                <div class="betweenSpace" v-if="detailData.list.total_info.add_total > 0"><!--or not-->
                  <span>加收</span>
                  <span>+{{detailData.list.total_info.add_total}}</span>
                </div>
                <div class="coupon" v-if="detailData.list.total_info.discount_total.value > 0">
                  <div class="betweenSpace">
                    <span>优惠</span>
                    <span>-{{detailData.list.total_info.discount_total.value}}</span>
                  </div>
                  <ul class="couponDetail">
                    <li class="betweenSpace" v-for="item in detailData.list.total_info.discount_total.discount_ways">
                      <span>{{item.discount_way}}</span>
                      <span>{{item.discount_num}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="payDes">
                <div class="betweenSpace">
                  <span>应付</span>
                  <span class="moneyColor">{{detailData.list.pay_info.should_pay}}</span>
                </div>
                <div class="actualPay">
                  <div class="betweenSpace">
                    <span>已付</span>
                    <span class="moneyColor">{{detailData.list.pay_info.actual_pay.value}}</span>
                  </div>
                  <ul class="actualPayDetail" v-if="order_detail.pay_status">
                    <li class="betweenSpace" v-for="item in detailData.list.pay_info.actual_pay.pay_ways">
                      <span>{{item.pay_way}}</span>
                      <span class="moneyColor">{{item.pay_num}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="orderInfoDetail" v-show="detailTap == 2">
            <div class="remarkArea">
              <div v-if="dining_mode == 1">
                <div>桌位：{{detailData.detail.table_title}}</div>
                <div>用餐人数：{{detailData.detail.person_num}}人</div>
              </div>
              <div class="remark" v-if="detailData.detail.remark">备注：{{detailData.detail.remark}}</div>
              <div class="remark" v-else>备注：无</div>
            </div>
            <ul class="orderInfoDetail">
              <li v-if="order_detail.order_time">下单时间：{{order_detail.order_time}}</li>
              <li v-if="order_detail.yuyue_time" :class="{'red':count_time.canHandleFlag}">
                预约时间：{{order_detail.yuyue_time}}
              </li><!--取消（orderstatus = -1）时颜色恢复正常-->
              <li v-if="order_detail.order_shop">下单店铺：{{order_detail.order_shop}}</li>
              <li v-if="order_detail.ordersn">订单号：{{order_detail.ordersn}}</li>
              <li v-if="order_detail.other_ordersn">第三方订单号：{{order_detail.other_ordersn}}</li>
              <li v-if="detailData.tv_broadcast_set">取餐号：{{order_detail.meal_number}}</li>
              <li v-if="order_detail.order_type">订单类型：{{order_detail.order_type}}</li>
              <li v-if="order_detail.pay_status">支付状态：{{order_detail.pay_status | payStatus}}</li>
              <li v-if="order_detail.order_status && order_detail.refund_status != 1">订单状态：{{order_detail.order_status| orderStatus}}</li>
              <li v-if="(order_detail.order_status != -1 || order_detail.order_status != 3) && order_detail.refund_status == 1">订单状态：待取消</li>
              <li v-if="order_detail.start_time">开台时间：{{order_detail.start_time}}</li>
              <li v-if="order_detail.pay_time">结账时间：{{order_detail.pay_time}}</li>
              <li v-if="order_detail.end_time">清台时间：{{order_detail.end_time}}</li>
              <li v-if="count_time.canHandleFlag"><span class="red">{{count_time.time}}</span>秒内未处理，将<span class="red">自动取消</span>
              </li>
            </ul>
          </div>
        </div>
        <!--<div class="detailBtn"><router-link to="/orderInventory" class="inventoryBtn ">清单</router-link></div>
        <div class="detailBtn"><router-link to="/orderInfoDetail" class="infoDetailBtn ">订单详情</router-link></div>-->
        <!--<div class="detailInfo"><router-view :detailData="detailData" :dining_mode="dining_mode"></router-view></div>-->
      </div>
      <!--这里的按钮因为flex均匀分布的布局导致没有多加层级区分-->
      <div class="opreaBtns">
        <div class="opreaBtn getOrder" @click="manageBtnClick('confirm')" v-if="order_detail.order_status == 0">接单</div>
        <div class="opreaBtn getOrder disabled" v-else>接单</div>
        <div v-if="(order_detail.order_status == 0 || order_detail.order_status == 1) && order_detail.refund_status != 1">
          <div class="opreaBtn pay" v-if="order_detail.pay_status == 0" @click="payHandle">结账</div>
          <div class="opreaBtn pay" v-if="order_detail.pay_status == 1" @click="manageBtnClick('finish')">完成</div>
        </div>
        <div v-else>
          <div class="opreaBtn pay disabled" v-if="order_detail.pay_status == 0">结账</div>
          <div class="opreaBtn pay disabled" v-if="order_detail.pay_status == 1">完成</div>
        </div>
        <div class="opreaBtn print" @click="printToast">打印</div>
        <div v-if="callFlag">
          <div class="opreaBtn call" @click="callHandle" v-if="!callIdCollection[detailData.detailId]">叫号</div>
          <div class="opreaBtn disabled" v-else>叫号</div>
        </div>
        <div class="opreaBtn agree" v-if="order_detail.order_status != -1 &&  order_detail.order_status != 3 && order_detail.refund_status == 1" @click="manageBtnClick('refund_agree')">同意</div>
        <div class="opreaBtn refuse" v-if="order_detail.order_status != -1 &&  order_detail.order_status != 3 && order_detail.refund_status == 1" @click="manageBtnClick('refund_refuse')">拒绝</div>
        <div class="opreaBtn cancel disabled" v-if="(order_detail.order_status == -1 || order_detail.order_status == 3 || order_detail.platform > 3) && order_detail.refund_status != 1">取消</div>
        <div class="opreaBtn cancel" v-if="(order_detail.order_status == 0 || order_detail.order_status == 1) && order_detail.platform <= 3" @click="manageBtnClick('close')">取消</div>
      </div>
      <div class="close" @click="closeDetailPop"></div>
    </div>
    <v-pop @confirm="confirmHandler" :popType="popType" :titleText="titleText" v-if="popShow" :btnType="btnType" :contentText="confirmContent" ></v-pop>
    <toast :content="toastContent" v-if="toastShow"></toast>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderDetail {
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      z-index: 50;
      &.show {
        transition: all 0.4s;
        opacity: 0.5;
      }
      &.hide {
        transition: all 0.4s;
        opacity: 0;
        pointer-events: none;
      }
    }
    .detailContent {
      position: absolute;
      width: 460px;
      height: 100%;
      top: 0;
      right: 0;
      background-color: #fff;
      z-index: 80;
      padding: 0 40px 0;
      color: @fontColor;
      &.spread {
        transition: transform 0.2s;
        transform: translate3d(0, 0, 0);
      }
      &.off {
        transition: transform 0.2s;
        transform: translate3d(112%, 0, 0);
      }
      .clientInfo {
        font-size: 16px;
        line-height: 30px;
        padding: 14px 0;
      }
      .orderInfo {
        border-radius: 4px;
        border: 1px solid @borderColor;
        height: -webkit-calc(~"100% - 72px");
        font-size: 0;
        margin-top: 20px;
        //overflow: hidden;
        .detailBtn {
          display: inline-block;
          width: 50%;
          height: 41px;
          line-height: 41px;
          text-align: center;
          background-color: #f5f5f5;
          a {
            font-size: 16px;
            display: block;
            &.active {
              background: linear-gradient(to right, #fd8165, #f1ab45);
              color: #fff;
            }
          }
          .inventoryBtn {
            margin: -1px 0 0 -1px;
            &.active {
              border-radius: 4px 0 0 0;
            }
          }
          .infoDetailBtn {
            margin: -1px -1px 0 0;
            &.active {
              border-radius: 0 4px 0 0;
            }
          }
        }
        .detailInfo {
          overflow-y: auto;
          height: -webkit-calc(~"100% - 40px");
        }
      }
      .opreaBtns {
        display: flex;
        padding: 20px 0;
        justify-content: space-between;
        .opreaBtn {
          height: 32px;
          width: 60px;
          text-align: center;
          line-height: 32px;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          &.getOrder {
            background-color: #ffae33;
          }
          &.pay {
            background-color: #63c768;
          }
          &.print {
            background-color: #58aef5;
          }
          &.cancel {
            background-color: #858585;
          }
          &.call {
            background-color: #b57cff;
          }
          &.agree {
            background-color: #b57cff;
          }
          &.refuse {
            background-color: #6666AA;
          }
          &.disabled {
            background-color: #cccccc;
          }
        }
      }
      .close {
        position: absolute;
        left: -48px;
        top: 4px;
        height: 40px;
        width: 40px;
        background-size: 40px 40px;
        .bg-image('icon_x')
      }
    }
  }

  #orderInfoDetail {
    font-size: 14px;
    line-height: 31px;
    padding: 0 20px;
    background-color: #fff;
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

  #orderInventory {
    font-size: 14px;
    padding: 0 20px;
    background-color: #fff;
    .dishList {
      padding-bottom: 12px;
      border-bottom: 1px solid @borderColor;
      .partFoods {
        margin-bottom: 12px;
        .partTitle {
          height: 20px;
          line-height: 20px;
          background-color: #f0f0f0;
          border-radius: 0 10px 10px 0;
          margin: 0 0 12px -20px;
          display: inline-block;
          padding: 0 20px;
          border-left: 3px solid @strongRedColor;
        }
      }
      .dishItem {
        display: flex;
        line-height: 31px;
        padding: 0 10px;
        &:first-child{
          margin-top: 18px;
        }
        .name {
          width: 160px;
        }
        .num, .price {
          flex: 1;
          text-align: right;
        }
      }
    }
    .totalDes {
      padding: 8px 10px 10px;
      border-bottom: 1px dashed @borderColor;
      line-height: 31px;
      .couponDetail {
        line-height: 24px;
        font-size: 12px;
        padding-left: 20px;
      }
    }
    .payDes {
      padding: 8px 10px 42px;
      font-size: 16px;
      line-height: 32px;
      .actualPayDetail {
        line-height: 26px;
        font-size: 12px;
        padding-left: 20px;
      }
    }
    /*只显示预定费*/
    .onlyHasOrderPrice {
      padding: 0 20px;
      line-height: 57px;
    }
  }
</style>
<script type="text/ecmascript-6">
  import vPop from 'components/common-components/v-pop';
  import toast from 'components/common-components/toast';
  import axios from 'axios';
  import qs from 'qs';
  export default{
    data () {
      return {
        popType:"confirm",
        titleText:"",
        confirmContent: "",
        toastContent: '',
        btnType: "",
        popShow: false,
        toastShow: false,
        detailTap: 1,
        closeReload: false,//关闭弹窗是否重新拉取列表数据
        count_time: {//倒计时相关
          id:'',
          timer: null,//计时器
          duration:0,//剩余时间值
          canHandleFlag: false//订单接单或取消在一定时间内的操作提示
        }

      };
    },
    props: {
      detailData: Object,
      detailShow: Boolean,
      hasCountTime:Boolean,
      dining_mode: Number,
      callFlag: Number,
      callIdCollection: Object
    },
    watch: {
      detailData(){
        this.$nextTick(() => {
          let clientInfoEl = document.getElementsByClassName('clientInfo')[0];
          let detailContentH = document.getElementsByClassName('detailContent')[0].offsetHeight;
          let opreaBtnsH = document.getElementsByClassName('opreaBtns')[0].offsetHeight;
          if (clientInfoEl) {
            let clientInfoH = clientInfoEl.offsetHeight;
            this.$refs.orderInfo.style.height = detailContentH - clientInfoH - opreaBtnsH + 'px';
            this.$refs.orderInfo.style.marginTop = 0;
          } else {
            this.$refs.orderInfo.style.height = detailContentH - opreaBtnsH - 20 + 'px';
            this.$refs.orderInfo.style.marginTop = '20px';
          }
        });
        this.closeReload = false;
      },
      detailShow(){
        this.detailTap = 1;
        if(this.hasCountTime){
          /*下单后5分钟内的接单处理*/
          if(this.order_detail.order_status == 0){
            this.count_time.duration = (new Date(this.order_detail.order_time).getTime() + 5*60*1000 - Date.now())/1000;
          }
          /*用户端取消后的15分钟的回复时间*/
          if(this.order_detail.order_status > 0 && this.order_detail.refund_status == 1){
            this.count_time.duration = (this.order_detail.refund_time*1000 + 15*60*1000 - Date.now())/1000;//php返回的都是秒级的时间戳
          }
        }else{
          this.count_time.duration = 0;
        }
        this.countTimeController()
      }
    },
    components: {
      vPop,
      toast
    },
    methods: {
      closeDetailPop(){
        this.$emit('closeDetailPop', this.closeReload)
      },
      manageBtnClick(btnType){
        this.btnType = btnType;
        this.popShow = true;
        switch (this.btnType) {
          case "confirm":
            this.popType = 'confirm';
            this.confirmContent = "确定要接单吗?";
            break;
          case "finish":
            this.popType = 'confirm';
            this.confirmContent = "确定要完成订单吗?";
            break;
          case "close":
            this.popType = 'confirm';
            this.confirmContent = "确定要取消订单吗?";
            break;
          case "refund_agree":
            this.popType = 'confirm';
            this.confirmContent = "确定同意取消订单？";
            break;
          case "refund_refuse":
            this.popType = 'prompt';
            this.titleText = "拒绝理由";
            break;
        }
      },
      confirmHandler(params){
        let bool = Array.isArray(params) ? params[0] : params;
        if(bool){
          if(this.popType == 'prompt'){
            this.postStatus(params[1]);
          }else{
            this.postStatus();
          }
          this.closeReload = true
        } else {
          this.popShow = false;
        }
      },
      postStatus(inputText){
        /*云打印*/
        axios.post('/api/index.php?c=entry&do=order.manage&m=weisrc_dish&ver=2' + this.paramsFromApp, qs.stringify({
          id: this.detailData.detailId,
          order_status: this.order_detail.order_status,
          operation: this.btnType,
          //拒绝理由
          refund_refuse_reason: inputText

        })).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.$emit('manageBtn', [this.detailData.detailId, data.data.order_status, data.data.pay_status, data.data.refund_status]);//refund_status
            this.popShow = false;
          } else {
            if (this.btnType == 'print') {
              this.toast('云打印失败', 2000)
            } else {
              this.toast(data.message, 2000);
            }
          }
        }).catch(function (error) {
          this.toast(error, 2000);
        });
        /*一体机的原生打印*/
        if (this.btnType == 'print') {
          let paymentType = [];
          this.detailData.list.pay_info.actual_pay.pay_ways.forEach((value)=> {
            paymentType.push(value.pay_way)
          });
          let obj = {
            "orderSn": this.order_detail.ordersn,
            "orderType": this.dining_mode,
            "other_ordersn":this.order_detail.other_ordersn,
            "yuyue_time":this.order_detail.yuyue_time,
            "orderTime": this.order_detail.order_time,
            "tabalInfo": this.detailData.detail.table_title,
            "mealNumber": this.order_detail.meal_number,
            "foodLists": this.detailData.list.goods,
            "remark": this.detailData.detail.remark,
            "paymentType": paymentType,
            "discount_total": this.detailData.list.total_info.discount_total,
            "table_price": this.detailData.list.total_info.table_price,
            "chargeMore": this.detailData.list.total_info.add_total
          };
          if (obj.orderType == 2) {//外卖配送费
            obj.takeOutInfo = {
              "dispatchprice": this.detailData.list.total_info.dispatch_price,
              "address": this.detailData.client_info.address,
              "username": this.detailData.client_info.name,
              "time": this.detailData.client_info.time,
              "tel": this.detailData.client_info.tel
            }
          }
          if (typeof (padApp) != 'undefined') {
            let printS = padApp.printOrder(JSON.stringify(obj));
            if (!printS) {
              this.toast('收银一体机打印失败', 2000)
            }
          }
        }
      },
      payHandle(){
        if (typeof (padApp) != 'undefined') {
          padApp.payMoney(this.detailData.detailId);
        }
        window.fromAppPayBack = () => {
          this.$emit('getPayStatus', this.detailData.detailId)
        }
      },
      //叫号
      callHandle(){
        this.$emit('callHandle', this.detailData.detailId)
      },
      printToast(){
        this.toast("已请求打印", 2000);
        this.btnType = "print";
        this.postStatus()
      },
      toast(content, time){
        this.toastContent = content
        this.toastShow = true;
        setTimeout(()=> {
          this.toastShow = false;
        }, time)
      },
      //倒计时控制
      countTimeController(){
        let _this = this;
        if(this.count_time.duration > 0){
          this.count_time.canHandleFlag = true;
          this.countTime({
            duration: this.count_time.duration,//秒级
            step: 1,//秒数
            handler4ToTime: function () {
              _this.count_time.canHandleFlag = false;
              this.$emit('manageBtn', [_this.detailData.detailId, -1]);
            }
          })
        }else{
          this.count_time.canHandleFlag = false;
        }
      },
      //倒计时，需要优化，提出，这里太不共性了
      countTime(cfg) {
        clearInterval(this.count_time.timer);
        this.timer = null;
        this.count_time.timer = setInterval(cutTime.bind(this), cfg.step * 1000);
        function cutTime() {
          if (cfg.duration <= cfg.step) {
            clearInterval(this.count_time.timer);
            this.count_time.timer = null;
            cfg.handler4ToTime && cfg.handler4ToTime();
          } else {
            cfg.duration = cfg.duration - cfg.step;
            let time = Math.floor(cfg.duration / 60) + ':' + this.padLeftZero(parseInt(cfg.duration % 60));
            this.$set(this.count_time, 'time', time);
          }
        }
      },
      padLeftZero(str) {
        typeof(str) === 'number' && (str = str + '');
        return ('00' + str).substr(str.length);
      }
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
    computed: {
      order_detail: function () {
        return this.detailData.detail.order_detail
      }
    }
  };

</script>
