import Vue from 'vue'
import format from 'date-fns/format'
// import moment from 'moment'

// 自定义
Vue.filter('data-format', (value, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  // return format(value).format(formatStr)
  return format(value, formatStr)
})
