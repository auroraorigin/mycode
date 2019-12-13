Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{}
  },
  handleGetUserInfo(e){
   // console.log(e)
   const {userInfo}=e.detail;
   wx.setStorageSync("userinfo", userInfo);
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    })
  }
})