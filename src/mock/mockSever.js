// 模拟数据
// 特殊模块，不需要对外暴露
import Mock from 'mockjs'
import data from './data.json'

// const data = require('data.json')
// goods列表接口
Mock.mock('/goods', {code: 0, data: data.goods})
// ratings接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 商家info接口
Mock.mock('/info', {code: 0, data: data.info})
