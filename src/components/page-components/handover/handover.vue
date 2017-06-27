<template>
  <div id="handover">
    <div class="leftDetail">
      <div class="part shopDesc ">
        <div class="title">
          <div class="shopName">晚枫亭一号分店</div>
          <div>收银报表</div>
        </div>
        <div class="subDes">
          <div>收银员：{{data.salename}}</div>
          <div>接班时间：{{data.from_time | formatDate}}</div>
        </div>
      </div>
      <ul class="part payWays">
        <li class="payWayItem moneyPay">
          <span class="payWayName">现金</span>
          <span class="payWayMoney">{{data.cash}}</span>
        </li>
        <li class="payWayItem wxPay">
          <span class="payWayName">微信</span>
          <span class="payWayMoney">{{data.wechat_fee}}</span>
        </li>
        <li class="payWayItem alipay">
          <span class="payWayName">支付宝</span>
          <span class="payWayMoney">{{data.alipay_fee}}</span>
        </li>
        <li class="payWayItem bankCardPay">
          <span class="payWayName">银行卡</span>
          <span class="payWayMoney">{{data.member_credit1}}</span>
        </li>
        <li class="payWayItem memberCardPay">
          <span class="payWayName">会员卡</span>
          <span class="payWayMoney">{{data.member_credit2}}</span>
        </li>
      </ul>
      <div class="part payDetail">
        <div class="total">
          <span>总计</span>
          <span>&yen;{{totalMoney}}</span>
        </div>
        <ul class="payDetailList">
          <li>营业笔数：{{data.order_number}}</li>
          <li>客人总数：{{data.customer_number}}</li>
          <li>赠菜金额：{{data.free_dish_fee}}</li>
          <li>退菜金额：{{data.reject_dish_fee }}</li>
          <li>折扣与减免金额：{{data.discount + data.reduce}}</li>
          <li>优惠券与会员卡金额：{{data.mc_coupon + data.wechat_coupon + data.member_card }}</li>
          <li>抹零金额：{{data.round_off }}</li>
          <li>加收金额：{{data.surcharge}}</li>
          <li>快速收款：{{data.quick_pay}}</li>
        </ul>
      </div>
    </div>
    <div class="rightOpra">
      <div class="handoverDesc">
        <div class="nameAndTime">
          <div class="handoverName">交班人：{{data.salename}}</div>
          <div class="handoverTime">交班时间：{{time}}</div>
        </div>
        <div class="moneyNum">应有现金：<span class="handoverMoney">{{data.cash + data.offset_cash}}</span></div>
        <div class="moneyNumDesc">应有现金 = 本收银员值班期间的应收现金+上个交班收银员预留备用金</div>
      </div>
      <div class="oprea">
        <div class="opreaInput">
          <label class="opreaInputItem"><span>实际现金</span><input class="actualMoneyNum" v-model="actualMoneyNum"/></label>
          <label class="opreaInputItem"><span>预留备用金</span><input class="spareMoneyNum" v-model="spareMoneyNum"/></label>
        </div>
        <div class="opreabtn">
          <div class="printBtn" @click="printHandler">打印交班报表</div>
          <div class="sureBtn" @click="popShow=true">确定交班</div>
        </div>
      </div>
    </div>
    <v-confirm @confirm="confirmHandler" v-if="popShow"></v-confirm>
  </div>

</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #handover {
    display: flex;
    background-color: @backColor;
    .leftDetail {
      width: 340px;
      margin-right: 14px;
      background-color: #ffffff;
      font-size: 16px;
      color: @fontColor;
      .shopDesc {
        padding: 15px 30px 5px;
        color: @titleFontColor;
        line-height: 30px;
        border-bottom: 2px solid @lineColor;
        .title {
          text-align: center;
          font-size: 20px;
        }
        .subDes {
          padding: 13px 0;
        }
      }
      .payWays {
        padding: 12px 30px 13px;
        line-height: 32px;
        border-bottom: 2px dashed @lineColor;
        .payWayItem {
          display: flex;
          justify-content: space-between
        }
      }
      .payDetail {
        padding: 17px 30px 15px;
        line-height: 41px;
        .total {
          margin-bottom: 17px;
          font-size: 20px;
          line-height: 30px;
          display: flex;
          justify-content: space-between;
          >span{
            font-weight: bold;
          }
        }
      }
    }
    .rightOpra {
      background-color: #ffffff;
      flex: 1;
      .handoverDesc {
        padding: 14px 30px 16px;
        font-size: 16px;
        color: @fontColor;
        border-bottom: 1px solid @lineColor;
        .nameAndTime {
          height: 32px;
          line-height: 32px;
          display: flex;
          justify-content: space-between;
        }
        .moneyNum {
          height: 40px;
          line-height: 40px;
          .handoverMoney {
            font-size: 20px;
            color: #ff9900;
          }
        }
        .moneyNumDesc {
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          color: #fa6464;
        }
      }
      .oprea {
        padding: 46px 0 30px;
        .opreaInput {
          text-align: center;
          display: flex;
          flex-flow: column;
          margin-bottom: 30px;
          .opreaInputItem {
            margin-bottom: 40px;
            color: @titleFontColor;
            span {
              display: inline-block;
              width: 120px;
              text-align: right;
              margin-right: 30px;
            }
            input {
              height: 44px;
              width: 260px;
              border: 1px solid @borderColor;
              border-radius: 4px;
              text-indent: 20px;
            }
          }
        }
        .opreabtn {
          padding: 0 53px;
          display: flex;
          justify-content: space-between;
          .printBtn, .sureBtn {
            width: 220px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 8px;
            color: #ffffff;
            font-size: 20px;
          }
          .printBtn {
            background-color: #319df5;
          }
          .sureBtn {
            background-color: @sureBtnColor;
          }
        }
      }
    }

  }
</style>
<script type="text/ecmascript-6">
  import vConfirm from 'components/common-components/v-confirm';
  import qs from 'qs';
  import axios from 'axios';
  import {formatDate} from '../../../common/js/date'
  export default{
    data () {
      return {
        data: {},
        time: '',
        popShow: false,
        actualMoneyNum: '',
        spareMoneyNum: '',
        totalMoney: 0
      };
    },
    props: {},
    components: {
      vConfirm
    },
    created(){
      //获取初始数据
      axios.post('/api/index.php?c=entry&do=saleReport.byDevice&m=weisrc_dish'+ this.paramsFromApp).then((res)=> {
        let data = res.data;
        if (data.code == 200) {
          this.data = data.data;
          this.totalMoney = this.data.cash + this.data.wechat_fee + this.data.alipay_fee + this.data.member_credit1 + this.data.member_credit2
        } else {
          console.log(data.message)
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    mounted(){
      this.clockTime()
      setInterval(this.clockTime, 1000)
    },
    methods: {
      clockTime(){
        let now = new Date();
        this.time = formatDate(now, 'yyyy-MM-dd hh:mm')
      },
      confirmHandler(bool){
        if (bool) {
          //点击确定操作：调取接口
          axios.post('/api/index.php?c=entry&do=saleReport.submit&m=weisrc_dish'+ this.paramsFromApp, qs.stringify({
            current_cash:this.actualMoneyNum,
            move_cash:this.spareMoneyNum
          })).then((res)=> {
            let data = res.data;
            if (data.code == 200) {
                //跳转到登录页,调取原生方法

            } else {
              console.log(data.message)
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          this.popShow = false
        }
      },
      printHandler(){
        //打印按钮操作，调取接口
        axios.post('/api/index.php?c=entry&do=saleReport.sendToPrint&m=weisrc_dish'+ this.paramsFromApp, qs.stringify({
          current_cash:this.actualMoneyNum,
          move_cash:this.spareMoneyNum
        })).then((res)=> {
          let data = res.data;
          if (data.code == 200) {
            //
          } else {
            console.log(data.message)
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
  };

</script>
