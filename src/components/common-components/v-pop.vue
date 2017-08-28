<template>
  <div id="popWrap">
    <div class="popContainer">
      <div v-if="type == 'prompt'" class="title">{{title}}</div>
      <textarea v-if="type == 'prompt'" v-model="inputText" class="inputArea" name="" id="" placeholder="请填写拒绝理由，该理由将发给顾客（30字以内）"></textarea>
      <div v-if="type == 'confirm'" class="content">{{contentText}}</div>
      <div class="footBtns">
        <div class="cancelBtn" v-tap="{methods:cancelHandler}">{{cancelBtnText}}</div>
        <div class="sureBtn" v-tap="{methods:sureHandler}">{{sureBtnText}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/style/common.less";

  #popWrap {
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
      padding: 26px 30px 20px;
      width: 620px;
      background-color: #ffffff;
      border-radius: 8px;
      .title{
        color: @fontColor;
        line-height: 40px;
        text-align: center;
        font-size: 24px;
        margin-bottom: 8px;
      }
      .content {
        color: @fontColor;
        line-height: 40px;
        text-align: center;
        font-size: 24px;
        margin-top: 14px;
        margin-bottom: 10px;
      }
      .inputArea{
        height: 110px;
        width: 100%;
        margin-bottom: 25px;
        resize: none;
        border: 1px solid @borderColor;
        font-size: 20px;
        padding: 15px;
        box-sizing: border-box;
        outline: none;
        border-radius: 4px;
      }
      .footBtns {
        margin-top: 30px;
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
          border: 2px solid @borderColor;
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
        type:'confirm',//那种类型弹框，confirm，prompt
        title:'',
        content: '确定要交班吗？',
        cancelBtnText: '取消',
        sureBtnText: '确定',
        inputText:''//双向绑定输入内容
      };
    },
    props:{
      titleText:String,
      contentText:String,
      cancelText:String,
      sureText:String,
      btnType:String,//哪个按钮类型
      popType:String,//那种类型弹框，confirm，prompt
    },
    created(){
      this.popType && (this.type = this.popType);
      this.titleText && (this.title = this.titleText);
      this.contentText && (this.content = this.contentText);
      this.cancelText && (this.cancelBtnText = this.cancelText);
      this.sureText && (this.sureBtnText = this.sureText);
    },
    methods: {
      cancelHandler(){
        if(this.btnType){
          this.$emit('confirm',[false,this.btnType]);
        }else{
          this.$emit('confirm',false);
        }
      },
      sureHandler(){
        if(this.type == 'confirm'){
            this.$emit('confirm',true);
        }else if(this.type == 'prompt'){
            this.$emit('confirm',[true,this.inputText]);
        }
      }
    }
  };

</script>
