
import toastVue from "./toast"
import Vue from "vue";

var instance = null
var defaultOption = {
  visiable: true,
  message: '',
  duration: 2000
}
var curOption = {}
var ToastConstructor = Vue.extend(toastVue);

var initInstance = function () {
  instance = new ToastConstructor({
    el: document.createElement('div')
  })
};

var Toast = function (options) {
  if (typeof options === 'string') {
    options = { message: options }
  }
  if (!instance) {
    initInstance();
  }
  Object.assign(instance, defaultOption, options);
  document.body.appendChild(instance.$el);
  instance.$on('input', function (value) {
    instance.visiable = value;
  });
};
Toast.install = function(){
  Vue.prototype.$toast = Toast;
  Vue.component("toast", Toast);
}
export default Toast;
