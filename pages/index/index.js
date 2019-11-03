//index.js
//获取应用实例
const app = getApp();
const { http } = require("../../utils/http.js");

Page({
  data: {
    visible: false,
    finished: false,
    todoList: []
  },
  //事件处理函数
  finished(e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.data.todoList[index].completed = true
    this.setData({
      todoList: this.data.todoList
    })
    http.put(`/todos/${id}`, { completed: true })
    .then(response => {
      let newTodo = response.data.resource
      this.data.todoList[index] = newTodo
      this.setData({
        todoList: this.data.todoList
      });
    }).catch(error=>{
      this.setData({
        [template]: false
      })
    })
  },
  showConfirm() {
    this.setData({
      visible: true
    });
  },
  confirmCreate(event) {
    let text = event.detail;
    if (text) {
      http.post("/todos", { description: text }).then(response => {
        let todo = [response.data.resource];
        let newList = todo.concat(this.data.todoList);
        this.setData({
          visible: false,
          todoList: newList
        });
      });
    }
  },
  cancelCreate() {
    this.setData({
      visible: false
    });
  },
  onLoad: function() {
    http.get("/todos").then(response => {
      this.setData({
        todoList: response.data.resources
      });
    });
  }
});
