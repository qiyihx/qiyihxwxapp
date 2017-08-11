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
    activity:[]
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentTpye = curType
     this.setData({
      currentTpye:curType
     });
     this.onShow();
  },
  onLoad:function(options){
    var that = this;
    this.setData({
      from: options.from
    });
    var code = "";
    if (options.from == 'me'){
      console.log('from me');
      wx.login({
        success: function (res) {
          code = res.code;
          wx.request({
            url: 'https://qiyihx.cn/api/activity/list.php',
            data: {
              code: code
            },
            success: function (res) {
              console.log(res.data.data);
              that.setData({
                activity: res.data.data
              });
            }
          });
        }
      });
    }else{
      wx.request({
        url: 'https://qiyihx.cn/api/activity/list.php',
        data: {
          status: '1'
        },
        success: function (res) {
          console.log(res.data.data);
          that.setData({
            activity: res.data.data
          });
        }
      });
    }
    
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
  activityDetail: function(e){
    wx.navigateTo({
      url: "/pages/activity-detail/index?id=" + e.currentTarget.dataset.id
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
  },
  distribute : function(e){
    wx.navigateTo({
      url: "/pages/activity-distribute/index"
    })
  }
})