<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/shopGoods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopRatings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopInfo" replace>商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  // 商家信息头
    import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'

    export default{
        data: function () {
            return {}
        },
        mounted:function () {
          this.$store.dispatch('getShopInfo')
          this.$store.dispatch('getShopRatings')
          this.$store.dispatch('getShopGoods')
        },
        props: {},
        components: {ShopHeader},
        templates: {}
    }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .tab{
    height: 40px;
    line-height: 40px;
    background: #fff;
    @include bottom-border-1px(rgba(7, 17, 27, 0.1));
    .tab-item{
      float: left;
      width: 33.33333%;
      text-align: center;
      font-size: 14px;
      color: rgb(77, 85, 93);
      a{
        display: block;
        position: relative;
        &.router-link-active{
          color: #02a774;
          &::after{
            content: '';
            position: absolute;
            left: 50%;
            bottom: 1px;
            width: 35px;
            height: 2px;
            transform: translateX(-50%);
            background: #02a774;
          }
        }
      }
    }

  }
</style>
