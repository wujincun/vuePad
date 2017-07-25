<template>
  <div id="fail">
    <div class="noContent">
      <i class="failIcon icon"></i>
      <div class="text" @click="reloadPage">加载失败，点击重新加载</div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  #fail{
    .failIcon{
      background: url("../../common/img/ic_cry.png") center center no-repeat;
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {};
    },
    methods:{
      reloadPage(){
        this.$emit('reloadPage')
      }
    }
  };

</script>
