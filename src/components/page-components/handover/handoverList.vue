<template>
  <div id="handoverList">
    <div class="handoverListHeader header">
      <div class="backBtn leftIcon" @click="backHandler"></div>
      <div class="headerTitle">交接班</div>
      <div class="datePicker">
        <select-data :time="true" :listData="daysList" :listShow="calenderShow" :chooseItem="chooseDate"
                     @getList="getDaysList" @chooseHandler="chooseDateHandler"></select-data>
      </div>
    </div>
    <div class="logList">
      <div class="hasContent">
        <ul class="listHead listItem">
          <li>交班时间</li>
          <li>交班人</li>
          <li>应有现金</li>
          <li>实际现金</li>
          <li>预留备用金</li>
        </ul>
        <div class="listBody" v-if="dataList.length>0">
          <ul class="listItem" v-for="item in dataList">
            <li>{{item.to_time | formatDate}}</li>
            <li>{{item.salename}}</li>
            <li class="shouldMoney">{{item.should_money}}</li>
            <li class="actualMoney">{{item.current_cash}}</li>
            <li class="spareMoney">{{item.move_cash}}</li>
          </ul>
        </div>
        <div v-else class="noContent">
          <p class="text">暂无交接班记录</p>
        </div>
      </div>
      <!--<table>
        <thead>
        <tr>
          <td>交班时间</td>
          <td>交班人</td>
          <td>应有现金</td>
          <td>实际现金</td>
          <td>预留备用金</td>
        </tr>
        </thead>
        <tbody v-if="dataList.length>0">
        <tr v-for="item in dataList">
          <td>{{item.to_time | formatDate}}</td>
          <td>{{item.salename}}</td>
          <td class="shouldMoney">{{item.should_money}}</td>
          <td class="actualMoney">{{item.current_cash}}</td>
          <td class="spareMoney">{{item.move_cash}}</td>
        </tr>
        </tbody>
        <tbody class="noList" v-else>暂无交接班记录</tbody>
      </table>-->
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #handoverList {
    height: 100%;
    .handoverListHeader {
      .backBtn {
        .bg-image('icon_return')
      }
      .headerTitle {
        flex: 1;
        font-size: 22px;
        color: @titleFontColor;
        text-align: center;
      }
      .datePicker {
        margin-right: 24px;
      }
    }
    .logList {
      height: -webkit-calc(~"100% - 126px");
      .shouldMoney, .actualMoney, .spareMoney {
        font-weight: bold;
      }
      .actualMoney {
        color: #ff9900;
      }
      .spareMoney {
        color: #f56767;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import qs from 'qs';
  import axios from 'axios';
  import {formatDate} from '../../../common/js/date'
  import selectData from 'components/common-components/select-data';

  export default{
    data () {
      return {
        chooseDate: '',
        calenderShow: false,
        daysList: [],
        dataList: []
      };
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created(){
      this.chooseDate = formatDate(new Date(), 'yyyy-MM-dd')
      this.getDataList()
    },
    mounted(){
      window.reload = ()=> {
        this.getDataList();
      }
    },
    components: {
      selectData
    },
    methods: {
      backHandler(){
        //调取原生方法
        if (typeof (padApp) != 'undefined') {
          padApp.goBackView()
        }
      },
      chooseDateHandler(date){
        this.chooseDate = date;
        this.calenderShow = false;
        this.getDataList()
      },
      getDataList(){
        axios.get('/api/index.php?c=entry&do=saleReport.listItem&m=weisrc_dish' + this.paramsFromApp + '&date=' + this.chooseDate.replace(/\-/g, '')).then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.dataList = data.data;
          } else {
            console.log(data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getDaysList(){
        if (this.daysList.length === 0) {
          //调取数据
          axios.get('/api/index.php?c=entry&do=saleReport.listDateByDevice&m=weisrc_dish' + this.paramsFromApp).then((res) => {
            let data = res.data;
            if (data.code == 200) {
              this.daysList = data.data;
              this.calenderShow = true;
            } else {
              alert(data.message);
            }
          }).catch(function (error) {
            alert(error);
          });
        } else {
          this.calenderShow = !this.calenderShow
        }
      }
    }
  };

</script>
