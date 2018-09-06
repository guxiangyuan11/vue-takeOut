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
export const reqSearchShops = (keyword, geohash) => ajax(`${BASE_HTTP}/search_shops`, {geohash, keyword})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax(`${BASE_HTTP}/captcha`)
// 6、用户名密码登陆
export const reqLoginPwd = (name, pwd, captcha) => ajax(`${BASE_HTTP}/login_pwd`, {
  name, // 用户名
  pwd, // 密码
  captcha // 图形验证码
}, 'POST')
// 7、发送短信验证码(模拟)
// export const reqSendcode = (phone) => ajax(`${BASE_HTTP}/sendcode`, {phone})
export const reqSendcode = (phone) => { return '112345' }
// 8、手机号验证码登陆
export const reqLoginSms = (phone, code) => ajax(`${BASE_HTTP}/login_sms`, {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserinfo = () => ajax(`${BASE_HTTP}/userinfo`)
// 10、用户登出
export const reqLogout = () => ajax(`${BASE_HTTP}/logout`)
/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')
/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')
/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
