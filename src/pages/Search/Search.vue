<template>
  <div style="overflow: hidden">
    <section class="search">
      <HeaderTop :title="title"></HeaderTop>
      <form class="search_form" action="#" @submit.prevent="search">
        <input type="search" name="search" placeholder="请输入商家或美食名称"
               class="search_input" v-model="keyword">
        <input type="submit" name="submit" class="search_submit" >
      </form>
    </section>
    <section class="list" >
      <ul class="list_container" v-if="!noR">
        <router-link tag="li" :to="{path:'shop', query:{id: shop.id}}" class="list_li" v-for="(shop,index) in searchShops" :key="index">
          <section class="item_left">
            <img :src="`http://cangdu.org:8001/img/${shop.image_path}`"
                 class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{shop.name}}</span>
              </p>
              <p>月售 {{shop.recent_order_num}} 单</p>
              <p>{{shop.float_minimum_order_amount}} 元起送 / 距离 {{shop.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
      <div class="search_none" v-else>很抱歉！无搜索结果</div>
    </section>
  </div>
</template>

<script>
/***
   * 搜索页面组件
   */
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import {mapState} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'

export default{
  data: function () {
    return {
      title: '搜索',
      keyword:'',
      noR:false
    }
  },
  props: {},
  computed:{
    ...mapState(['searchShops'])
  },
  methods:{
    search() {
        const {keyword} = this;
        if(keyword){
            this.$store.dispatch('getSearchShops', keyword)
        }
    }
  },
  watch: {
    searchShops(value){
        if(value.length===0){
            this.noR=true
        } else {
            this.noR = false
        }
    }
  },
  components: {
    HeaderTop
  },
  templates: {}
}
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
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
  .search{
    width: 100%;
    overflow: hidden;
    .search_form{
      @include clearFix();
      margin-top: 45px;
      background-color: #fff;
      padding: 12px 8px;
      input{
        height: 35px;
        padding:0 4px;
        border-radius: 2px;
        font-weight: bold;
        outline: none;
        &.search_input{
          float: left;
          width: 79%;
          border: 4px solid #f2f2f2;
          font-size: 14px;
          color: #333;
          background-color: #f2f2f2;
        }
        &.search_submit{
          float: right;
          width: 18%;
          border: 4px solid #02a774;
          font-size: 16px;
          color: #fff;
          background-color: #02a774;
        }
      }
    }
  }
  .list{
    .list_container{
      background-color: #fff;
    }
    .list_li{
      display: flex;
      justify-content: center;
      padding: 10px;
      border-bottom: 1px solid $bc;
      .item_left{
        margin-right: 10px;
        .restaurant_img{
          width: 50px;
          height: 50px;
          display: block;
        }
      }
      .item_right{
        font-size: 12px;
        flex: 1;
        .item_right_text{
          p{
            line-height: 12px;
            margin-bottom: 6px;
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
  .search_none{
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
</style>
