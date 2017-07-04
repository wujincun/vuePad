<template>
  <div id="orderList" ref="orderListWrapper">
    <div class="hasContent" v-if="orderList.length>0">
      <table>
        <thead>
        <tr>
          <td>下单时间</td>
          <td v-if="dining_mode == 1">桌位</td>
          <td v-else>订单号</td>
          <td>金额</td>
          <td>支付状态</td>
          <td>订单状态</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody ref="listContent">
        <tr v-for="item in orderList"  :id="item.id">
          <td>{{item.time | formatDate}}</td>
          <td v-if="dining_mode == 1">{{item.show_table}}</td>
          <td v-else>{{item.ordersn}}</td>
          <td>{{item.show_price}}</td>
          <td>{{item.pay_status | payStatus}}</td>
          <td>{{item.order_status | orderStatus}}</td>
          <!--<td class="operation" @click="opreaHandle(item.id)"></td>-->
          <td class="operation" v-tap="{methods:opreaHandle,id:item.id}"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="noContent" v-else>
      <i class="noListIcon icon"></i>
      <div class="text">您还没有相关订单</div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #orderList {
    height: 100%;
    flex: 1;
    .operation {
      background-size: 28px 28px;
      .bg-image('icon_caozuo')
    }
    .noListIcon {
      .bg-image('icon_dingdan')
    }
  }
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {formatDate} from '../../../common/js/date'
  export default{
    data () {
      return {

      };
    },
    props: {
      orderList: {
        type: Array
      },
      dining_mode: {
        type: Number
      }
    },
    watch: {
      orderList(){
        this.$nextTick(() => {
          if (!this.orderListWrapperScroll) {
            this._initScroll();
          } else {
            this.orderListWrapperScroll.refresh();
          }
        });
      }
    },
    methods: {
      opreaHandle(params){
        this.$emit('opreaHandle', params.id)
      },
      _initScroll(){
        this.orderListWrapperScroll = new BScroll(this.$refs.orderListWrapper, {
          click: true
        });
        this.orderListWrapperScroll.on('touchend',  (pos) => {
          let firstChildId = this.get_firstchild(this.$refs.listContent).id
          /*下拉刷新*/
          if (pos.y > 50) {
            setTimeout(()=>{
              this.$emit('scrollHandle',['down',firstChildId])
            }, 1000)
          }
          /*上拉加载*/
          let scrollContent = this.$refs.orderListWrapper.getElementsByClassName('hasContent')[0]
          let contentH = scrollContent.offsetHeight;
          let screenH = document.documentElement.clientHeight - 64;
          if (-pos.y + screenH > contentH + 50) {
           let lastChildId = this.get_lastchild(this.$refs.listContent).id
           setTimeout(() => {
             this.$emit('scrollHandle',['up',lastChildId])
             scrollContent.style.transform = "translate(0," + pos.y + "px)"
            }, 1000)
          }
        })
      },
      get_lastchild(n){
        var x=n.lastChild;
        while (x.nodeType!=1)
        {
          x=x.previousSibling;
        }
        return x;
      },
      get_firstchild(n){
        var x=n.firstChild;
        while (x.nodeType!=1)
        {
          x=x.nextSibling;
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
