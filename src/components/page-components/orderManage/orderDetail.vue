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
        <div class="detailBtn"><router-link to="/orderInventory" class="inventoryBtn ">清单</router-link></div>
        <div class="detailBtn"><router-link to="/orderInfoDetail" class="infoDetailBtn ">订单详情</router-link></div>
        <div class="detailInfo"><router-view :detailData="detailData" :dining_mode="dining_mode"></router-view></div>
      </div>
      <div class="opreaBtns">
        <div class="opreaBtn getOrder" @click="manageBtnClick('confirm')" v-if="detailData.detail.order_detail.order_status && detailData.detail.order_detail.order_status == 0">接单</div>
        <div class="opreaBtn getOrder disabled" v-else>接单</div>
        <div v-if="detailData.detail.order_detail.order_status && (detailData.detail.order_detail.order_status == 0 || detailData.detail.order_detail.order_status == 1)">
          <div class="opreaBtn pay" v-if="detailData.detail.order_detail.pay_status && detailData.detail.order_detail.pay_status == 0" @click="payHandle">结账</div>
          <div class="opreaBtn pay" v-if="detailData.detail.order_detail.pay_status && detailData.detail.order_detail.pay_status == 1" @click="manageBtnClick('finish')">完成</div>
        </div>
        <div v-else>
          <div class="opreaBtn pay disabled" v-if="detailData.detail.order_detail.pay_status && detailData.detail.order_detail.pay_status == 0">结账</div>
          <div class="opreaBtn pay disabled" v-if="detailData.detail.order_detail.pay_status && detailData.detail.order_detail.pay_status == 1">完成</div>
        </div>
        <div class="opreaBtn print" @click="printToast">打印</div>
        <div v-if="callFlag">
          <div class="opreaBtn call" @click="callHandle" v-if="!callIdCollection[detailData.detailId]">叫号</div>
          <div class="opreaBtn disabled" v-else>叫号</div>
        </div>
        <div class="opreaBtn cancel" v-if="detailData.detail.order_detail.order_status && (detailData.detail.order_detail.order_status == 0 || detailData.detail.order_detail.order_status == 1)" @click="manageBtnClick('cancel')">取消</div>
        <div class="opreaBtn cancel disabled" v-else>取消</div>
      </div>
      <div class="close" @click="closeDetailPop"></div>
    </div>
    <v-confirm @confirm="confirmHandler" v-if="confirmShow" :type="type" :content="confirmContent"></v-confirm>
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
        transition: transform 0.4s;
        transform: translate3d(0, 0, 0);
      }
      &.off {
        transition: transform 0.4s;
        transform: translate3d(112%, 0, 0);
      }
      .clientInfo {
        font-size: 16px;
        line-height: 30px;
        padding: 14px 0;
      }
      .orderInfo {
        border-radius: 6px;
        border: 1px solid @borderColor;
        height: -webkit-calc(~"100% - 72px");
        font-size: 0;
        margin-top: 20px;

        .detailBtn {
          display: inline-block;
          width: 50%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #f5f5f5;
          a{
            font-size: 16px;
            display: block;
            &.active {
              background: linear-gradient(to right, #fd8165, #f1ab45);
              color: #fff;
            }
          }

        }
        .detailInfo {
          overflow-y: scroll;
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
          &.call{
            background-color: #b57cff;
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
</style>
<script type="text/ecmascript-6">
  import vConfirm from 'components/common-components/v-confirm';
  import toast from 'components/common-components/toast';
  import axios from 'axios';
  import qs from 'qs';
  export default{
    data () {
      return {
        confirmContent: "",
        toastContent: '',
        type: "",
        confirmShow: false,
        toastShow: false
      };
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
        })
      }
    },
    props: {
      detailData: Object,
      detailShow: Boolean,
      dining_mode: Number,
      callFlag: Number,
      callIdCollection:Object
    },
    components: {
      vConfirm,
      toast
    },
    methods: {
      closeDetailPop(){
        this.$emit('closeDetailPop')
      },
      manageBtnClick(type){
        this.type = type;
        this.confirmShow = true;
        switch (this.type) {
          case "confirm":
            this.confirmContent = "确定要接单吗?";
            break;
          case "finish":
            this.confirmContent = "确定要完成订单吗?";
            break;
          case "cancel":
            this.confirmContent = "确定要取消订单吗?";
            break;
        }
      },
      printToast(){
        this.toast("已请求打印",5000);
        this.postStatus('print')
      },
      payHandle(){
        if (typeof (padApp) != 'undefined') {
          padApp.payMoney(this.detailData.detailId);
        }
        window.fromAppPayBack = () => {
          this.$emit('getPayStatus', this.detailData.detailId)
        }
      },
      confirmHandler(data){
        if (data[0]) {
          this.postStatus(data[1])
        } else {
          this.confirmShow = false;
        }
      },
      toast(content, time){
        this.toastContent = content
        this.toastShow = true;
        setTimeout(()=> {
          this.toastShow = false;
        }, time)
      },
      callHandle(){
        this.$emit('callHandle', this.detailData.detailId)
      },
      postStatus(operation){
        axios.post('/api/index.php?c=entry&do=order.manage&m=weisrc_dish' + this.paramsFromApp, qs.stringify({
          id: this.detailData.detailId,
          order_status: this.detailData.detail.order_detail.order_status,
          operation: operation
        })).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.$emit('manageBtn', [this.detailData.detailId, data.data.order_status, data.data.pay_status]);
            this.confirmShow = false;
          } else {
            if (operation == 'print') {
              this.toast('云打印失败', 5000)
            } else {
              this.toast(data.message,5000);
            }
          }
        }).catch(function (error) {
          this.toast(error,5000);
        });
        if (operation == 'print') {
          let foodLists = [], paymentType = [];
          this.detailData.list.goods.forEach((value)=> {
            foodLists.push({
              "name": value.good_title,
              "price": value.price,
              "num": value.num,
              "has_reject": value.has_reject,
              "has_free": value.has_free,
              "has_pack": value.has_pack,
              "is_sale": value.is_sale
            })
          });
          this.detailData.list.pay_info.actual_pay.pay_ways.forEach((value)=> {
            paymentType.push(value.pay_way)
          })
          let obj = {
            "orderSn": this.detailData.detail.order_detail.ordersn,
            "orderType": this.dining_mode,
            "orderTime": this.detailData.detail.order_detail.order_time,
            "tabalInfo": this.detailData.detail.table_title,
            "foodLists": foodLists,
            "remark": this.detailData.detail.remark,
            "paymentType": paymentType,
            "discount_total": this.detailData.list.total_info.discount_total,
            "table_price": this.detailData.list.total_info.table_price,
            "chargeMore": this.detailData.list.total_info.add_total
          }
          if (obj.orderType == 2) {//外卖配送费
            obj.takeOutInfo = {
              "dispatchprice": this.detailData.list.total_info.dispatch_price,
              "address": this.detailData.client_info.address,
              "username": this.detailData.client_info.name,
              "time": this.detailData.client_info.time,
              "tel": this.detailData.client_info.tel
            }
          }

          /*一体机的原生打印*/
          if (typeof (padApp) != 'undefined') {
            let printS = padApp.printOrder(JSON.stringify(obj));
            if (!printS) {
              this.toast('收银一体机打印失败', 5000)
            }
          }
        }
      },
    }
  };

</script>
