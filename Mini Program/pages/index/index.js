const regeneratorRuntime = require('../../lib/regeneratorRuntime/regeneratorRuntime')
const api = require('../../api/index.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    categoryList:[],
    floorList:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    /**
     * 请求的promise 同时发送请求
     */
    const swiperListPromise = api.getPositionAds({ data: { position: "2" } })
    const categoryPromise = api.getArrayCategories()
    const floorPromise = api.getFloors()
   
    
    
    /**
     * 首页广告轮播
     */
    const swiperList = await swiperListPromise
    
    this.setData({
      swiperList: swiperList
    })
    /** 
     * 首页分类
     */
    const categoryList = await categoryPromise
    console.log(categoryList);
    this.setData({
      categoryList: categoryList
    })
     /** 
     * 楼层
     */
    const floorList = await floorPromise
    console.log(floorList);
    this.setData({
      floorList: floorList
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})