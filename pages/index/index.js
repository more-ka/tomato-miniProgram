//index.js
//获取应用实例
// const {host,t_app_id,t_app_secret} = getApp().globalData
const {
  http
} = require("../../utils/http.js");

Page({
  updateIndex: "",
  updateId: "",
  data: {
    visible: false,
    finished: false,
    innerText: "",
    todoList: [],
    updateConfirm: false,
    updateIndex: -1,
    updateId: -1,
    loginStatus: false,
    taskId: -1,
    taskContent: '',
    detail: ''
  },
  //事件处理函数
  startTomato() {
    if (this.data.taskContent === '') {
      wx.showToast({
        title: "请先选择任务",
        icon: "none",
        duration: 2000
      })
      return
    }
    wx.navigateTo({
      url: `../tomato/tomato?content=${this.data.taskContent}&id=${this.data.taskId}`
    })
  },
  currentTask(e) {
    let id = e.currentTarget.dataset.id
    let content = e.currentTarget.dataset.content
    this.setData({
      taskId: id,
      taskContent: content
    })
  },
  updateText(e) {
    let content = e.currentTarget.dataset.content
    this.updateIndex = e.currentTarget.dataset.index
    this.updateId = e.currentTarget.dataset.id
    this.setData({
      updateConfirm: true,
      innerText: content
    })
  },
  confirmUpdate(e) {
    http.put(`/todos/${this.updateId}`, {
        completed: false,
        description: e.detail
      })
      .then(response => {
        let newTodo = response.data.resource
        this.data.todoList[this.updateIndex] = newTodo
        this.setData({
          updateConfirm: false,
          todoList: this.data.todoList,
          taskId: newTodo.id,
          taskContent: newTodo.description
        })
      })
      .catch(error => {
        if (error.statusCode === 422) {
          wx.showToast({
            title: '内容未修改',
            icon: "none",
            duration: 2000
          })
        }
        this.setData({
          updateConfirm: false
        })
      })
  },
  finished(e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.data.todoList[index].completed = true
    http.put(`/todos/${this.data.taskId}`, {
        completed: true
      })
      .then(response => {
        let newTodo = response.data.resource
        this.data.todoList[index] = newTodo
        this.setData({
          todoList: this.data.todoList
        })
        console.log('删除');
        wx.showToast({
          title: '任务删除成功',
          icon: "success",
          duration: 2000
        })
      })
  },
  showConfirm() {
    if (!this.data.loginStatus) {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      visible: true
    });
  },
  confirmCreate(event) {
    let text = event.detail;
    if (!text) {
      wx.showToast({
        title: '未输入任何内容',
        icon: "none",
        duration: 2000
      })
    } else {
      http.post("/todos", {
        description: text
      }).then(response => {
        let newTodo = [response.data.resource]
        let newList = newTodo.concat(this.data.todoList);
        this.setData({
          visible: false,
          todoList: newList,
          taskId: newTodo[0].id,
          taskContent: newTodo[0].description
        });
      });
    }
  },
  cancelUpdate() {
    this.setData({
      updateConfirm: false
    })
  },
  cancelCreate() {
    this.setData({
      visible: false
    });
  },
  onShow: function() {
    if (wx.getStorageSync('X-token')) {
      this.setData({
        loginStatus: true,
      })
    }
    http.get("/todos?completed=false").then(response => {
      this.setData({
        todoList: response.data.resources,
        taskId: -1,
        taskContent: ''
      });
    });
  }
});