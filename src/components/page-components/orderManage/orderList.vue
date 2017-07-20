<template>
  <div id="orderList" v-if="!waitingIconShow">
    <div class="hasContent" v-if="listDataBack && orderList.length>0">
      <ul class="listHead listItem">
        <li>下单时间</li>
        <li v-if="dining_mode == 1">桌位</li>
        <li class="orderNum" v-else>订单号</li>
        <li>金额</li>
        <li>支付状态</li>
        <li>订单状态</li>
        <li>操作</li>
      </ul>
      <div class="listBody" ref="orderListWrapper">
        <div class="listContent" ref="listContent">
          <ul class="listItem" v-for="item in orderList" :id="item.id" :class="(chooseId == item.id || noticeId == item.id)?'active':''">
            <li>{{item.time | formatDate}}</li>
            <li  class="ellipsis" v-if="dining_mode == 1">{{item.show_table}}</li>
            <li class="orderNum" v-else>{{item.ordersn}}</li>
            <li>{{item.show_price}}</li>
            <li>{{item.pay_status | payStatus}}</li>
            <li>{{item.order_status | orderStatus}}</li>
            <li class="operation" @click="opreaHandle(item.id)"></li>
          </ul>
        </div>
        <waiting-icon class="inBottom" v-show="upGetList"></waiting-icon>
        <waiting-icon class="inTop"></waiting-icon>
      </div>
    </div>
    <div class="noContent" v-else-if="listDataBack && orderList.length==0">
      <i class="noListIcon icon"></i>
      <div class="text">您还没有相关订单</div>
    </div>
  </div>
  <waiting-icon v-else  class="inCenter"></waiting-icon>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";
  #orderList {
    height: 100%;
    flex: 1;
    position: relative;
    .hasContent {
      height: 100%;
      .listHead {
        background-color: @backColor;
        font-size: 20px;
        position: relative;
        z-index: 18;
      }
      .listBody {
        height: -webkit-calc(~"100% - 60px");
        .listContent {
          position: relative;
          z-index: 10;
          background: #fff;
          min-height: -webkit-calc(~"100% - 10px");
        }
      }
      .listItem {
        display: flex;
        line-height: 60px;
        text-align: center;
        color: @fontColor;
        font-size: 18px;
        border-bottom: 1px solid #f5f5f5;
        &.active {
          background-color: rgba(0, 0, 0, .1);
        }
        &:last-child {
          border-bottom: none;
        }
        li:not(.orderNum) {
          flex: 1;
          &:last-child {
            border-bottom: none;
          }
        }
        .orderNum {
          width: 200px;
        }
      }
    }
    .operation {
      background-size: 28px 28px;
      .bg-image('icon_caozuo')
    }
    .noListIcon {
      //background-image: url(/icon_dingdan@2x.png);
      .bg-image('icon_dingdan')
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
              console.log('init')
              this._initScroll()
            } else {
              this.orderListWrapperScroll.refresh();
              console.log('refresh')
              if(this.scrollDire == 'up'){
                let listStageH = document.getElementsByClassName('listBody')[0].offsetHeight;
                this.orderListWrapperScroll.scrollToElement(this.upLastChild,300,0,-listStageH+100)
              }else if(this.scrollDire == 'down'){
                this.orderListWrapperScroll.scrollToElement(this.downFirstChild,300,0,100)
              }
            }
          }
        });
      },
    },
    methods: {
      opreaHandle(id){
        this.chooseId = id;
        this.$emit('opreaHandle', id)
      },
      _initScroll(){
        this.orderListWrapperScroll = new BScroll(this.$refs.orderListWrapper, {
          click: true
        });
        this.orderListWrapperScroll.on('touchend', (pos) => {
          let scrollContent = this.$refs.listContent;
          let contentH = scrollContent.offsetHeight;
          let screenH = document.documentElement.clientHeight - 64;
          this.posY = pos.y;
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
      }
    },
  };

</script>
