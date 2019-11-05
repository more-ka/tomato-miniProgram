// components/g-confirm/g-confirm.js
Component({
  data: {
    value: "",
    text: ""// 接受的文本框placeholder
  },
  properties: {
    placeholder: {
      type: String,
      value: ""
    },
    visible: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: ""
    }
  },
  methods: {
    sureClick() {
      this.triggerEvent("sureClick",this.data.value);
      this.setData({
        text: ""
      })
    },
    cancelClick() {
      this.triggerEvent("cancelClick");
      this.setData({
        text: ""
      })
    },
    watchInput(event) {
      this.data.value = event.detail.value;
    }
  }
});
