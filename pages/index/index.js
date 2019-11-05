//index.js
//获取应用实例
// const {host,t_app_id,t_app_secret} = getApp().globalData
const { http } = require("../../utils/http.js");

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
    taskContent: ''
  },
  //事件处理函数
  currentTask(e){
    let id = e.currentTarget.dataset.id
    let content = e.currentTarget.dataset.content
    this.setData({
      taskId: id,
      taskContent: content
    })
  },
  updateText(e){
    let content = e.currentTarget.dataset.content
    this.updateIndex = e.currentTarget.dataset.index
    this.updateId = e.currentTarget.dataset.id
    this.setData({
      updateConfirm: true,
      innerText: content,
    })
  },
  confirmUpdate(e){
    http.put(`/todos/${this.updateId}`,{completed:false,description:e.detail })
      .then(response=>{
        let newTodo = response.data.resource
        this.data.todoList[this.updateIndex]=newTodo
        this.setData({
          updateConfirm: false,
          todoList: this.data.todoList,
          taskId: newTodo.id,
          taskContent: newTodo.description
        })
      })
      .catch(error=>{
        if(error.statusCode===422){
          console.log('内容未修改');
        }
      })
  },
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
  cancelUpdate(){
    this.setData({
      updateConfirm: false
    })
  },
  cancelCreate(){
    this.setData({
      visible: false
    });
  },
  onShow: function() {
    http.get("/todos?completed=false").then(response => {
      this.setData({
        todoList: response.data.resources,
        loginStatus: getApp().globalData.loginStatus
      });
    });
  }
});
