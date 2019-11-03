// components/g-confirm/g-confirm.js
Component({
  data: {
    value: "",
    text: ""
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
    },
    cancelClick() {
      this.triggerEvent("cancelClick");
    },
    watchInput(event) {
      this.data.value = event.detail.value;
    }
  }
});
