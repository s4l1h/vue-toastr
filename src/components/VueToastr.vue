<script>
import VueToastr from "./Toastr.vue";

VueToastr.install = (Vue, options = {}) => {
  // console.log("install vuetoastr")
  // Create component instance
  let MyComponent = Vue.extend({
    render: h => {
      return h(VueToastr, {
        props: {
          options: options
        },
        ref: "vueToastr"
      });
    }
  });
  // or, render off-document and append afterwards:
  var component = new MyComponent().$mount();
  // console.log(document.body, component.$el)
  document.body.appendChild(component.$el);
  // 4. add an instance method
  Vue.prototype.$toastr = component.$refs.vueToastr;
};
// Install by default if using the script tag
// equal to Vue.use(window.vueToastr)
if (typeof window !== "undefined" && window.Vue) {
  // console.log(window.Vue)
  window.Vue.use(VueToastr);
}
export default VueToastr;
</script>
