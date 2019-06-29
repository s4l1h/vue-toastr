# Modular use

## Usage as a Plugin

If you use vue.js plugin before. it will be easy for you.Just import and use.

### JavaScript

```javascript
import Vue from "vue";
import App from "./App.vue";

// import plugin
import VueToastr from "vue-toastr";
// use plugin
Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  mounted() {
    // You are able to access plugin from everywhere via this.$toastr
    this.$toastr.defaultPosition = "toast-top-left";
    // Send message to browser screen
    this.$toastr.s(
      "This Message From Toastr Plugin\n You can access this plugin : <font color='yellow'>this.$toastr</font>"
    );
  }
}).$mount("#app");
```

## Usage as a Component

### HTML

```html
<div id="#app">
  <!-- Your vue application -->
  <vue-toastr ref="mytoast"></vue-toastr>
</div>
```

### JavaScript

```javascript
import Vue from "vue";
import App from "./App.vue";

// import plugin
import VueToastr from "vue-toastr";
// register component
Vue.component("vue-toastr", VueToastr);

Vue.config.productionTip = false;
// for more details about using component please check vue.js documentation out.
new Vue({
  render: h => h(App),
  components: {
    // "vue-toastr": VueToastr,
    // VueToastr,
  },
  mounted() {
    // Change default toast position.
    this.$refs.mytoast.defaultPosition = "toast-top-left";
    // Send message to browser screen
    this.$refs.mytoast.s(
      "This Message From Toastr Plugin\n You can access this plugin : <font color='yellow'>this.$toastr</font>"
    );
  }
}).$mount("#app");
```
