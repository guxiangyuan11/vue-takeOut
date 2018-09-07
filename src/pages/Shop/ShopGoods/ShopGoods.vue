<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--这里使用currentIndex计算属性来对current做处理-->
          <li class="menu-item" v-for="(good,index) in goods" :key="index"
              :class="{current:index === currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
            {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">

        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index" v-if="good.foods">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc" v-if="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartControl :food="food"></cartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="currentFood" ref="food"></Food>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import cartControl from '../../../components/cartControl/cartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'

    export default{
        data: function () {
            return {
              scrollY: 0, // 右侧滑动的Y轴坐标
              tops: [], // 右侧所有标题的top数组
              currentFood:null
            }
        },
        mounted:function () {
          this.$store.dispatch('getShopGoods', () => {
              this.$nextTick(() => { // 列表DOM第一次更新
                this._initScroll()
                this._initTops()
              })
          })
        },
        computed: {
          ...mapState(['goods']),
          currentIndex:function () {
            let {scrollY, tops} = this;
            const index = tops.findIndex((top, index) =>{
                top === scrollY
              if(scrollY>=top && index===tops.length-1){
                    return true;
              }
              if(scrollY>=top && scrollY<tops[index+1]){
                  return true
              }
            })
            return index
          }
        },
        methods:{
            // 初始化滚动条
            _initScroll(){
              let menuScroll = new BScroll('.menu-wrapper', {
                  click: true
              })
              this.foodsScroll = new BScroll('.foods-wrapper', {
                probeType: 2, // 惯性滑动不会触发
                click: true
              })
              this.foodsScroll.on('scroll', ({x, y})=>{ // 监听右侧滚动事件
//                    console.log(x,y)
                this.scrollY = Math.abs(y)
              })
              this.foodsScroll.on('scrollEnd', ({x, y})=>{ // 监听右侧滚动事件
//                    console.log(x,y)
                this.scrollY = Math.abs(y)
              })
            },
            // 收集top数组
            _initTops:function () {
                // 获取目标li
              let tops = []
              let top = 0;
              tops.push(top)
              const lis = this.$refs.foodsUl.children
              // 把DOM伪数组转换成真数组，然后遍历
              Array.prototype.slice.call(lis).forEach((t,index) =>{
                top += t.clientHeight
                tops.push(top)
              })
              this.tops = tops;
            },
            // 点击左侧item，然后根据下标来索引右侧需要滚动到的位置
            clickMenuItem(_index){
              const y = this.tops[_index]
              this.scrollY = y // 使点击左侧的按钮后立即生效，使按钮变白
              this.foodsScroll.scrollTo(0, -y, 500)
            },
            showFood(food){
              this.currentFood = food
              // 通过$refs访问子组件里面的函数
              this.$refs.food.toggleShow()
            }
        },
        props: {},
        components: {
          cartControl,
          Food,
          ShopCart
        },
        templates: {}
    }
</script>

<style lang="scss">
@import '../../../common/scss/mixins';
.goods{
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item{
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      &.current{
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;
        .text{
//        @include border-none();
        }
      }
      .icon{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }
      .text{
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        @include bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }
  .foods-wrapper{
    flex: 1;
    .title{
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item{
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include bottom-border-1px(rgba(7, 17, 27, 0.1));
      &:last-child{
//      @include border-none();
        margin-bottom: 0;
      }
      .icon{
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content{
        flex: 1;
        .name{
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc, .extra{
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc{
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra{
          .count{
            margin-right: 12px
          }
        }
        .price{
          font-weight: 700;
          line-height: 24px;
          .now{
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old{
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper{
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
