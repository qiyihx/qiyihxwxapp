var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    tabClass: ["", "", "", "", ""],
    stepList:"",
    color: "red",
    backgroundImg:{},
    ideas:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    scrollTop: "0",
    loadingMoreHidden: true,
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentTpye = curType
     this.setData({
      currentTpye:curType
     });
     this.onShow();
  },
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  tapBanner: function (e) {
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },
  bindTypeTap: function (e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  scroll: function (e) {
    //  console.log(e) ;
    var that = this, scrollTop = that.data.scrollTop;
    that.setData({
      scrollTop: e.detail.scrollTop
    })
    // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
    // console.log('scrollTop:'+scrollTop)
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log('onLoad')
    var that = this;
    wx.request({
      url: app.globalData.requestUrl + '/banner/list.php',
      data: {
        type: '1',
        status:'1'
      },
      success: function (res) {
        that.setData({
          banners: res.data.data
        });
      }
    });
    wx.request({
      url: app.globalData.requestUrl + '/banner/list.php',
      data: {
        type: '1',
        status: '1'
      },
      success: function (res) {
        that.setData({
          ideas: res.data.data
        });
      }
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  },
  formSubmit: function(e) {
    app.sendTplMsg(e.detail.formId, '你从哪里了');
  },
  wxrun: function(e) {
    var that = this;
    app.wxRunData(function (stepList) {
      //更新数据
      that.setData({
        stepList: stepList
      })
      wx.showModal({
        title: '提示',
        content: '您的当日步数 ：' + stepList,
        showCancel: false
      })
    });
   
  }, 
  changebackground: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      var that = this;
      wx.request({
        url: app.globalData.requestUrl + '/banner/random.php',
        data: {
          type: '1',
          id: e.currentTarget.dataset.id,
          status: '1'
        },
        success: function (res) {
          that.setData({
            backgroundImg: res.data.data
          });
        }
      })
    }
  },
  redirpage: function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  settools: function(e){
    wx.navigateTo({
      url: "/pages/business-card-detail/index"
    })
  }, 
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '开启你的幻想旅行',
      path: '/pages/discover/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})