var app = getApp()
Page({
  data:{
    id: "",
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
    this.setData({
      id: options.id,
      val: options.val
    });
  },
  save_info: function(e){
    app.saveContact(e.currentTarget.dataset.id, e.detail.value,function(res){  
      app.getContactByCode(function (res) {
        var data = res.data;
        if (data) {
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];  //当前页面
          var prevPage = pages[pages.length - 2]; //上一个页面
          prevPage.setData({
              wxappcontact: data
          });
        }
        wx.navigateBack();
      });
    });  
  }
})