var util = require('../../utils/util.js')
var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    birthday:"",
    life:{},
    color: "red",
    backcolor:"#eee",
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
    // 生命周期函数--监听页面加载
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    app.getContactByCode(function (res) {
      var data = res.data;
      if (data) {
        var now = new Date();
        var birth = parseInt(data.birthday);
        var yyyy = parseInt(birth / 10000);
        var mm = parseInt(birth % 10000 / 100);
        var dd = birth % 100;
        var birthday = new Date(yyyy, mm, dd);
        var life = {};
        life.sec = parseInt((now.getTime() - birthday.getTime()) / 1000);
        life.min = parseInt(life.sec / 60);
        life.hour = parseInt(life.min / 60);
        life.day = parseInt(life.hour / 24);
        life.week = parseInt(life.day / 7);
        life.mon = parseInt(life.day / 30);
        life.year = parseInt(life.day / 365);
        life.years = life.day / 365;
        console.log(life.years);
        that.setData({
          life: life,
        })
      }
    });
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
  sharelife: function (e) {
    
      var mobile_phone_number = e.currentTarget.dataset.id;
      if (mobile_phone_number) {
        if (wx.vibrateLong) {
          wx.vibrateLong({})
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '请先编辑通讯录',
          showCancel: false
        })
      }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我的时光',
      path: '/pages/life/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})