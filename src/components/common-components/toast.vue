<template>
  <div id="toast">
    <div class="content">{{contentText}}</div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  #toast{
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
    .content{
      background-color: #fff;
      padding: 30px 50px;
      border-radius: 8px;
      font-size: 20px;
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        contentText: "请求已发送"
      };
    },
    props: {
      content:String
    },
    created(){
      this.content && (this.contentText = this.content)
    }
  };

</script>
