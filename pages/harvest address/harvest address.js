import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],//地址列表
  },
  /*
  1 获取用户的收货地址
    1 绑定点击事件
    2 调用小程序内置api 获取用户的收货地址 wx.chooseAddress

  2 获取 用户对小程序所授予获取地址的权限 状态 scope
    1 假设用户点击获取收货地址的提示框 确定 authSetting scope.address
    scope 值 true 直接调用 获取收货地址
    2 假设用户从来没有调用过收货地址的api
    scope undefined 直接调用 获取收货地址
    3 假设用户点击获取收货地址的提示框 取消
    scope 值 false
      1 诱导用户自己打开授权设置页面（wx.openSetting）当用户重新结予获取地址权限的时候
      2 获取收货地址
    4 把获取到的收货地址 存入到 本地存储中
  3 页面加载完毕
    1 获取本地存储中的收货地址数据
    2 把数据 设置给data中的一个变量
   */
  //点击获取收货地址
  async getAddress() {
    try {
      //1 获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //2 判断权限状态
      if (scopeAddress === true || scopeAddress === undefined) {
        //3 调用获取收货地址的api
        let address = await chooseAddress();
        address.region = address.provinceName + address.cityName + address.countyName;
        address.detail_address = address.detailInfo;
        address.consignee = address.userName;
        address.mobile = address.telNumber;
        var creatArr = [];
        //将获取到的值放入obj对象中
        var obj = {};
        obj.consignee = address.consignee;
        obj.detail_address = address.detail_address;
        obj.mobile = address.mobile;
        obj.region_name = address.region;
        //将obj对象拼接进creatArr数组
        creatArr.push(obj);
        //4 存入到缓存中
        wx.setStorageSync("wechat_address", creatArr);
        var wechat_address = wx.getStorageSync('wechat_address');
        //过渡数组
        var addressList2 = wx.getStorageSync('addressList2');
        var array = wx.getStorageSync('addressList') || [];
        wx.setStorageSync("array", array)
        var flag = 1;
        //判断是否与原地址有重复
        for (var i = 0; i < array.length; i++) {
          if (wechat_address[0].consignee == array[i].consignee && wechat_address[0].mobile == array[i].mobile && wechat_address[0].detail_address == array[i].detail_address && wechat_address[0].region_name == array[i].region_name) {
            flag = 0;
            console.log("未拼接")
          }
        }
        if (flag == 1) {
          array = array.concat(wechat_address);
          console.log("已拼接")
        }
        wx.setStorageSync("wechat_address", wechat_address);
        wx.setStorageSync("addressList2", array);
        wx.setStorageSync("addressList", array);
      } else {
        //3 先诱导用户打开授权页面
        await openSetting();
        //4 调用获取收货地址的api
      }
    } catch (error) {
      console.log(error);
    }
  },
  //获取权限状态
  addAddress() {
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },
  //删除
  delItem: function(e) {
    //获取列表中要删除项的下标
    var index = e.currentTarget.dataset.index;
    var list = this.data.addressList;
    var default_address = wx.getStorageSync('default_address');
    //如果要删除的地址是默认地址
    if (default_address.consignee == list[index].consignee && default_address.mobile == list[index].mobile && default_address.region_name == list[index].region_name && default_address.detail_address == list[index].detail_address) {
      if (list.length ==1) {
        wx.removeStorageSync('default_address')
      }
      if(list.length>1)
        {
        list[1].isActive = true;
        wx.removeStorageSync('default_address');
        wx.setStorageSync('default_address', list[1]);
        }
    }
    //移除列表中下标为index的项
    list.splice(index, 1);
    wx.setStorageSync("addressList", list);
    //更新列表的状态
    this.setData({
      addressList: list
    });
  },
  //编辑地址
  ref: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.addressList[index].id = index;
    this.setData(
      this.data.addressList[index].id
    )
    var list = this.data.addressList;
    wx.setStorageSync("changeaddress", list[index]);
    wx.navigateTo({
      url: '../../pages/addAddress/addAddress'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
    //1 获取缓存中的收货地址信息
    var addressList = wx.getStorageSync('addressList') || [];
    //如果列表长度为1，直接设置为默认地址
    if(addressList.length==1)
    {
      addressList[0].isActive=true;
    }
    wx.setStorageSync('addressList', addressList);
    //2 给data赋值
    this.setData({
      addressList: addressList
    })
    //如果点击左上角返回，情况编辑缓存和标志
    let aShow = wx.getStorageSync("aShow");
    if (aShow) {
      wx.removeStorageSync('changeaddress');
      wx.removeStorageSync('aShow');
    }
    wx.removeStorageSync('array');
    wx.removeStorageSync('addressList2');
  },
  onLoad() {
    var arr = wx.getStorageSync('addressList') || [];
    this.setData({
      addressList: arr
    })
  }
})