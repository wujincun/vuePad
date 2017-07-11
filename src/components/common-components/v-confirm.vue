<template>
  <div id="confirmPop">
    <div class="popContainer">
      <div class="content">{{contentText}}</div>
      <div class="footBtns">
        <div class="cancelBtn" v-tap="{methods:cancelHandler}">{{cancelBtnText}}</div>
        <div class="sureBtn" v-tap="{methods:sureHandler}">{{sureBtnText}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/style/common.less";

  #confirmPop {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 500;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    .popContainer {
      padding: 40px 30px 20px;
      width: 620px;
      background-color: #ffffff;
      border-radius: 8px;
      .content {
        color: @fontColor;
        line-height: 40px;
        text-align: center;
        margin-bottom: 40px;
      }
      .footBtns {
        display: flex;
        justify-content: space-between;
        .cancelBtn, .sureBtn {
          width: 250px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 8px;
          font-size: 20px;
        }
        .cancelBtn {
          border: 1px solid @borderColor;
          color: @titleFontColor;
        }
        .sureBtn {
          background-color: @strongRedColor;
          color: #fff;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        contentText: '确定要交班吗？',
        cancelBtnText: '取消',
        sureBtnText: '确定'
      };
    },
    props:{
      content:String,
      cancelText:String,
      sureText:String,
      type:String,
    },
    created(){
      this.content && (this.contentText = this.content);
      this.cancelText && (this.cancelBtnText = this.cancelText);
      this.sureText && (this.sureBtnText = this.sureText);
    },
    methods: {
      cancelHandler(){
        if(this.type){
          this.$emit('confirm',[false,this.type]);
        }else{
          this.$emit('confirm',false);
        }
      },
      sureHandler(){
        if(this.type){
          this.$emit('confirm',[true,this.type]);
        }else{
          this.$emit('confirm',true);
        }
      }
    }
  };

</script>
