// pages/tomato/tomato.js
const {http} = require('../../utils/http.js')
Page({
  tomato: {},
  data: {
    defaultTime: 300000,
    time: "",
    timer: null,
    showConfirm: false,
    again: false,
    taskContent: '',
    taskId: -1
  },
  // 放弃按钮被点击
  abandon() {
    clearInterval(this.timer);
    this.timer = null;
    this.setData({
      showConfirm: true
    });
  },
  // 再来一组被点击
  again() {
    this.setData({
      showConfirm: true,
      again: true
    });
  },
  sureAgain(e) {
    let description = e.detail
    http.post("/todos", { description: description }).then(response=>{
      this.tomato = response.data.resource
      this.setData({
          defaultTime: 30,
          showConfirm: false,
          again: false,
          taskId: this.tomato.id,
        taskContent: this.tomato.description
        })
    });
    this.startTimer();
  },
  cancelAgain() {
    this.setData({
      showConfirm: false
    });
  },
  sureAbandon(e) {
    http.put(`/tomatoes/${this.tomato.id}`,{description: e.detail,aborted:true})
      .then(response=>{
        wx.navigateBack({
          to: -1
        });
      })
  },
  cancelAbandon() {
    this.setData({
      showConfirm: false
    });
    this.startTimer();
  },
  // 时间计时器
  startTimer() {
    this.timer = setInterval(() => {
      this.data.defaultTime = this.data.defaultTime - 1;
      this.formatTime();
      if (this.data.defaultTime === 0) {
        this.taskFinish()
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 1000);
  },
  onShow: function(options) {
    http.post('/tomatoes').then(response=>{
        this.tomato = response.data.resource
      this.startTimer();
    })
  },
  onHide(){
    http.put(`/tomatoes/${this.tomato.id}`,{description: '退出放弃',aborted:true})
  },
  onUnload(){
    http.put(`/tomatoes/${this.tomato.id}`,{description: '退出放弃',aborted:true})
  },
  // 时间处理
  formatTime() {
    let minute = Math.floor(this.data.defaultTime / 60);
    let second = Math.floor(this.data.defaultTime % 60);
    this.setData({
      time: `${this.handleTime(minute)}:${this.handleTime(second)}`
    });
  },
  // 时间格式化
  handleTime(s) {
    if ((s + "").length === 1) {
      return "0" + s;
    }
    return s;
  },
  onLoad(options) {
    this.setData({
      taskContent: options.content,
      taskId: options.id
    })
  },
  quickFinish(){
    this.setData({
      defaultTime:1
    })
  },
  taskFinish() {
    http.put(`/todos/${this.data.taskId}`, {completed: true})
    this.setData({
      taskId: -1,
      taskContent: ''
    })
  }
});
