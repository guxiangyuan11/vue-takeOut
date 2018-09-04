// 接口函数
// 函数返回promise对象
import ajax from './ajax'
// const BASE_HTTP = 'http://localhost:4000'
const BASE_HTTP = '/api'
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_HTTP}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(`${BASE_HTTP}/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) => ajax(`${BASE_HTTP}/shops`, {latitude, longitude})
// 4、根据经纬度和关键字搜索商铺列表
// export const reqFoodTypes = () => ajax(`/index_category`)
// 5、获取一次性验证码
// export const reqFoodTypes = () => ajax(`/index_category`)
// 6、用户名密码登陆
// export const reqFoodTypes = () => ajax(`/index_category`)
// 7、发送短信验证码
// export const reqFoodTypes = () => ajax(`/index_category`)
// 8、手机号验证码登陆
// export const reqFoodTypes = () => ajax(`/index_category`)
// 9、根据会话获取用户信息
// export const reqFoodTypes = () => ajax(`/index_category`)
// 10、用户登出
// export const reqFoodTypes = () => ajax(`/index_category`)
