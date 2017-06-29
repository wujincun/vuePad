<template>
  <div id="orderInventory">
    <ul class="dishList">
      <li class="dishItem" v-for="item in detailData.list">
        <span class="name">{{item.goodstitle}}({{item.goodsunitname}})</span>
        <span class="name">X{{item.total}}</span>
        <span class="name">{{item.sale_price}}</span>
      </li>
    </ul>

  </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {};
    },
    props:{
      detailData:{
        type:Object
      }
    }
  };

</script>
