/*
* 通过commit来通知mutations更新state对象
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops
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
  }
}
