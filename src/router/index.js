// 路由器对象
import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'// 订单组件页面组件
import Profile from '../pages/Profile/Profile.vue'// 个人页面

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/msite',
      component: Msite
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    }
  ]
})
