<template>
  <div id="handover">
    <div class="leftDetail">
      <div class="part shopDesc ">
        <div class="title">
          <div class="shopName">晚枫亭一号分店</div>
          <div>收银报表</div>
        </div>
        <div class="subDes">
          <div class=" cashierName">收银员：小红</div>
          <div class=" handoverTime">接班时间：2017-05-08 08:00</div>
        </div>
      </div>
      <ul class="part payWays">
        <li class="payWayItem moneyPay">
          <span class="payWayName">现金</span>
          <span class="payWayMoney">688</span>
        </li>
        <li class="payWayItem wxPay">
          <span class="payWayName">微信</span>
          <span class="payWayMoney">688</span>
        </li>
        <li class="payWayItem alipay">
          <span class="payWayName">支付宝</span>
          <span class="payWayMoney">688</span>
        </li>
        <li class="payWayItem bankCardPay">
          <span class="payWayName">银行卡</span>
          <span class="payWayMoney">688</span>
        </li>
        <li class="payWayItem memberCardPay">
          <span class="payWayName">会员卡</span>
          <span class="payWayMoney">688</span>
        </li>
      </ul>
      <div class="part payDetail">
        <div class="total">
          <span>总计</span>
          <span>&yen;11123</span>
        </div>
        <ul class="payDetailList">
          <li>营业笔数：12</li>
          <li>客人总数：223</li>
          <li>赠菜金额：0.00</li>
          <li>退菜金额：</li>
          <li>折扣与减免金额：</li>
          <li>优惠券与会员卡金额：</li>
          <li>抹零金额：</li>
          <li>加收金额：</li>
          <li>快速收款：</li>
        </ul>
      </div>
    </div>
    <div class="rightOpra">
      <div class="handoverDesc">
        <div class="nameAndTime">
          <div class="name">交班人：小红</div>
          <div class="time">交班时间：{{time}}</div>
        </div>
        <div class="moneyNum">应有现金：<span>1688.00</span></div>
        <div class="moneyNumDesc">应有现金 = 本收银员值班期间的应收现金+上个交班收银员预留备用金</div>
      </div>

    </div>
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
      color: #666666;
      .shopDesc {
        padding: 15px 30px 5px;
        color: #333333;
        line-height: 30px;
        border-bottom: 2px solid @lineColor;
        .title {
          text-align: center;
          font-size: 20px;
        }
        .subDes{
          padding: 13px 0;
        }
      }
      .payWays{
        padding: 12px 30px 13px;
        line-height: 32px;
        border-bottom: 2px dashed @lineColor;
        .payWayItem{
          display: flex;
          justify-content:space-between
        }
      }
      .payDetail{
        padding: 17px 30px 15px;
        line-height: 41px;
        .total{
          margin-bottom: 17px;
          font-size: 20px;
          line-height: 30px;
          display: flex;
          justify-content:space-between
        }
      }
    }
    .rightOpra{
      background-color: #ffffff;
    }

  }
</style>
<script type="text/ecmascript-6">
  import leftNav from 'components/common-components/leftNav';
  export default{
    data () {
      return {
        time: '',
      };
    },
    props: {},
    components: {},
    mounted(){
      setInterval(this.clockTime, 1000)
    },
    methods: {
      clockTime(){
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minite = now.getMinutes();
        //let seconds = now.getSeconds();
        this.time = '' + year + '-' + month + '-' + day + ' ' + hour + ':' + minite;
      }
    },
  };

</script>
