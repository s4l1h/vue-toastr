# Browser use

## Usage as a Plugin

When you add vue-toastr to your page you won't need to install it because it will be installed automatically.

### HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-toastr/dist/vue-toastr.umd.min.js"></script>

<!-- for animation it is not necessary just for fun -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
  integrity="sha256-PHcOkPmOshsMBC+vtJdVr5Mwb7r0LkSVJPlPrp/IMpU="
  crossorigin="anonymous"
/>
<!-- for animation it is not necessary just for fun -->

<div id="#app">
  <!-- Your vue application -->
</div>
```

### JavaScript

```javascript
// Now the app has started!
// you can access the plugin from everywhere via this.$toastr
new Vue({
  mounted() {
    // Inject your class names for animation
    this.$toastr.defaultClassNames = ["animated", "zoomInUp"];
    // Change Toast Position
    this.$toastr.defaultPosition = "toast-top-left";
    // Send message to browser screen
    this.$toastr.s(
      "This Message From Toastr Plugin\n You can access this plugin : <font color='yellow'>this.$toastr</font>"
    );
  }
}).$mount("#app");
```

## Usage as a Component

when you decited to use as a component you have to register it.

### HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-toastr/dist/vue-toastr.umd.min.js"></script>

<div id="#app">
  <!-- Your vue application -->
  <vue-toastr ref="mytoast"></vue-toastr>
</div>
```

### JavaScript

```javascript
// Now the app has started!
new Vue({
  components: {
    "vue-toastr": window.VueToastr
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
