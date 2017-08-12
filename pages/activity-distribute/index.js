var util = require('../../utils/util.js')
var app = getApp()
Page({
  data:{ 
    currentTpye:0,
    id:"",
    date: util.formatDate(new Date),
    time: util.formatTime(new Date),
    title:"",
    detail:"",
    location:"",
    user_name: "",
    types: ['旅行', '运动', '会议', '聚会', '晚会','娱乐'],
    picurls:[
      'https://qiyihx.cn/upload/images/2017-08-11/15024546269420.png?t=756077309',
      'https://qiyihx.cn/upload/images/2017-08-11/15024597018301.png?t=2093174528',
      'https://qiyihx.cn/upload/images/2017-08-11/15024595051628.png?t=1517994899',
      'https://qiyihx.cn/upload/images/2017-08-11/15024598836609.png?t=485288257',
      'https://qiyihx.cn/upload/images/2017-08-11/15024600138403.png?t=929853942',
      'https://qiyihx.cn/upload/images/2017-08-11/15024601782363.png?t=1263531723'
    ],
    picurl: 'https://qiyihx.cn/upload/images/2017-08-11/15024546269420.png?t=756077309',
    type: "0",
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
    var id = options.id;
    if (id != undefined && id != 'undefined') {
      app.getDetail(id, 'activity', function (res) {
        var data = res.data;
        that.setData({
          id:data.id,
          title: data.title,
          detail: data.detail,
          date: data.date,
          time: data.time,
          location: data.location,
          user_name: data.user_name,
          user_headimg: data.user_headimg,
          type: data.type,
          picurl: that.data.picurls[data.type]
        });
      });
    }else{
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          user_name: userInfo.nickName,
          user_headimg: userInfo.avatarUrl
        })
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
    var data = this.data;
    if (!data.title || data.title.trim() == ''){
      wx.showModal({
        title: '提示',
        content: '请输入活动名称',
        showCancel: false
      })
      return;
    }
    if (!data.detail || data.detail.trim() == '') {
      wx.showModal({
        title: '提示',
        content: '请输入活动内容',
        showCancel: false
      })
      return;
    }
    if (!data.location || data.location.trim() == '') {
      wx.showModal({
        title: '提示',
        content: '请输入活动地点',
        showCancel: false
      })
      return;
    }
    if (!data.user_name || data.user_name.trim() == '') {
      wx.showModal({
        title: '提示',
        content: '请输入发起人',
        showCancel: false
      })
      return;
    }
    data.form_id = e.detail.formId;
    var shorturl = "/activity/save.php";
    app.saveData(this.data, shorturl, function(res){
      if (res.retcode == 'SUCCESS'){
        wx.showModal({
          title: '提示',
          content: res.retmsg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/activity-list/index?from=me'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.retmsg,
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
  },
  bindTypeChange: function(e){
    this.setData({
      type: e.detail.value+'',
      picurl: this.data.picurls[e.detail.value]
    })
  }
})