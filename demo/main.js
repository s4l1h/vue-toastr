import Vue from "vue";
import App from "./Demo.vue";
// import "../src/plugin";
require("./animate.css");
// import VueToastr, { Toastr, Toast, ToastProgress } from "../src/index";
import VueToastr from "../src/index";

Vue.use(VueToastr);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
