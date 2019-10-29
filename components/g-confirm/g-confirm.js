// components/g-confirm/g-confirm.js
Component({
  /**
   * 组件的属性列表
   */
  data: {
    value: ""
  },
  properties: {
    placeholder: {
      type: String,
      value: ""
    },
    visible: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    sureClick() {
      this.triggerEvent("sureClick",this.data.value);
    },
    cancelClick() {
      this.triggerEvent("cancelClick");
    },
    watchInput(event) {
      this.data.value = event.detail.value;
    }
  }
});
