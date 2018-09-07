/**
 * Created by Administrator on 2018/9/3 0003.
 */
export default {
  totalCount (state) { // 购物车中的总数量
    return state.cartFoods.reduce((total, food) => {
      return total + food.count
    }, 0)
  },
  totalPrice (state) { // 购物车中的总价格
    return state.cartFoods.reduce((total, food) => {
      return total + food.price * food.count
    }, 0)
  }
}
