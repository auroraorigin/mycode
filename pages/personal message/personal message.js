Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    textmess:"",//编辑框同步内容
    content: "",//姓名
    content1: "",//手机号
    content5: "",//微信号
    content7: "",//详细地址
    tag: "",
    date:'',//日期
    region: ['','',''],//地区
    sex:['暂不选择','男','女'],//性别
    customItem:'请选择',//地区选择器的第一行
    ch: [{
      id: 0,
      title: ""
    }, ],
    Id:[{
      id:""
    },]
  },
  //弹框功能
  ShowModal: function (e) {
    //获取设置id属性
    var ID = e.currentTarget.dataset.id;
    var da = this.data.Id;
    da.id=ID;
    var data = this.data.ch;
    var i = data.length;
    //弹框标题
    data[i - 1].title = e.currentTarget.dataset.title;
    //编辑框弹出显示已保存内容
    switch (da.id) {
      case "0":
        this.setData({
          modalHidden: !this.data.modalHidden,
          ch: data,
          textmess:this.data.content
        });
        break;
      case "1":
        this.setData({
          modalHidden: !this.data.modalHidden,
          ch: data,
          textmess: this.data.content1
        });
        break;
      case "5":
        this.setData({
          modalHidden: !this.data.modalHidden,
          ch: data,
          textmess: this.data.content5
        });
        break;
      case "7":
        this.setData({
          modalHidden: !this.data.modalHidden,
          ch: data,
          textmess: this.data.content7
        });
        break;
    }
  },
  //确定model
  modalBindconfirm: function (e) {
    var da=this.data.Id;
    //确定后修改本地内容为编辑内容
    switch (da.id) {
      case "0":
        this.setData({
          modalHidden: !this.data.modalHidden,
          content: this.data.tag
        });
        break;
      case "1":
        this.setData({
          modalHidden: !this.data.modalHidden,
          content1: this.data.tag
        });
        break;
      case "5":
        this.setData({
          modalHidden: !this.data.modalHidden,
          content5: this.data.tag
        });
        break;
      case "7":
        this.setData({
          modalHidden: !this.data.modalHidden,
          content7: this.data.tag
        });
        break;
    }
    wx.showToast({
      title: '修改成功',
      duration: 1000,
      mask: true,
      icon: 'success',
      success: function () { },
      fail: function () { },
      complete: function (){}
    })
  },
  //取消model
  modalBindcancel: function (e) {
    var da = this.data.Id;
    //取消修改则本地内容不变，不与编辑框同步
    switch (da.id) {
      case "0":
          this.setData({
            modalHidden: !this.data.modalHidden,
            content: this.data.content,
            textmess: this.data.tag,
            tag: this.data.content,
          });
        break;
      case "1":
        this.setData({
          modalHidden: !this.data.modalHidden,
          content1: this.data.content1,
          textmess: this.data.tag,
          tag: this.data.content1,
        });
        break;
      case "5":
        this.setData({
          modalHidden: !this.data.modalHidden,
          content5: this.data.content5,
          textmess: this.data.tag,
          tag: this.data.content5,
        });
        break;
      case "7":
        this.setData({
          modalHidden: !this.data.modalHidden,
          content7: this.data.content7,
          textmess: this.data.tag,
          tag: this.data.content7,
        });
        break;
      }
  },
  //同步编辑框
  settext(e) {
    this.setData({
      tag: e.detail.value
    });
  },
  //普通选择器
  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value
    }),
    wx.showToast({
      title: '修改成功',
      duration: 1000,
      mask: true,
      icon: 'success',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  //日期选择器
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    }),
      wx.showToast({
        title: '修改成功',
        duration: 1000,
        mask: true,
        icon: 'success',
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
  },
  //地区选择器
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    }),
      wx.showToast({
        title: '修改成功',
        duration: 1000,
        mask: true,
        icon: 'success',
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
  },
  //跳转到收货地址
  jumpToHarvestAddress:function(e){
    wx.navigateTo({
      url: '/pages/harvest address/harvest address',
    })
  },
})