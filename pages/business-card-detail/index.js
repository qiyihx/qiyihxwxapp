var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    tabClass: ["", "", "", "", ""],
    stepList:"",
    color: "red",
    backcolor:"#eee",
    wxappcontact:{}
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
    var that = this;
    app.getContactByCode(function (res) {
      var data = res.data;
      app.getUserInfo(function (userInfo) {
        //更新数据
        app.saveContact("photo_file_path", userInfo.avatarUrl, function (result) {
          that.setData({
            wxappcontact: { "photo_file_path": userInfo.avatarUrl, "nick_name": userInfo.nickName, "id": result.id }
          })
          if (data) {
            data.id = result.id;
            data.nick_name = userInfo.nickName;
            data.photo_file_path = userInfo.avatarUrl;
            that.setData({
              wxappcontact: data
            });
          }
        });
        app.saveContact("nick_name", userInfo.nickName);
      })
    });
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    console.log('onReady');
 
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    console.log('onHide');
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    console.log('onUnload');
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log('onPullDownRefresh');   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  edit_info: function(e){
    var val = e.currentTarget.dataset.val;
    if (val == null || val == 'undefined'){
      val = "";
    }
    wx.navigateTo({
      url: "/pages/business-card-edit/index?id=" + e.currentTarget.dataset.id + "&val=" + val
    })
  }
})