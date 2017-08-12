var util = require('../../utils/util.js')
var app = getApp()
Page({
  data:{ 
    currentTpye:0,
    activity:{}
  },
  joindata:{
    activity_id:"",
    user_name:"",
    form_id:"",
    user_headimg:""
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
    var id = decodeURIComponent(options.scene);
    if (id == 'undefined') {
      id = options.id;
    }
    if (id != undefined && id != 'undefined') {
      app.getDetail(id, 'activity', function (res) {
        that.joindata.activity_id = id;
        that.setData({
          activity: res.data
        });
        app.getUserInfo(function (userInfo) {
          //更新数据
          that.joindata.user_name = userInfo.nickName;
          that.joindata.user_headimg = userInfo.avatarUrl;
        });
      });
    }
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
    var joindata = this.joindata;
    joindata.form_id = e.detail.formId;
    var shorturl = "/activity/join.php";
    app.saveData(joindata, shorturl, function(res){
      wx.showModal({
        title: '提示',
        content: res['retmsg'],
        showCancel: false
      })
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我发起了一项活动【' + this.data.activity.title +'】,赶紧来报名吧',
      path: '/pages/activity-detail/index?id=' + this.data.activity.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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