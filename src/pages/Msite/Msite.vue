<template>
  <section class="msite">
    <!--首页头部-->
    <!--<header class="header">
          <span class="header_search">
            <i class="iconfont icon-sousuo"></i>
          </span>
      <span class="header_title">
            <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
          </span>
      <span class="header_login">
            <span class="header_login_text">登录|注册</span>
      </span>
    </header>-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="header_search" to="/search">
            <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="header_login" :to="userInfo._id ? '/userInfo' : '/login'" >
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <!--有数据的时候-->
      <div class="swiper-container" v-if="categorysArr.length > 0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <!--没有数据的时候-->
      <img src="./images/msite_back.svg" alt="" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-new */
/**
 * 首页面组件
 */

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import {mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

export default{
  data: function () {
    return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
    }
  },
  props: {},
  mounted: function () {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  computed: {
    ...mapState(['address', 'categorys', 'userInfo']),
    categorysArr:function () {
      const {categorys} = this;
      let arr = [];
      let minArr = [];
      categorys.forEach((t,index) => {
        if(minArr.length === 8){ // 是否已经满了8个，满了就创建一个新的空数组
          minArr = [];
        }
        if(minArr.length === 0){ // 如果上面满足了8个，则把空的数组push进去
          arr.push(minArr)
        }
        minArr.push(t)
      });
      return arr
    }
  },
  watch: {
    categorys (value){
        // 当界面更新则立即更新视图
        this.$nextTick(() => { // 当DOM更新完后，就会立即调用tick
          new Swiper('.swiper-container', {
            loop: true,
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  templates: {}
}
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .msite{
    width: 100%;
    .header{
      background-color: #02a774;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 45px;
      .header_search{
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 10%;
        height: 50%;
        .icon-sousuo{
          font-size: 25px;
          color: #fff;
        }
      }
      .header_title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        color: #fff;
        text-align: center;
        .header_title_text{
          font-size: 20px;
          color: #fff;
          display: block;
        }
      }
      .header_login{
        font-size: 14px;
        color: #fff;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        .header_login_text{
          color: #fff;
        }
      }
    }
    .msite_nav{
        @include bottom-border-1px(#e4e4e4);
        margin-top: 45px;
        height: 200px;
        background: #fff;
      .swiper-container{
        width: 100%;
        height: 100%;
        .swiper-wrapper{
          width: 100%;
          height: 100%;
          .swiper-slide{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            .link_to_food{
              width: 25%;
              .food_container{
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                font-size: 0;
                img{
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                }
              }
              span{
                display: block;
                width: 100%;
                text-align: center;
                font-size: 13px;
                color: #666;
              }
            }
          }
        }
        .swiper-pagination{
          >span.swiper-pagination-bullet-active{
            background: #02a774;
          }
        }
      }
    }
    .msite_shop_list{
        @include top-border-1px(#e4e4e4);
        margin-top: 10px;
        background: #fff;
      .shop_header{
        padding: 10px 10px 0;
        .shop_icon{
          margin-left: 5px;
          color: #999;
        }
        .shop_header_title{
          color: #999;
          font-size: 14px;
          line-height: 20px;
        }
      }

    }
  }
</style>
