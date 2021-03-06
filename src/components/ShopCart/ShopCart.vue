<template>
  <div>
  <div class="shopcart">
    <div class="content" >
      <div class="content-left" @click="showCartList">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:totalCount}">
            <i class="iconfont icon-shopping_cart" :class="{highlight:totalCount}"></i>
          </div>
          <div class="num" v-if="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
      </div>
      <div class="content-right">
        <div class="pay not-enough" :class="(info.minPrice-totalPrice)>0 ?'not-enough':'enough'">
          {{payText}}
        </div>
      </div>
    </div>
    <transition name="swipe">
      <div class="shopcart-list" v-show="showList && cartFoods.length>0">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, index) in cartFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

  </div>
    <transition name="fade">
      <div class="list-mask" v-show="showList && cartFoods.length>0" @click="showCartList"></div>
    </transition>
  </div>

</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import cartControl from '../../components/cartControl/cartControl.vue'
  import BScroll from 'better-scroll'
  import { MessageBox, Toast } from 'mint-ui'

  export default{
    data: function () {
      return {
        showList: false
      }
    },
    computed: {
      ...mapState(['cartFoods' ,'info']),
      ...mapGetters(['totalCount', 'totalPrice']),
      payText(){
          let {info, totalPrice} = this
          let price = info.minPrice // 最少需要多少钱才能配送
          if(totalPrice===0){
            this.showList = false
            return `￥${price} 起送`
          } else if(price > totalPrice) {
            return `还差￥${price-totalPrice} 配送`
          } else {
              return '请下单'
          }
      }
    },
    watch:{
      showList: function (value) {
        if(value){
            this.$nextTick(() => {
              if(!this.scroll){
                this.scroll = new BScroll('.list-content', {
                  click: true
                })
              } else {
                this.scroll.refresh() // 刷新滚动，重新计算DOM高度
              }
            })
        }
      }
    },
    methods:{
      showCartList(){ // 打開列表
        if(this.totalCount>0){
          this.showList = !this.showList
        }
      },
      clearCart() { // 清空列表
        MessageBox.confirm('确清空购物列表吗?').then(action => {
          // 确定回调
          this.$store.dispatch('clearCart')
          Toast({
            message: '清空成功',
            position: 'bottom',
            duration: 3000
          });
        }).catch(err => { // 取消回调
        });
      }
    },
    components: {
      cartControl
    },
    templates: {}
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      .content-left{
        flex: 1;
        .logo-wrapper{
          display: inline-block;
          vertical-align: top;
          position: relative;
          top :-10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.highlight{
              background: $green;
            }
            .icon-shopping_cart{
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight{
                color: #fff;
              }
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #ffffff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price{
          display: inline-block;
          vertical-align: top;
          margin-top: 5px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing :border-box;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          &.highlight{
            color: #fff;
          }
        }
        .desc{
          display: inline-block;
          vertical-align: bottom;
          margin-bottom: 15px;
          margin-left: -45px;
          font-size: 10px;
        }
      }
      .content-right{
        flex: 0 0 105px;
        width: 105px;
        .pay{
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          &.not-enough{
            background: #2b333b;
          }
          &.enough{
            background: #00b43c;
            color: #fff;
          }

        }
      }
    }
    .ball-container{
      .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $green;
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list{
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translateY(-100%);
      &.swipe-enter-active, &.swipe-leave-active{
        transition: transform .3s;
      }
      &.swipe-enter, &.swipe-leave-to{
        transform :translateY(0);
      }
      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title{
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content{
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food{
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          @include bottom-border-1px(rgba(7, 17, 27, 0.1));
          .name{
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price{
            position :absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size:14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom: 6px;
          }

        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
    &.fade-enter-active, &.fade-leave-active{
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-to{
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
</style>
