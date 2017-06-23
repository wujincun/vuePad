<template>
    <div id="leftNav">
      <a class="leftNavItem">
        <i ></i>
        <span>堂点</span>
      </a>
      <a class="leftNavItem">
        <i></i>
        <span>排队</span>
      </a>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
  #leftNav{
    width: 140px;
    min-height: 100%;
    background-color: #3A3A59;
    .leftNavItem{
      display: block;
      height: 74px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      line-height: 74px;
      &.active{
        background-color: #54548c;
      }
    }
  }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>
