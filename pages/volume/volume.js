//const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    list: [{
        all_money: "499",
        money: "50",
        name: "海鲜商城通用优惠卷",
        effective: ['2018.10.11', '2019.11.03']
      },
      {
        all_money: "499",
        money: "50",
        name: "海鲜商城通用优惠卷",
        effective: ['2018.10.11', '2019.11.03']
      }
    ],
    overList: [{
      all_money: "300",
      money: "20",
      name: "海鲜商城通用优惠卷",
      effective: ['2017.1.11', '2018.8.03']
    }],
  },
  //切换优惠卷功能
  tabFun(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
})