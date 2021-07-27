# Getting Started

After installation you will be able to use **_vue-toastr_** as a **_component_** or as a **_plugin_**.

Next step you should choose how you are going to use **_vue-toastr_**.

[Usage On Browser](./usage_browser.md) or [Usage On Module](./usage_module.md) after than you can create your first toast!

## Create Toast

We created some methods for you which are help you quick use the plugin.

```javascript
this.$toastr.s("SUCCESS MESSAGE", "Success Toast Title");
this.$toastr.e("ERRROR MESSAGE");
this.$toastr.w("WARNING MESSAGE");
this.$toastr.i("INFORMATION MESSAGE");
```

If you need more control. You can use Add method.

```javascript
this.$toastr.Add({
  name: "UniqueToastName", // this is give you ability to use removeByName method
  title: "Easy Toast", // Toast Title
  msg: "Hi", // Toast Message
  clickClose: false, // Click Close Disable
  timeout: 0, // Remember defaultTimeout is 5 sec.(5000) in this case the toast won't close automatically
  //progressBarValue: 50, // Manually update progress bar value later; null (not 0) is default
  position: "toast-top-full-width", // Toast Position.
  type: "error", // Toast type,
  preventDuplicates: true, //Default is false,
  style: { backgroundColor: "blue", width: "150px" } // bind inline style to toast  (check [Vue doc](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) for more examples)
});
```

if you need more details about [toast options](./toast_options.md)

## Remove Toast

You can remove toast by removeByName, removeByType or with toast variable.

```javascript
var myFirstToast = this.$toastr.Add({
  name: "UniqName", // this is give you ability to use removeByName method
  msg: "Hi", // Toast Message
  type: "error" // Toast type,
});
this.$toastr.Close(myFirstToast); // remove toast
this.$toastr.removeByName("UniqName"); // remove toast by name
this.$toastr.removeByType("error"); // remove all error type message
```

## Demo

Basic [Demo](https://github.com/s4l1h/vue-toastr/tree/master/demo) Files
