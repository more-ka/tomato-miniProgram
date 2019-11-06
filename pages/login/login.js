const { app_id, app_secret } = getApp().globalData;
const { http } = require("../../utils/http.js");

Page({
  data: {},
  onShow() {
    // http.get("/todos");
  },
  login(event) {
    let code;
    let iv = event.detail.iv;
    let encrypted_data = event.detail.encryptedData;
    this.wxLogin(code, iv, encrypted_data);
  },
  cancelLogin(){
    wx.navigateBack({
      delta: -1
    })
  },
  wxLogin(code, iv, encrypted_data) {
    wx.login({
      success: res => {
        this.loginMe(res, code, iv, encrypted_data);
      }
    });
  },
  loginMe(res, code, iv, encrypted_data) {
    code = res.code;
    http
      .post("/sign_in/mini_program_user", {
        code,
        iv,
        encrypted_data,
        app_id,
        app_secret
      })
      .then(response => {
        this.saveMessage(response);
        wx.showToast({
          title: '登录成功'
        })
        wx.reLaunch({
          url: "/pages/index/index"
        });
      })
      .catch(error=>{
        if(error.statusCode===500){
          wx.showToast({
            title: '授权失败,请重试',
            icon: 'none'
          })
        }
      })
  },
  saveMessage(response) {
    wx.setStorageSync("me", response.data.resource);
    wx.setStorageSync("X-token", response.header["X-token"]);
  }
});
