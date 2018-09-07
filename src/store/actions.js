/*
* 通过commit来通知mutations更新state对象
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserinfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods
} from '../api/index'
export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    const geoHash = state.latitude + ',' + state.longitude
    // 发送异步请求
    const result = await reqAddress(geoHash)
    if (result.code === 0) { // 判断是否是正确返回
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取食品分类
  async getCategorys ({commit}) {
    // 发送异步请求
    const result = await reqFoodCategorys()
    if (result.code === 0) { // 判断是否是正确返回
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取商品列表
  async getShops ({commit, state}) {
    // 发送异步请求
    const {latitude, longitude} = state
    const result = await reqShops(latitude, longitude)
    if (result.code === 0) { // 判断是否是正确返回
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 同步获取用户，由于已经从登陆界面获取了用户信息所以用同步来设置用户信息
  setShops ({commit, state}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步获取用户信息
  async getUserInfo ({commit, state}) {
    // 发送异步请求
    const result = await reqUserinfo()
    if (result.code === 0) { // 判断是否是正确返回
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 异步登出
  async logout ({commit, state}) {
    // 发送异步请求
    const result = await reqLogout()
    if (result.code === 0) { // 判断是否是正确返回
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      console.log(result)
      commit(RECEIVE_INFO, {info})
    }
  },
  // 异步获取商家评价列表
  async getShopRatings ({commit}) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },
  // 异步获取商家商品列表
  async getShopGoods ({commit}, cb) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      if (cb) cb() // 当数据获取到后进行回调
    }
  },
  updateFoodCount ({commit}, {food, _flag}) {
    if (_flag) {
      commit(DECREMENT_FOOD_COUNT, {food})
    } else {
      commit(INCREMENT_FOOD_COUNT, {food})
    }
  }
}
