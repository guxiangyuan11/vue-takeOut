<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  // import {RECEIVE_ADDRESS} from './store/mutation-types'

  export default {
    name: 'App',
    mounted () {
        this.getAddress()
        this.getUserInfo()
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    },
    components: {
      FooterGuide
    }
  }
</script>

<style lang="scss">
  #app{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: relative;
  }
</style>
