//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    visible: false,
    finished: false,
    todoList: [
      {id:1,text:'今天是个好天气,sf',finished:true},
      {id:2,text:'今天是个好天气今天是个好天气今天是个好天气今天是个好天气今天是个好天气今天是个好天气今天是个好天气今天是个好天气今天是个好天气,sfsfs',finished:false},
      {id:3,text:'今天是个好天气151512',finished:false},
      {id:4,text:'今天是个好天气',finished:true},
      {id:5,text:'今天是个好天气',finished:false},
      {id:6,text:'今天是个好天气',finished:true}
    ]
  },
  //事件处理函数
  selectedClick(e) {
    let index = e.currentTarget.dataset.index
    this.data.todoList[index].finished = true
    this.setData({
      todoList: this.data.todoList
    });
  },
  showConfirm() {
    this.setData({
      visible: true
    });
  },
  sureClick(event) {
    let text = event.detail
    let todo = [{id:this.data.todoList.length+1,text,finished: false}]
    let newList = this.data.todoList.concat(todo)
    this.setData({
      visible: false,
      todoList: newList
    });
  },
  cancelClick() {
    this.setData({
      visible: false
    });
  },

  onLoad: function() {}
});
