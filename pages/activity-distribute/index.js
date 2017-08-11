var util = require('../../utils/util.js')
var app = getApp()
Page({
  data:{ 
    currentTpye:0,
    date: util.formatDate(new Date),
    time: util.formatTime(new Date),
    title:"",
    detail:"",
    location:"",
    userName: "",
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
    var that = this;
    console.log('onLoad')
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userName: userInfo.nickName
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
    var formId = e.detail.formId;
    if (!this.data.title || this.data.title.trim() == ''){
      wx.showModal({
        title: '提示',
        content: '请输入活动名称',
        showCancel: false
      })
      return;
    }
    if (!this.data.detail || this.data.detail.trim() == '') {
      wx.showModal({
        title: '提示',
        content: '请输入活动内容',
        showCancel: false
      })
      return;
    }
    if (!this.data.location || this.data.location.trim() == '') {
      wx.showModal({
        title: '提示',
        content: '请输入活动地点',
        showCancel: false
      })
      return;
    }
    if (!this.data.userName || this.data.userName.trim() == '') {
      wx.showModal({
        title: '提示',
        content: '请输入发布人',
        showCancel: false
      })
      return;
    }
    app.addActivity(this.data, formId, function(res){
      if (res.data== 0){
          wx.showModal({
            title: '提示',
            content: '活动创建成功',
            showCancel: false
          })
      }
    });
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  edit_info: function (e) {
    var val = e.currentTarget.dataset.val;
    if (val == null || val == 'undefined') {
      val = "";
    }
    var valname = e.currentTarget.dataset.valname;
    if (valname == null || valname == 'undefined') {
      valname = "";
    }
    wx.navigateTo({
      url: "/pages/activity-edit/index?id=" + e.currentTarget.dataset.id + "&val=" + val + "&valname=" + valname
    })
  }
})