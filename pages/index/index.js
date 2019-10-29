//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    visible: false,
    inputValue: ""
  },
  //事件处理函数
  click(){
    this.setData({
      visible: true
    })
  },
  sureClick(event){
    this.setData({
      visible: false,
      inputValue: event.detail
    })
  },
  cancelClick(){
    this.setData({
      visible: false
    })
  },
  onLoad: function () {

  }
})
