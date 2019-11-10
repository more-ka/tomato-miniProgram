// pages/profile/profile.js
const {http} = require('../../utils/http.js')
Page({
  // 页面的初始数据
  data: {
    todos: {},
    loginStatus: false
  },
   // 生命周期函数--监听页面显示
   logout(){
     wx.clearStorage()
    this.setData({
      todos: {},
      loginStatus: false
    })
     wx.reLaunch({
       url: '/pages/index/index'
     });
     wx.showToast({
       title: '退出登录成功',
       duration: 2000
     })
   },
  onShow: function () {
    if(wx.getStorageSync('X-token')){
      this.setData({
        loginStatus: true,
      })
    }
    http.get('/todos',{is_group:"yes"})
      .then(response=>{
        this.setData({
          todos: response.data.resources
        })
      })
  }
})