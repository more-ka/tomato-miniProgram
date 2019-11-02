const { app_id, app_secret } = getApp().globalData;
const { http } = require("../../utils/http.js");

Page({
  data: {},
  onShow() {
    http.get("/todos");
  },
  login(event) {
    let encrypted_data = event.detail.encryptedData
    let iv = event.detail.iv
    let code
    wx.login({
      success: function(res) {
        code = res.code
        http.post('/sign_in/mini_program_user',{
          code,
          iv,
          encrypted_data,
          app_id,
          app_secret
        })
        .then(response=>{
          console.log(response);
          
          wx.setStorageSync('me', response.data.resource)
          wx.setStorageSync('X-token', response.header["X-token"])
          wx.reLaunch({
            url: '/pages/index/index'
          })
        })
      },
      fail: function(res) {}
    });
  }
});
