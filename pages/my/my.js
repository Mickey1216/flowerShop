let app = getApp()

Page({
  data: {
    avatarUrl:'',
    nickName:'',
    collectionNum:0
  },

  onLoad (options) {
    //调用云函数getUserByOpenid去拿到用户的collection属性
    wx.cloud.callFunction({
      name:"getUserByOpenid"
    })
    .then(res => {
      console.log('获取收藏数量成功',res)

      this.setData({
        collectionNum:res.result.data[0].collection.length
      })
    
    })
    .catch(err => {
      console.log("获取收藏数量失败",err)
    })

    wx.getUserInfo({
      success:(res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName:res.userInfo.nickName
        })
      }
    })

    //退出小程序
    wx.getSystemInfo({
      success: (res) => {
        if(res.SDKVersion>="2.1.0"){
          this.setData({
            exitApp:true//data中的初始化变量 
          })
        }
      }
    })


  },

  //跳转到收藏页面
  jumpToCollect(){
    wx.navigateTo({
      url: '../collect/collect',
    })
  },

  //跳转到添加收获地址页面
  jumpToAddress(){
    wx.navigateTo({
      url: '../manageAddress/manageAddress',
    })
  },

  //打电话功能
  call(){
    wx.makePhoneCall({
      phoneNumber: '18181599195',
    })
  },

  //跳转到关于页面
  jumpToAbout(){
    wx.navigateTo({
      url: '../about/about',
    })
  },

  //退出登录
  logout(){
    wx.showModal({
      content: '确认要退出当前账号',
      success:(sm)=> {
        if (sm.confirm) {
          // 用户点击了确定 可以调用退出方法了
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShow(){
    //说明用户修改了收藏，需要更新一下收藏的显示数量
    if(app.globalData.collectionChangedFlag){
      //调用云函数getUserByOpenid去拿到用户的collection属性
      wx.cloud.callFunction({
        name:"getUserByOpenid"
      })
      .then(res => {
        console.log('用户修改了后更新收藏数量成功',res)

        this.setData({
          collectionNum:res.result.data[0].collection.length
        })
        
        //更新了收藏数量，更改需要更新收藏标志位为false
        app.globalData.collectionChangedFlag = false
      })
      .catch(err => {
        console.log("获取收藏数量失败",err)
      })
    } 
  }

})