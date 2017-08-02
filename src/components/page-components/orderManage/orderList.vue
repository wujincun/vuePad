<template>
  <div id="orderList" >
    <div class="hasContent" v-if="listDataBack && orderList.length>0">
      <ul class="listHead listItem">
        <li>下单时间</li>
        <li v-if="dining_mode == 1">桌位</li>
        <li :class="(dining_mode == 3 || dining_mode == 2)?'orderNum':''" v-else>订单号</li>
        <li v-if="(dining_mode == 1 || dining_mode == 4 || dining_mode == 6) && callFlag">取餐号</li>
        <li>金额</li>
        <li>支付状态</li>
        <li>订单状态</li>
        <li :class="((dining_mode == 1 || dining_mode == 4 || dining_mode == 6) && callFlag)?'operation':''"><!--堂食、外带、快餐并且添加了叫号功能 增加叫号按钮后宽度增加-->
          <div class="text">操作</div>
        </li>
      </ul>
      <div class="listBody" ref="orderListWrapper">
        <div class="listContent" ref="listContent">
          <ul class="listItem" v-for="item in orderList" :id="item.id" :class="(chooseId == item.id || noticeId == item.id)?'active':''">
            <li>{{item.time | formatDate}}</li>
            <li  class="ellipsis" v-if="dining_mode == 1">{{item.show_table}}</li><!--堂食桌台号-->
            <li class="orderNum" v-else-if="(dining_mode == 3 || dining_mode == 2)">{{item.ordersn}}</li><!--预订、外卖的不需要数字精简-->
            <li  v-else-if="dining_mode == 4 || dining_mode == 6">{{item.ordersn | minusNum}}</li><!--外带、快餐订单号数字精简-->
            <li v-if="(dining_mode == 1 || dining_mode == 4 || dining_mode == 6) && callFlag">{{item.meal_number}}</li><!--堂食、外带、快餐类型增加取餐号字段 -->
            <li class="orange">{{item.show_price}}</li>
            <li>{{item.pay_status | payStatus}}</li>
            <li :class="{'red':item.order_status == 0,'blue':item.order_status == 1}">{{item.order_status | orderStatus}}</li>
            <li class="operationBtns" v-if="(dining_mode == 1 || dining_mode == 4 || dining_mode == 6) && callFlag"><!--堂食、外带、快餐类型增加叫号按钮-->
              <div class="operationBtn callIcon" @click="callHandle(item.id)" v-if="!callIdCollection[item.id]"></div>
              <div class="operationBtn noCallIcon" v-else></div>
              <div class="operationBtn toDetailIcon" @click="toDetailHandle(item.id)"></div>
            </li>
            <li class="toDetailOperation"  @click="toDetailHandle(item.id)" v-else></li>
          </ul>
        </div>
        <div class="loadWait inTop"><img src="../../../common/img/refreshWait.gif"/></div>
        <div v-show="upGetList" class="loadWait inBottom"><img src="../../../common/img/loadWait.gif"/></div>
      </div>
    </div>
    <div class="noContent" v-else-if="listDataBack && orderList.length==0">
      <i class="noListIcon icon"></i>
      <div class="text">您还没有相关订单</div>
    </div>
    <waiting-icon v-if="waitingIconShow"  class="inCenter hasMask"></waiting-icon>
  </div>

</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";
  #orderList {
    height: 100%;
    flex: 1;
    position: relative;
    /*部分字体颜色*/
    .orange{
      color: #ff9900;
    }
    .red{
      color: #fa6464;
    }
    .blue{
      color: #53acf5;
    }
    .operationBtns{
      display:flex;
      padding: 0 20px;
      .operationBtn {
        flex:1;
        &.toDetailIcon{
          background-size: 28px 28px;
          .bg-image('icon_caozuo')
        }
        &.callIcon{
          background-size: 28px 28px;
          .bg-image('icon_call')
        }
        &.noCallIcon{
          background-size: 28px 28px;
          .bg-image('icon_noCall')
        }
      }
    }
    .toDetailOperation {
      background-size: 28px 28px;
      .bg-image('icon_caozuo')
    }
    .noListIcon {
      .bg-image('icon_dingdan')
    }
    .loadWait{
      position: absolute;
      &.inTop{
        top: 60px;
      }
      &.inCenter{
        top: 50%;
        z-index: 50;
      }
      width: 100%;
      img{
        display: block;
        height: 60px;
        margin: 0 auto;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import waitingIcon from 'components/common-components/waitingIcon';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../../common/js/date'
  export default{
    data () {
      return {
        chooseId: 0,
        downTimer: null,
        upTimer: null,
        downFirstChild:null,
        upLastChild:null
      };
    },
    props: {
      orderList: Array,
      listDataBack:Boolean,
      noticeId: String,
      dining_mode: Number,
      callFlag:Number,
      callIdCollection: Object,
      upGetList: Boolean,
      scrollDire:String,
      waitingIconShow:Boolean
    },
    components: {
      waitingIcon
    },
    watch: {
      orderList(){
        this.$nextTick(() => {
          if (!this.$refs.orderListWrapper) {
            this.orderListWrapperScroll && this.orderListWrapperScroll.destroy();//销毁后this.orderListWrapperScroll对象仍旧存在，还要置为null
            this.orderListWrapperScroll = null
          } else {
            if (!this.orderListWrapperScroll) {
              this._initScroll()
            } else {
              this.orderListWrapperScroll.refresh();
              if(this.scrollDire == 'up'){
                let listStageH = document.getElementsByClassName('listBody')[0].offsetHeight;
                this.orderListWrapperScroll.scrollToElement(this.upLastChild,300,0,-listStageH+100)
              }else if(this.scrollDire == 'down'){
                this.orderListWrapperScroll.scrollToElement(this.downFirstChild,300,0,100)
              }else if(this.scrollDire == 'reload'){
                this.orderListWrapperScroll.scrollTo(0,0)
              }
            }
          }
        });
      },
    },
    methods: {
      toDetailHandle(id){
        this.chooseId = id;
        this.$emit('toDetailHandle', id)
      },
      callHandle(id){
        this.$emit('callHandle',id)
      },
      _initScroll(){
        this.orderListWrapperScroll = new BScroll(this.$refs.orderListWrapper, {
          click: true
        });
        this.orderListWrapperScroll.on('touchend', (pos) => {
          let scrollContent = this.$refs.listContent;
          let contentH = scrollContent.offsetHeight;
          let screenH = document.documentElement.clientHeight - 64;
          /*下拉刷新*/
          if (pos.y > 50) {
            this.downFirstChild = this.get_firstchild(this.$refs.listContent)
            let firstChildId = this.downFirstChild.id;
            if (this.downTimer) {
              clearTimeout(this.downTimer)
            }
            this.downTimer = setTimeout(()=> {
              this.$emit('scrollHandle', ['down', firstChildId]);
            }, 1000)
          }
          /*上拉加载*/
          if (this.upGetList) {//还有数据可拉取
            if (-pos.y + screenH > contentH + 50) {
              this.upLastChild = this.get_lastchild(this.$refs.listContent)
              let lastChildId = this.upLastChild.id;
              if (this.upTimer) {
                clearTimeout(this.upTimer)
              }
              this.upTimer = setTimeout(() => {
                this.$emit('scrollHandle', ['up', lastChildId])
              }, 1000)
            }
          }
        })
      },
      get_lastchild(n){
        var x = n.lastChild;
        while (x.nodeType != 1) {
          x = x.previousSibling;
        }
        return x;
      },
      get_firstchild(n){
        var x = n.firstChild;
        while (x.nodeType != 1) {
          x = x.nextSibling;
        }
        return x;
      },
    },
    filters: {
      formatDate(time){
        let date = new Date(time * 1000);
        return formatDate(date, 'hh:mm');
      },
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
      },
      minusNum(str){
        return str.replace(/(\d{3})\d*(\d{3})/,"$1...$2")
      }
    },
  };

</script>
