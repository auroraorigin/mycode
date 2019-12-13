import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "待收货",
        isActive: false
      },
      {
        id: 4,
        value: "退款",
        isActive: false
      }
    ],
    all_Order: [{
        allNumber: "5",
        totalPrice: "700",
        product: [{
            seller_name: "海鲜商城",
            condition: "已完成",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
          {
            seller_name: "海鲜商城",
            condition: "已完成",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
        ],
      },
      {
        allNumber: "5",
        totalPrice: "700",
        product: [{
            seller_name: "海鲜商城",
            condition: "已完成",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
          {
            seller_name: "海鲜商城",
            condition: "已完成",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
        ],
      },
      {
        allNumber: "5",
        totalPrice: "700",
        product: [{
          seller_name: "海鲜商城",
          condition: "已完成",
          src: "/images/personal_center/product.jpg",
          product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
          standard: "三斤",
          money_Return: "三天无理由退款",
          price: "100.00",
          buyNumber: "2",
        }, ],
      },
    ],
    wait_Paid: [{
        allNumber: "5",
        totalPrice: "700",
        product: [{
            seller_name: "海鲜商城",
            condition: "待付款",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
          {
            seller_name: "海鲜商城",
            condition: "待付款",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
          {
            seller_name: "海鲜商城",
            condition: "待付款",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
        ],
      },
      {
        allNumber: "5",
        totalPrice: "700",
        product: [{
          seller_name: "海鲜商城",
          condition: "待付款",
          src: "/images/personal_center/product.jpg",
          product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
          standard: "三斤",
          money_Return: "三天无理由退款",
          price: "100.00",
          buyNumber: "2",
        }, ],
      },
    ],
    wait_Sent: [{
        allNumber: "5",
        totalPrice: "700",
        product: [{
            seller_name: "海鲜商城",
            condition: "待发货",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
          {
            seller_name: "海鲜商城",
            condition: "待发货",
            src: "/images/personal_center/product.jpg",
            product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
            standard: "三斤",
            money_Return: "三天无理由退款",
            price: "100.00",
            buyNumber: "2",
          },
        ],
      },
      {
        allNumber: "5",
        totalPrice: "700",
        product: [{
          seller_name: "海鲜商城",
          condition: "待发货",
          src: "/images/personal_center/product.jpg",
          product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
          standard: "三斤",
          money_Return: "三天无理由退款",
          price: "100.00",
          buyNumber: "2",
        }, ],
      },
    ],
    wait_Received: [{
        allNumber: "5",
        totalPrice: "700",
        product: [{
          seller_name: "海鲜商城",
          condition: "待收货",
          src: "/images/personal_center/product.jpg",
          product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
          standard: "三斤",
          money_Return: "三天无理由退款",
          price: "100.00",
          buyNumber: "2",
        }, ],
      },
      {
        allNumber: "5",
        totalPrice: "700",
        product: [{
          seller_name: "海鲜商城",
          condition: "待收货",
          src: "/images/personal_center/product.jpg",
          product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
          standard: "三斤",
          money_Return: "三天无理由退款",
          price: "100.00",
          buyNumber: "2",
        }, ],
      },
    ],
    haved_Return: [{
      allNumber: "5",
      totalPrice: "700",
      product: [{
        seller_name: "海鲜商城",
        condition: "已退款",
        src: "/images/personal_center/product.jpg",
        product_name: "金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼金枪鱼",
        standard: "三斤",
        money_Return: "三天无理由退款",
        price: "100.00",
        buyNumber: "2",
      }, ],
    }, ],
  },

  //根据标题索引来激活选中 标题数组 
  changeTitleByIndex(index) {
    //2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //3 赋值到data中
    this.setData({
      tabs
    })
  },

  handleTabsItemChange(e) {
    //1 获取被点击标题的索引
    const {
      index
    } = e.detail;
    this.changeTitleByIndex(index);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    console.log(options);
    //1.获取当前小程序的页面栈-数组 最大长度为10页面
    let pages = getCurrentPages();
    //2.数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    //3.获取url上的type参数
    const {
      type
    } = currentPage.options;
    //4.激活选中页面标题 当type=1时，index=0 
    this.changeTitleByIndex(type - 1);
    //this.getOrders(type);
  },
  /*async getOrders(type){
    const res=await request({url:"https://api.zbztb.cn/api/public/v1/my/orders/all",data:{type}});
    console.log(res);
  }*/
})