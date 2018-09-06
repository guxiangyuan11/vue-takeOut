// 路由器对象
import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'// 订单组件页面组件
import Profile from '../pages/Profile/Profile.vue'// 个人页面
import Login from '../pages/Login/Login.vue'// 登陆页面
import Shop from '../pages/Shop/Shop.vue'// 商家页面
import ShopRatings from '../pages/Shop/ShopGoods/ShopRatings.vue'// 评价页面
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'// 商品页面
import ShopInfo from '../pages/Shop/ShopGoods/ShopInfo.vue'// 商家信息页面

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/shop',
      component: Shop,
      meta: {
        showFooter: false
      },
      children: [
        {
          path: 'shopGoods',
          component: ShopGoods
        },
        {
          path: 'shopRatings',
          component: ShopRatings
        },
        {
          path: 'shopInfo',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/shopGoods'
        }
      ]
    }
  ]
})
