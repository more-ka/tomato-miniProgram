// pages/profile/profile.js
const {http} = require('../../utils/http.js')
Page({
  // 页面的初始数据
  data: {
    todos: {}
  },
   // 生命周期函数--监听页面显示
  onShow: function () {
    http.get('/todos',{is_group:"yes"})
      .then(response=>{
        this.setData({
          todos: response.data.resources
        })
      })
  }
})