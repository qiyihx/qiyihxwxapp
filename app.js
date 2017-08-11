//app.js
App({
  globalData: {
    userInfo: null,
    subDomain: "mall",
    requestUrl: "https://qiyihx.cn/api"
  },
  onLaunch: function () {
    var that = this;
    this.login();
  },
  login : function () {
    var that = this;
    var token = that.globalData.token;
    if (token) {
      wx.request({
        url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.code != 0) {
            that.globalData.token = null;
            that.login();
          }
        }
      })
      return;
    }
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/user/wxapp/login',
          data: {
            code: res.code
          },
          success: function(res) {
            if (res.data.code == 10000) {
              // 去注册
              that.registerUser();
              return;
            }
            if (res.data.code == 0) {
              // 登录错误 
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel:false
              })
              return;
            }
            that.globalData.token = res.data.token;
          }
        })
      }
    })
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            //wx.request({
              //url: 'https://api.it120.cc/' + that.globalData.subDomain +'/user/wxapp/register/complex',
             // data: {code:code,encryptedData:encryptedData,iv:iv}, // 设置请求的 参数
              //success: (res) =>{
               // console.log();
                //wx.hideLoading();
                //that.login();
              //}
           // })
          }
        })
      }
    })
  },
  
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  sendTplMsg: function (formId, content) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.request({
          url: that.globalData.requestUrl+'/wxapp/sendTplMsg.php?code=' + code + '&form_id=' + formId,
          success: function (res) {
            var result = res.data.result;
            console.log(res.data);
            wx.showModal({
              title: '提示',
              content: result.errcode == 0 ? '发送成功' : '发送失败:' + result.errcode,
              showCancel: false
            })
          }
        })
      }
    });
  },
  wxRunData: function (cb) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getWeRunData({
          success(res) {
            const encryptedData = encodeURIComponent(res.encryptedData);
            const iv = encodeURIComponent(res.iv);
            wx.request({
              url: that.globalData.requestUrl + '/wxapp/wxRunData.php?code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv,
              success: function (res) {
                var result = res.data;
                console.log(result);
                that.globalData.stepList = result;
                cb(that.globalData.stepList);   
              }
            })
          }
        })
      }
    });
  },
  saveContact: function (key, val,cb) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.request({
          url: that.globalData.requestUrl+'/area/save.php',
          data: {
            code: code,
            key: key,
            val: val
          },
          success: function (res) {
            if(cb){
              cb(res.data);
            } 
          }
        })
      }
    });
  },
  getContactByCode:function(cb){
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.request({
          url: that.globalData.requestUrl+ '/area/detailByCode.php',
          data: {
            code: code
          },
          success: function (res) {
            var data = res.data;
            cb(data);
          }
        })
      }
    });
  },
  getDetail: function (id, table, cb) {
    var that = this;
    wx.request({
      url: that.globalData.requestUrl + '/'+ table +'/detail.php',
      data: {
        id: id
      },
      success: function (res) {
        var data = res.data;
        cb(data);
      }
    })
  },
  addContact: function(contact){
    var that = this;
    wx.addPhoneContact({
      photoFilePath: contact.photo_file_path,
      nickName: contact.nick_name,
      lastName: contact.last_name,
      middleName: contact.middle_name,
      firstName: contact.first_name,
      remark: contact.remark,
      mobilePhoneNumber: contact.mobile_phone_number,
      weChatNumber: contact.we_chat_number,
      addressCountry: contact.address_country,
      addressState: contact.address_state,
      addressCity: contact.address_city,
      addressStreet: contact.address_street,
      addressPostalCode: contact.address_postal_code,
      organization: contact.organization,
      title: contact.title,
      workFaxNumber: contact.work_fax_number,
      workPhoneNumber: contact.work_phone_number,
      hostNumber: contact.host_number,
      email: contact.email,
      url: contact.url,
      workAddressCountry: contact.work_address_country,
      workAddressState: contact.work_address_state,
      workAddressCity: contact.work_address_city,
      workAddressStreet: contact.work_address_street,
      workAddressPostalCode: contact.work_address_postal_code,
      homeFaxNumber: contact.home_fax_number,
      homePhoneNumber: contact.home_phone_number,
      homeAddressCountry: contact.home_address_country,
      homeAddressState: contact.home_address_state,
      homeAddressCity: contact.home_address_city,
      homeAddressStreet: contact.home_address_street,
      homeAddressPostalCode: contact.home_address_postalCode,
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '添加通讯录成功',
          showCancel: false
        })
      },
      fail: function (res) {},
      complete: function (res) {},
    });
  },
  saveData: function (data, shorturl, cb) {
    var that = this;
    wx.login({
      success: function (res) {
        data.code = res.code;
        wx.request({
          url: that.globalData.requestUrl + shorturl,
          data: data,
          success: function (res) {
            cb(res.data);
          }
        })
      }
    });
  }
})