App({  
  globalData: {
    collectionChangedFlag: false
  },
  onLaunch() {
    //初始化云环境
    wx.cloud.init({
      env:'sunflower-6gmfgx6k7bff4a27'
    })
  }

})
