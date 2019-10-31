// pages/tomato/tomato.js
Page({
  data: {
    defaultTime: 5,
    time: "",
    timer: null,
    showConfirm: false,
    again: false
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
  sureAgain() {
    this.setData({
      defaultTime: 5,
      showConfirm: false,
      again: false
    });
    this.startTimer();
  },
  cancelAgain() {
    this.setData({
      showConfirm: false
    });
  },
  sureAbandon() {
    wx.navigateBack({
      to: -1
    });
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
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 1000);
  },
  onLoad: function(options) {
    this.startTimer();
  }
});
