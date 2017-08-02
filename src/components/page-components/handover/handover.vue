<template>
  <div id="handover" v-if="!waiting">
    <div class="handoverContent" v-if="!failLoadFlag">
      <div class="leftDetail">
        <div class="leftDetailContent">
          <div class="part shopDesc ">
            <div class="title">
              <div class="shopName">{{data.storename}}</div>
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
              <span class="payWayMoney">{{data.bankCard_fee}}</span>
            </li>
            <li class="payWayItem memberCardPay">
              <span class="payWayName">会员余额</span>
              <span class="payWayMoney">{{data.member_credit2}}</span>
            </li>
          </ul>
          <div class="part payDetail">
            <div class="total">
              <span>总计</span>
              <span>&yen;{{data.total_money}}</span>
            </div>
            <ul class="payDetailList">
              <li>营业笔数：{{data.order_number}}</li>
              <li>客人总数：{{data.customer_number}}</li>
              <li>赠菜金额：{{data.free_dish_fee}}</li>
              <li>退菜金额：{{data.reject_dish_fee }}</li>
              <li>折扣与减免金额：{{data.discount}}</li>
              <li>优惠券与会员卡金额：{{data.coupons_num}}</li>
              <li>抹零金额：{{data.round_off }}</li>
              <li>加收金额：{{data.surcharge}}</li>
              <li>快速收款：{{data.quick_pay}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rightOpra">
        <div class="rightOpraContent">
          <div class="handoverDesc">
            <div class="nameAndTime">
              <div class="handoverName">交班人：{{data.salename}}</div>
              <div class="handoverTime">交班时间：{{time}}</div>
            </div>
            <div class="moneyNum">应有现金：<span class="handoverMoney">{{data.should_money}}</span></div>
            <div class="moneyNumDesc">应有现金 = 本收银员值班期间的应收现金+上个交班收银员预留备用金</div>
          </div>
          <div class="oprea">
            <div class="opreaInput">
              <label class="opreaInputItem"><span>实际现金</span><input type="text" class="actualMoneyNum" @focus="focusHandler" @blur="surplusShow=false"
                                                                    v-model="actualMoneyNum"/></label>
              <label class="opreaInputItem"><span>预留备用金</span><input type="text" class="spareMoneyNum" @focus="focusHandler" @blur="surplusShow=false"
                                                                     v-model="spareMoneyNum"/></label>
            </div>
            <div class="opreabtn">
              <div class="printBtn" @click="printHandler">打印交班报表</div>
              <div class="sureBtn" @click="handoverSureHandler">确定交班</div>
            </div>
          </div>
        </div>
        <!--用于input获得焦点时不被软键盘遮挡-->
        <div class="surplus" v-if="surplusShow"></div>
      </div>
      <v-confirm @confirm="confirmHandler" v-if="popShow"></v-confirm>
      <toast :content="toastContent" v-if="toastShow"></toast>
    </div>
    <fail-load v-else @reloadPage="reloadPage"></fail-load>
  </div>
  <waiting-icon v-else  class="inCenter"></waiting-icon>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";
  #handover {
    height: 100%;
    .handoverContent{
      display: flex;
      background-color: @backColor;
      height: 100%;
      .leftDetail {
        width: 35.4177%;
        margin-right: 14px;
        background-color: #ffffff;
        font-size: 16px;
        color: @fontColor;
        height: 100%;
        overflow-y: scroll;
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
            > span {
              font-weight: bold;
            }
          }
        }
      }
      .rightOpra {
        background-color: #ffffff;
        flex: 1;
        overflow-y: scroll;
        .handoverDesc {
          padding: 24px 30px 26px;
          //padding: 2.31% 4.95% 2.64%;
          font-size: 18px;
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
              font-size: 22px;
              color: #ff9900;
              font-weight: bold;
            }
          }
          .moneyNumDesc {
            height: 26px;
            line-height: 26px;
            font-size: 14px;
            color: #fa6464;
          }
        }
        .oprea {
          //padding: 46px 0 30px;
          padding: 7.59% 0 4.95%;
          .opreaInput {
            text-align: center;
            display: flex;
            flex-flow: column;
            //margin-bottom: 30px;
            margin-bottom: 4.95%;
            .opreaInputItem {
              //margin-bottom: 40px;
              margin-bottom: 6.6%;
              color: @titleFontColor;
              span {
                display: inline-block;
                width: 120px;
                text-align: right;
                margin-right: 4.95%;
                font-size: 20px;
                line-height: 44px;
                vertical-align: top;
              }
              input {
                height: 44px;
                //width:260px;
                width: 42.9%;
                border: 2px solid @borderColor;
                border-radius: 4px;
                text-indent: 20px;
                font-size: 24px;
              }
            }
          }
          .opreabtn {
            padding: 0 53px;
            display: flex;
            justify-content: space-between;
            .printBtn, .sureBtn {
              //width: 220px;
              width: 44%;
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
              background-color: @strongRedColor;
            }
          }
        }
        .surplus{
          height: 300px;
        }
      }

    }
  }
</style>
<script type="text/ecmascript-6">
  import vConfirm from 'components/common-components/v-confirm';
  import toast from 'components/common-components/toast';
  import waitingIcon from 'components/common-components/waitingIcon';
  import failLoad from 'components/common-components/failLoad';
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
        oldActualMoneyNum: '',
        oldSpareMoneyNum: '',
        totalMoney: 0,
        toastContent: '',
        toastShow: false,
        waiting:true,
        failLoadFlag: false,
        /*为了软键盘不遮挡input加的多余div*/
        surplusShow: false
      };
    },
    props: {},
    components: {
      vConfirm,
      waitingIcon,
      toast,
      failLoad
    },
    watch:{
      actualMoneyNum(){
        let reg = /^\d{0,9}(\.\d{0,2})?$/;
        if(!reg.test( this.actualMoneyNum)){
          this.actualMoneyNum = this.oldActualMoneyNum;
        }else{
          this.oldActualMoneyNum = this.actualMoneyNum;
        }
      },
      spareMoneyNum(){
        let reg = /^\d{0,9}(\.\d{0,2})?$/;
        if(!reg.test( this.spareMoneyNum)){
          this.spareMoneyNum = this.oldSpareMoneyNum;
        }else{
          this.oldSpareMoneyNum = this.spareMoneyNum;
        }
      }
    },
    created(){
      //获取初始数据
      this.getInitData()
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    mounted(){
      this.clockTime();
      setInterval(this.clockTime, 1000);
      window.reload = ()=> {
        this.getInitData();
      };
    },
    /*updated(){
      //let div = document.getElementsByClassName('handoverDesc')[0];
      //alert(window.getComputedStyle(div).fontSize);
    },*/
    methods: {
      /*动态时间*/
      clockTime(){
        let now = new Date();
        this.time = formatDate(now, 'yyyy-MM-dd hh:mm')
      },
      getInitData(){
        axios.post('/api/index.php?c=entry&do=saleReport.byDevice&m=weisrc_dish' + this.paramsFromApp).then((res)=> {
          let data = res.data;
          this.waiting = false;
          if (data.code == 200) {
            this.data = data.data;
            this.data.coupons_num = (this.data.mc_coupon * 1 + this.data.wechat_coupon * 1 + this.data.member_card * 1).toFixed(2)
          } else {
            console.log(data.message)
          }
        }).catch(function (error) {
          this.failLoadFlag = true;
          console.log(error);
        });
      },
      /*app调取得方法，不reload，要重新获取数据*/
      reloadPage(){
        this.getInitData()
      },
      /*input获得焦点时放到可是区域*/
      focusHandler(){
        /*页面没有被压缩，软键盘只是浮在上层，此方法不通*/
        //document.getElementsByClassName('spareMoneyNum')[0].scrollIntoViewIfNeeded();
        /*此时的方法是input获得焦点时在下面加一个空有一定高度的div，让页面可以滚动到合适位置*/
        this.surplusShow = true;
        this.$nextTick(()=>{
          document.getElementsByClassName('rightOpra')[0].scrollTop = 150
        })
      },
      /*确定操作*/
      confirmHandler(bool){
        if (bool) {
          //点击确定操作：调取接口
          axios.post('/api/index.php?c=entry&do=saleReport.submit&m=weisrc_dish' + this.paramsFromApp, qs.stringify({
            current_cash: this.actualMoneyNum,
            move_cash: this.spareMoneyNum,
            sale_report_id: this.data.id
          })).then((res)=> {
            let data = res.data;
            if (data.code == 200) {
              //跳转到登录页,调取原生方法
              if (typeof (padApp) != 'undefined') {
                padApp.goToLogin()
              }
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
      /*input键入是验证*/
      handoverSureHandler(){
        if(this.actualMoneyNum != '' && this.spareMoneyNum != ''){
          this.popShow = true;
        }else{
          if(this.actualMoneyNum == ''){
            this.toast('请先输入[实际现金]',2000);
            return
          }
          if(this.spareMoneyNum == ''){
            this.toast('请先输入[预留备用金]',2000);
            return
          }
        }
      },
      printHandler(){
        //打印按钮操作，调取接口 云打印
        this.toast('已请求打印',2000)
        axios.post('/api/index.php?c=entry&do=saleReport.sendToPrint&m=weisrc_dish' + this.paramsFromApp, qs.stringify({
          current_cash: this.actualMoneyNum,
          move_cash: this.spareMoneyNum,
          sale_report_id: this.data.id
        })).then((res)=> {
          let data = res.data;
          this.data.id = res.data.id;
          if (data.code != 200) {
            this.toast('云打印失败',2000)
          }
        }).catch(function (error) {
          console.log(error);
        });
        /*一体机的原生打印*/
        if (typeof (padApp) != 'undefined') {
          let printS = padApp.printCashierReport(JSON.stringify(this.data))
          if (!printS) {
            this.toast('收银一体机打印失败',2000)
          }
        }
      },
      toast(content,time){
        this.toastContent = content
        this.toastShow = true;
        setTimeout(()=> {
          this.toastShow = false;
        }, time)
      },
    },
  };

</script>
