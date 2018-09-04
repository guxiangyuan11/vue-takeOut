/* eslint-disable no-unused-vars */
/*
 *  ajax 请求函数
 * */

/*
 * url： 请求链接
 * data：请求数据
 * type：请求类型
 * */
import axios from 'axios'
export default function (url, data = {}, type = 'GET') {
  // 直接返回一个promise对象
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = ''// 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    // 得到返回对象
    promise.then(function (res) { // 成功回调
      resolve(res.data)
    }).catch(function (err) { // 失败回调
      reject(err)
    })
  })
}
