var app = getApp()
Page({
  data:{
    id: "",
    val:"",
    valname:""
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
      val: options.val,
      valname: options.valname
    });
  },
  save_info: function(e){
    var id = e.currentTarget.dataset.id;
    var val = e.detail.value;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    if(id == 'title'){
      prevPage.setData({
        title: val
      });
    }else if (id == 'detail'){
      prevPage.setData({
        detail: val
      });
    } else if (id == 'location') {
      prevPage.setData({
        location: val
      });
    } else if (id == 'userName') {
      prevPage.setData({
        userName: val
      });
    }
    wx.navigateBack();
  }
})