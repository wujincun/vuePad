<template>
  <div class="calender">
    <div class="calenderStage" @click="getList">{{chooseItem}}</div>
    <div class="calenderBody" v-show="listShow">
      <ul class="calenderList">
        <li class="calenderItem" v-for="item in listData" @click="chooseHandler(item)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/style/common.less";
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
    .calenderBody {
      border: 1px solid @lineColor;
      box-shadow: 0 3px 12px 0 rgba(111, 109, 204, 0.15);
      background-color: #fff;
      z-index: 10;
      border-radius: 5px;
      position: absolute;
      left: -43px;
      top: 56px;
      width: 176px;
      text-align: center;
      &:before {
        position: absolute;
        top: -9px;
        right: 9px;
        content: '';
        width: 0;
        height: 0;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        border-bottom: 9px solid @lineColor;
        z-index: 20;
      }
      &:after {
        position: absolute;
        top: -7px;
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
        &::-webkit-scrollbar {
          background-color: #fff;
        }
        &::-webkit-scrollbar-track {
          background-color: #fff;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #999999;
        }
        &::-webkit-scrollbar-track-piece {
          background-color: #fff;
        }
        .calenderItem {
          font-size: 16px;
          color: rgba(128, 136, 154, 0.6);
          line-height: 50px;
          border-bottom: 1px solid @lineColor;
          &:active {
            color: @titleFontColor;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date'
  export default{
    data () {
      return {};
    },
    props: {
      listData:{
        type:Array
      },
      listShow:{
        type:Boolean
      },
      chooseItem:{
        type:String
      }
    },
    methods:{
      getList(){
        this.$emit('getList')
      },
      chooseHandler(item){
        this.$emit('chooseHandler',item)
      },
    }
  };

</script>
