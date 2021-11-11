let type = '' //全局变量 花类型
Page({
  data: {
    currentIndex: 0,
    types:['多肉','室内观植','鲜切花','盆栽花','花的周边'],  //花类型
    flowerList:[] //花列表
  },

  onLoad() {
    //默认加载多肉类的花列表
    wx.cloud.callFunction({
      name:'getFlowerListByType',
      data:{
        type:'多肉'
      }
    })
    .then(res => {
      console.log("根据花类型获取花列表成功",res)
      this.setData({
        flowerList:res.result.data
      })
    })
    .catch(err => {
      console.log("根据花类型获取花列表成功",err)
    })
  },

  //根据类型获取花列表
  getFlowerListByType(e){
    type = this.data.types[e.currentTarget.dataset.index]
    this.setData({
      currentIndex:e.currentTarget.dataset.index
    })
    
    wx.cloud.callFunction({
      name:'getFlowerListByType',
      data:{
        type:type
      }
    })
    .then(res => {
      console.log("根据花类型获取花列表成功",res)
      this.setData({
        flowerList:res.result.data
      })
    })
    .catch(err => {
      console.log("根据花类型获取花列表成功",err)
    })
  },

  //跳转到花的详情页
  jumpToFlowerDetail(e){
    wx.navigateTo({
      url: '/pages/flowerDetail/flowerDetail?id=' + e.currentTarget.dataset.item._id,
    })
  }

})