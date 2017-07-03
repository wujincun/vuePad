<template>
  <div id="orderDetail" >
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
            <router-link to="/orderInfoDetail" class="infoDetailBtn detailBtn" >订单详情</router-link>
          </div>
          <div class="detailInfo">
            <router-view :detailData="detailData" :dining_mode="dining_mode"></router-view>
          </div>
        </div>
        <div class="opreaBtns">
          <div class="opreaBtn getOrder" @click="btnHandle('confirm')" :class="detailData.order_status == 0 ? '':'disabled'">接单</div>
          <div class="opreaBtn pay" v-if="detailData.order_status == 1" @click="btnHandle('finish')" :class="">完成</div>
          <div class="opreaBtn pay" v-else>结账</div>
          <div class="opreaBtn print" @click="btnHandle('print')">打印</div>
          <div class="opreaBtn cancel" @click="btnHandle('cancel')">取消</div>
        </div>
        <div class="close" @click="closeDetailPop"></div>
      </div>
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
      .clientInfo{
        font-size: 16px;
        line-height: 30px;
        padding: 14px 0;
      }
      .orderInfo{
        border-radius: 6px;
        border: 1px solid @borderColor;
        height: -webkit-calc(~"100% - 72px");
        margin-top: 20px;
        &.short{
          height: -webkit-calc(~"100% - 140px");
          margin-top: 0;
        }
        .detailBtns{
          display: flex;
          .detailBtn{
            text-align: center;
            flex: 1;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            background-color: #f5f5f5;
            &.active{
              background: linear-gradient(to right,#fd8165, #f1ab45);
              color: #fff;
            }
          }
        }
        .detailInfo{
          height:100%;
          border-radius: 8px;
          overflow-y: scroll;
          height: -webkit-calc(~"100% - 40px");
        }
      }
      .opreaBtns{
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        .opreaBtn{
          height: 32px;
          width: 60px;
          text-align: center;
          line-height: 32px;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          &.getOrder{
            background-color: #ffae33;
          }
          &.pay{
            background-color: #63c768;
          }
          &.print{
            background-color: #58aef5;
          }
          &.cancel{
            background-color: #858585;
          }
          &.disabled{
            background-color: #cccccc;
          }
        }
      }
      .close{
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
  import axios from 'axios';
  import qs from 'qs';
  export default{
    data () {
      return {};
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
    methods:{
      closeDetailPop(){
        this.$emit('closeDetailPop')
      },
      btnHandle(type){
        axios.post('/api/index.php?c=entry&do=order.manage&m=weisrc_dish' + this.paramsFromApp,qs.stringify({
          id: this.detailData.detailId,
          order_status:this.detailData.order_status,
          operation:type
        })).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.$emit('manageBtn',{detailId:this.detailData.detailId,orderStatus:data.order_status});
          } else {
            console.log(data.message);
          }
        }).catch(function (error) {
          //console.log(error);
        });
      }
    }

  };

</script>
