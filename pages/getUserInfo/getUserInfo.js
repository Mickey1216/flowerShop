const app = getApp()
Page({
  data: {
    //用户信息
    avatarUrl:'',
    nickName:'',
    openid:''
  },

  onLoad(options) {
    //调用云函数getOpenid获取用户的openid
    wx.cloud.callFunction({
      name:'getOpenid'
    })
    .then(res => {
      console.log("获取openid成功",res)
      this.setData({
        openid:res.result.openid
      })
    })
    .catch(err => {
      console.log("获取openid失败",err)
    })
  },

  //授权登录按钮 获取用户信息
  getUserInfo(e){
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("获取用户信息：",res)
        this.setData({
          avatarUrl:res.userInfo.avatarUrl,
          nickName:res.userInfo.nickName
        })
        
        //判断看数据库中是否已经有这个openid的用户没，存在则不存储
        //调用云函数getUserByOpenid查看数据库是否有该用户的信息
        wx.cloud.callFunction({
          name:'getUserByOpenid',
          data:{
            openid:this.data.openid
          }
        })
        .then(res => {
          let userNum = res.result.data.length 
          if(userNum == 0){
            //调用云函数saveUserInfo,将用户头像，用户名和openid存入user集合
            wx.cloud.callFunction({
              name:'saveUserInfo',
              data:{
                avatarUrl:this.data.avatarUrl,
                nickName:this.data.nickName,
                openid:app.globalData.openid
              }
            })
            .then(res => {
              console.log("存储成功",res);
            })
            .catch(err => {
              console.log("存储失败",err);
            })
          }
          console.log("根据openid获取用户成功",res)
        })
        .catch(err => {
          console.log("根据openid获取用户失败",err)
        })

        //用户允许登录后跳转到home首页
        wx.reLaunch({
          url: '../home/home',
        })
      }
    })
  },

})