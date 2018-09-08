// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import {Button} from 'mint-ui'
import './mock/mockSever' // 加载mock模拟数据
import './filters' // 加载过滤器
import loading from './common/imgs/loading.gif'
// 全局注册组件
Vue.component(Button.name, Button)
// Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
