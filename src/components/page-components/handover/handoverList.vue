<template>
  <div id="handoverList">
    <div class="handoverListHeader">
      <div class="backBtn" @click="backHandler"></div>
      <div class="headerTitle">交接班</div>
      <div class="calender">
        <div class="calenderStage" @click="getDaysList">2017-05-08</div>
        <div class="calenderBody" v-show="calenderShow">
          <ul class="calenderList">
            <li class="calenderItem" v-for="item in daysList" @click="chooseDateHandler">2017-04-06</li>
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
        <tr v-for="">
          <td>07:00</td>
          <td>小红</td>
          <td>1688.00</td>
          <td class="orange">1600.00</td>
          <td class="red">88.00</td>
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
      display: flex;
      height: 64px;
      line-height: 64px;
      border-bottom: 1px solid @lineColor;
      .backBtn {
        height: 18px;
        width: 18px;
        background-size: 18px 18px;
        margin: 23px 20px;
        .bg-image('head_cedaohang')
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
            .calenderItem {
              font-size: 16px;
              color: rgba(43,56,87,0.6);
              line-height: 50px;
              border-bottom: 1px solid @lineColor;
              &:active{
                color: @titleFontColor;
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
          .orange{
            color:#ff9900;
          }
          .red{
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
    created(){
      this.chooseDate = formatDate(new Date(),'yyyy-MM-dd')
      this.getDataList(this.chooseDate)
    },
    components: {},
    methods: {
      backHandler(){

      },
      chooseDateHandler(){

      },
      getDataList(chooseDate){
        axios.post('',qs.stringify({
          chooseDate:chooseDate
        })).then((res) => {
          let data = res.data;
          if(data.code == 0){
            this.dataList = data.result;
          }else{

          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getDaysList(){
        if (this.dataList.length === 0) {
          //调取数据
          axios.post('').then((res) => {
            let data = res.data;
            if(data.code == 0){
              this.daysList = data.result;
              this.calenderShow = true;
            }else{

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
