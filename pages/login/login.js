const {app_id,app_secret} = getApp().globalData
const {http} = require('../../utils/http.js')

Page({
  data: {

  },
  onShow(){
    http.get('/todos')
  }
})

