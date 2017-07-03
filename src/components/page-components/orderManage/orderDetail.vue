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
      <div class="orderInfo" :class="(dining_mode == 2 || dining_mode == 3)?'short':''">
        <div class="detailBtns">
          <router-link to="/orderInventory" class="inventoryBtn detailBtn">清单</router-link>
          <router-link to="/orderInfoDetail" class="infoDetailBtn detailBtn">订单详情</router-link>
        </div>
        <div class="detailInfo">
          <router-view :detailData="detailData" :dining_mode="dining_mode"></router-view>
        </div>
      </div>
      <div class="opreaBtns">
        <div class="opreaBtn getOrder" @click="manageBtnClick('confirm')" v-if="detailData.order_status && detailData.order_status == 0">接单</div>
        <div class="opreaBtn getOrder disabled" v-else>接单</div>
        <div v-if="detailData.order_status && (detailData.order_status == 0 || detailData.order_status == 1)">
          <div class="opreaBtn pay" v-if="detailData.pay_status && detailData.pay_status == 0" @click="payHandle"  >结账</div>
          <div class="opreaBtn pay" v-if="detailData.pay_status && detailData.pay_status == 1" @click="manageBtnClick('finish')" >完成</div>
        </div>
        <div v-else>
          <div class="opreaBtn pay disabled" v-if="detailData.pay_status && detailData.pay_status == 0">结账</div>
          <div class="opreaBtn pay disabled" v-if="detailData.pay_status && detailData.pay_status == 1">完成</div>
        </div>
        <div class="opreaBtn print" @click="printToast">打印</div>
        <div class="opreaBtn cancel" v-if="detailData.order_status && (detailData.order_status == 0 || detailData.order_status == 1)" @click="manageBtnClick('cancel')" >取消</div>
        <div class="opreaBtn cancel disabled" v-else>取消</div>
      </div>
      <div class="close" @click="closeDetailPop"></div>
    </div>
    <v-confirm @confirm="confirmHandler" v-if="popShow" :type="type" :content="confirm_content"></v-confirm>
    <toast :content="toast_print" v-if="toastShow"></toast>
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
      background-color: #fff;
      z-index: 20;
      padding: 0 40px 20px;
      color: @fontColor;
      &.spread {
        transition: transform 0.4s;
        transform: translateX(500px);
      }
      &.off {
        transition: transform 0.4s;
        transform: translateX(1008px);
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
        margin-top: 20px;
        &.short {
          height: -webkit-calc(~"100% - 140px");
          margin-top: 0;
        }
        .detailBtns {
          display: flex;
          .detailBtn {
            text-align: center;
            flex: 1;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            background-color: #f5f5f5;
            &.active {
              background: linear-gradient(to right, #fd8165, #f1ab45);
              color: #fff;
            }
          }
        }
        .detailInfo {
          height: 100%;
          border-radius: 8px;
          overflow-y: scroll;
          height: -webkit-calc(~"100% - 40px");
        }
      }
      .opreaBtns {
        display: flex;
        margin-top: 20px;
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
        confirm_content: "",
        toast_print:"订单已请求打印",
        type: "",
        toast: false,
        toastShow: false,
        popShow: false
      };
    },
    props: {
      detailData: {
        type: Object
      },
      detailShow: {
        type: Boolean
      },
      dining_mode: {
        type: Number
      }
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
        this.popShow = true;
        switch (this.type) {
          case "confirm":
            this.confirm_content = "确定要接单吗?";
            break;
          case "finish":
            this.confirm_content = "确定要完成订单吗?";
            break;
          case "cancel":
            this.confirm_content = "确定要取消订单吗?";
            break;
        }
      },
      printToast(){
        this.toastShow = true;
        setTimeout(()=>{
          this.toastShow = false;
        },5000)
        this.postStatus('print')
      },
      payHandle(){},
      confirmHandler(data){
        if(data[0]){
          this.postStatus(data[1])
        }else{
          this.popShow = false;
        }
      },
      postStatus(operation){
        axios.post('/api/index.php?c=entry&do=order.manage&m=weisrc_dish' + this.paramsFromApp, qs.stringify({
          id: this.detailData.detailId,
          order_status: this.detailData.order_status,
          operation: operation
        })).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.$emit('manageBtn', [this.detailData.detailId, data.order_status,data.pay_status]);
          } else {
            console.log(data.message);
          }
        }).catch(function (error) {
          //console.log(error);
        });
      },
    }
  };

</script>
