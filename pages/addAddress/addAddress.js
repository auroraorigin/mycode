// pages/addAddress/addAddress.js
import WxValidate from '../../utils/WxValidate/WxValidate.js';
//开发者可以通过 getApp 方法获取到全局唯一的 App 示例，获取App上的数据或调用开发者注册在 App 上的函数。
const app = getApp()
var region_name = [];
var addressList = null
Page({

  data: {
    region: '', //地区
    region_all: '',//地区显示
    detail_address: '', //详细地址
    consignee_name: '',//收货人
    mobile_number: '',//手机号码
  },
  //获取地区选择器
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
    })
    this.data.region_all = this.data.region[0] + this.data.region[1] + this.data.region[2];
    this.setData({
      region_all: this.data.region_all
    })
  },
  //获取微信定位
  getLocation() {
    var _this = this;
    wx.chooseLocation({
      success: function(res) {
        var address = res.address
        _this.setData({
          detail_address: address
        })
      },
    })
  },
  //不符合要求弹框
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //保存按钮
  saveAddress(e) {
    //保存判断
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.submitInfo(params);
    console.log(e);
    //获取输入框输入内容
    var consignee = e.detail.value.consignee;
    var mobile = e.detail.value.mobile;
    var region_name = e.detail.value.region_name[0] + e.detail.value.region_name[1] + e.detail.value.region_name[2];
    var detail_address = e.detail.value.detail_address;
    //获取缓存中的地址列表
    var arr = wx.getStorageSync('addressList') || [];
    //新增地址页面内容赋值给addressList对象
    addressList = {
      consignee: consignee,
      mobile: mobile,
      region_name: region_name,
      detail_address: detail_address
    }
    //再次获取缓存中的地址列表
    var array = wx.getStorageSync('addressList')
    //判断标志
    var flag = 1;
    //与已存在的地址进行判断，重复则不添加
    for (var i = 0; i < array.length; i++) {
      if (addressList.consignee == array[i].consignee && addressList.mobile == array[i].mobile && addressList.detail_address == array[i].detail_address && addressList.region_name == array[i].region_name) {
        flag = 0;
      } else {
        flag = 1;
      }
    }
    if (flag == 1)
      arr.push(addressList);
    //编辑地址页面
    var changeaddress = wx.getStorageSync("changeaddress")
    if (changeaddress) {
      var addressList = wx.getStorageSync("addressList");
      //将修改内容写入地址列表
      addressList[changeaddress.id].consignee = e.detail.value.consignee;
      addressList[changeaddress.id].detail_address = e.detail.value.detail_address;
      addressList[changeaddress.id].mobile = e.detail.value.mobile;
      addressList[changeaddress.id].region_name = this.data.region_all;
      //将修改好的内容放进缓存
      wx.setStorageSync("addressList", addressList)
      //获取默认地址
      var default_address = wx.getStorageSync('default_address')
      //点击编辑进入设置默认地址
      if (changeaddress.consignee == default_address.consignee && changeaddress.mobile == default_address.mobi1 && changeaddress.region_name == default_address.region_name && changeaddress.detail_address == default_address.detail_address) {
        default_address.consignee = e.detail.value.consignee;
        default_address.mobile = e.detail.value.mobile;
        default_address.region_name = this.data.region_all;
        default_address.detail_address = e.detail.value.detail_address;
      }
      //将默认地址放进缓存
      wx.setStorageSync('default_address', default_address)
      //延迟返回
      setTimeout(function() {
        wx.navigateBack({ //返回

        })

      }, 1000);
    } else {
      wx.setStorageSync('addressList', arr);
      setTimeout(function() {
        wx.navigateBack({ //返回

        })

      }, 1000);
    }
    //返回时将编辑缓存清空
    var changeaddress = wx.getStorageSync("changeaddress");
    var list_null = null;
    wx.setStorageSync("changeaddress", list_null)
  },
//表单提交成功
  submitInfo(params) {
    // form提交
    let form = params;
    wx.showToast({
      title: '保存成功！',
    })
  },
  //设置默认地址
  defaultAddress(e) {
    //点击编辑，若不做修改，则编辑缓存即为默认地址缓存
    var default_address = wx.getStorageSync('changeaddress');
    wx.setStorageSync('default_address', default_address);
    addressList = wx.getStorageSync('addressList');
    //将地址列表与默认列表相同的地址内容设置默认激活标志
    for (var i = 0; i < addressList.length; i++) {
      addressList[i].isActive = false;
      if (addressList[i].consignee == default_address.consignee && addressList[i].detail_address == default_address.detail_address && addressList[i].mobile == default_address.mobile && addressList[i].region_name == default_address.region_name)
        addressList[i].isActive = true;
    }
    //将默认地址显示在列表头
    addressList[default_address.id] = addressList[0];
    addressList[0] = default_address;
    addressList[0].isActive = true;
    wx.setStorageSync('addressList', addressList);
    wx.showToast({
      title: '设置成功！',
    })
    setTimeout(function() {
      wx.navigateBack({ //返回

      })

    }, 1000);
  },

  onLoad: function(options) {
    this.initValidate();
  },
  //表单验证
  initValidate() {
    const rules = {
      consignee: {
        required: true,
        rangelength: [2, 4]
      },
      mobile: {
        required: true,
        digits: true,
        tel: true
      },
      region_name: {
        required: false,
        region_name: false,
      },
      detail_address: {
        required: true,
        maxlength: 60
      },
    }
    //验证字段提示信息
    const messages = {
      consignee: {
        required: '请输入姓名',
        rangelength: '请输入正确姓名！'
      },
      mobile: {
        required: '请输入手机号',
        digits: '请输入正确手机号!',
        rangelength: '请输入正确手机号!'
      },
      region_name: {
        required: '请选择地区',
        region_name: '请选择正确地区',
      },
      detail_address: {
        required: '请输入详细地址',
        maxlength: '请输入正确详细地址'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  onShow() {
    //页面刷新马上获取编辑缓存
    let changeaddress = wx.getStorageSync('changeaddress')
    //如果编辑缓存存在，更新地址列表
    if (changeaddress) {
      this.data.consignee_name = changeaddress.consignee;
      this.data.mobile_number = changeaddress.mobile;
      this.data.region_all = changeaddress.region_name;
      this.data.detail_address = changeaddress.detail_address;
      this.setData({
        region_all: this.data.region_all,
        consignee_name: this.data.consignee_name,
        mobile_number: this.data.mobile_number,
        detail_address: this.data.detail_address
      })
      region_name = this.data.region_all;
    }
    //返回标志，放入缓存，若点击左上角返回，设置为true
    wx.setStorageSync('aShow', true)
  }
})