<template>
    <div id="leftNav">
      <a class="leftNavItem active">
        <i class="leftBar_tangdian"></i>
        <span>堂点</span>
      </a>
      <a class="leftNavItem">
        <i class="leftBar_paidui"></i>
        <span>排队</span>
      </a>
      <a class="leftNavItem">
        <i class="leftBar_yuding"></i>
        <span>预订</span>
      </a>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/style/common.less";
  /*#leftNav{
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
        border-left: 3px solid rgba(255,255,255,0.6);
      }
      i{
        display: inline-block;
        height: 22px;
        width: 22px;
        background-size: 22px 22px;
        vertical-align: middle;
        &.leftBar_tangdian{
          .bg-image('leftBar_tangdian')
        }
        &.leftBar_paidui{
          .bg-image('leftBar_paidui')
        }
        &.leftBar_yuding{
          .bg-image('leftBar_yuding')
        }
        &.leftBar_jiaojieban{
          .bg-image('leftBar_jiaojieban')
        }
        &.leftBar_kuaisushoukuan{
          .bg-image('leftBar_kuaisushoukuan')
        }
        &.leftBar_dingdanguanli{
          .bg-image('leftBar_dingdanguanli')
        }
        &.leftBar_quanbu{
          .bg-image('leftBar_quanbu')
        }
      }
    }
  }*/
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
