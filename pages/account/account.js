Page({
  data: {
    selfFlag:true,
    expressFlag:false,
    userAddress:{},
    goods: [],
    totalPrice: 0
  },

  onLoad(options) {
    this.setData({
      goods: JSON.parse(options.goods)
    })

    this.calcPrice()
  },

  onShow() {
    let pages = getCurrentPages();
    let address = pages[pages.length-1].data.address;
    if(address){
      this.setData({
        userAddress: JSON.parse(address)
      })
    }else{
      //调用云函数getUserByOpenid
      wx.cloud.callFunction({
        name:'getUserByOpenid'
      })
      .then(res => {
        let address = res.result.data[0].address
        let i = address.findIndex(item => item.default == true)

        this.setData({
          userAddress: address[i]
        })
        console.log("根据openid获取用户收货地址成功",res)
    
      })
      .catch(err => {
        console.log("根据openid获取用户收货地址失败",err)
      })
    }
  },

  calcPrice(){
    this.data.goods.forEach(i => {
      this.data.totalPrice += i.flower.price * i.num
    })

    this.setData({
      totalPrice: this.data.totalPrice
    })
  },

  //跳转到管理我的收货地址页面
  jumpToAddress(){
    wx.navigateTo({
      url: '../manageAddress/manageAddress?canClick=1',
    })
  },

  //上门自提
  getByself(){
    this.setData({
      selfFlag:true,
      expressFlag:false
    })
  },

  //快递配送
  expressDistribution(){
    this.setData({
      selfFlag:false,
      expressFlag:true
    })
  }
})