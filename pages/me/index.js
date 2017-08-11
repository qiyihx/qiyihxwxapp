var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    tabClass: ["", "", "", "", ""],
    stepList:"",
    color: "red",
    backcolor:"#eee"
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
    app.wxRunData(function (stepList) {
      //更新数据
      that.setData({
        stepList: stepList
      })
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
  showcolor: function(e){
    console.log(Math.random().toString(16).substr(2, 6));
    var color = Math.random().toString(16).substr(2, 6); 
    var backcolor = Math.random().toString(16).substr(2, 6);
    this.setData({
      color: '#' + color,
      backcolor: '#' + backcolor
    })
  }, 
  screen_slider4change: function (e) {
    if (wx.setScreenBrightness) {
      wx.setScreenBrightness({
        value: e.detail.value/100,
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false
      })
    }
  },
  getSystemInfoSync: function(e){
    try {
      var res = wx.getSystemInfoSync();
      wx.showModal({
        title: '提示',
        content: '手机型号 : ' + res.model + '\n操作系统版本 : ' + res.system,
        showCancel: false
      })
    } catch (e) {
      wx.showModal({
        title: '提示',
        content: '获取失败，请重试',
        showCancel: false
      })
    }
  }, 
  scanCode: function (e) {
    wx.scanCode({
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: res.scanType+" : " + res.result,
          showCancel: false
        })
      }
    }) 
  },
  callPhone: function (e){
    wx.makePhoneCall({
      phoneNumber: '18761169562'
    })
  },
  vibrateLong: function(e){
    if (wx.vibrateLong) {
      console.log('vibrateLong');
      wx.vibrateLong({
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  contact: function(e){
    wx.navigateTo({
      url: "/pages/business-card-detail/index"
    })
  },
  activity: function(e){
    wx.navigateTo({
      url: "/pages/activity-list/index?from=me"
    })
  }
})