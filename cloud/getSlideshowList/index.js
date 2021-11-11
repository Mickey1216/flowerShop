// 云函数入口文件
const cloud = require('wx-server-sdk')

//目的：如果有多个云环境时，会出现一些bug，用这个初始化则不会出现bug
cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('slideshow')
    .get()
}