<template>
  <div id="handoverList">
    <div class="handoverListHeader header">
      <div class="backBtn leftIcon" @click="backHandler"></div>
      <div class="headerTitle">交接班</div>
      <div class="calender">
        <div class="calenderStage" @click="getDaysList">{{chooseDate}}</div>
        <div class="calenderBody" v-show="calenderShow">
          <ul class="calenderList">
            <li class="calenderItem" v-for="item in daysList" @click="chooseDateHandler(item)">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="logList">
      <table>
        <thead>
          <tr>
            <td>交班时间</td>
            <td>交班人</td>
            <td>应有现金</td>
            <td>实际现金</td>
            <td>预留备用金</td>
          </tr>
        </thead>
        <tbody>
        <tr v-for="item in dataList">
          <td>{{item.to_time | formatDate}}</td>
          <td>{{item.salename}}</td>
          <td class="shouldMoney">{{item.offset_cash + item.current_cash}}</td>
          <td class="actualMoney">{{item.current_cash}}</td>
          <td class="spareMoney">{{item.move_cash}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../../common/style/common.less";

  #handoverList {
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
      .calender {
        margin-right: 52px;
        position: relative;
        .calenderStage {
          font-size: 18px;
          color: @fontColor;
          position: relative;
          &:after {
            position: absolute;
            right: -22px;
            top: 27px;
            content: '';
            width: 0;
            height: 0;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-top: 9px solid #cccccc;
          }
        }
        .calenderBody{
          border: 1px solid @lineColor;
          box-shadow: 0 3px 12px 0 rgba(111,109,204,0.15);
          background-color: #fff;
          z-index: 10;
          border-radius: 5px;
          position: absolute;
          left: -43px;
          top: 56px;
          width: 176px;
          text-align: center;
          &:before{
            position: absolute;
            top:-9px;
            right: 9px;
            content: '';
            width: 0;
            height: 0;
            border-left: 11px solid transparent;
            border-right: 11px solid transparent;
            border-bottom: 9px solid @lineColor;
            z-index: 20;
          }
          &:after{
            position: absolute;
            top:-7px;
            right: 9px;
            content: '';
            width: 0;
            height: 0;
            border-left: 11px solid transparent;
            border-right: 11px solid transparent;
            border-bottom: 9px solid #ffffff;
            z-index: 20;
          }
          .calenderList {
            max-height: 400px;
            overflow-y: scroll;
            &::-webkit-scrollbar{
              background-color: #fff;
            }
            &::-webkit-scrollbar-track{
              background-color: #fff;
            }
            &::-webkit-scrollbar-thumb{
              background-color: #999999;
            }
            &::-webkit-scrollbar-track-piece{
              background-color: #fff;
            }
            .calenderItem {
              font-size: 16px;
              color: rgba(128,136,154,0.6);
              line-height: 50px;
              border-bottom: 1px solid @lineColor;
              &:active{
                color: @titleFontColor;
              }
              &:last-child{
                border-bottom: none;
              }
            }
          }
        }
      }
    }
    .logList{
      table{
        width: 100%;
        text-align: center;
        color: @fontColor;
        font-size: 18px;
        thead{
          font-size: 20px;
          background-color: @backColor;
        }
        tbody{
         .shouldMoney,.actualMoney,.spareMoney{
           font-weight: bold;
         }
          .actualMoney{
            color:#ff9900;
          }
          .spareMoney{
            color: #f56767;
          }
        }
        tr{
          line-height: 60px;
          border-bottom: 1px solid @lineColor;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import qs from 'qs';
  import axios from 'axios';
  import {formatDate} from '../../../common/js/date'

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
      this.chooseDate = formatDate(new Date(),'yyyy-MM-dd')
      this.getDataList()
    },
    components: {},
    methods: {
      backHandler(){
        //调取原生方法
      },
      chooseDateHandler(date){
        this.chooseDate = date;
        this.calenderShow = false;
        this.getDataList()
      },
      getDataList(){
        axios.get('/api/index.php?c=entry&do=saleReport.listItem&m=weisrc_dish' + this.paramsFromApp + '&date='+ this.chooseDate).then((res) => {
          let data = res.data;
          if(data.code == 200){
            this.dataList = data.data;
          }else{
            console.log(data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getDaysList(){
        if (this.daysList.length === 0) {
          //调取数据
          axios.get('/api/index.php?c=entry&do=saleReport.listDateByDevice&m=weisrc_dish'+ this.paramsFromApp).then((res) => {
            let data = res.data;
            if(data.code == 200){
              this.daysList = data.data;
              this.calenderShow = true;
            }else{
              console.log(data.message);
            }
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          this.calenderShow = !this.calenderShow
        }
      }
    }
  };

</script>
