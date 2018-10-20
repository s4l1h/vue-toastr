# vue-toastr

> This is master branch vue-toastr which works only with **Vue 2.x**. vue-toastr@**latest**

> For the **Vue 1.x** see the [1.0 branch](https://github.com/s4l1h/vue-toastr/tree/1.0). vue-toastr@**1.0.4**


**Note:**:closeOnHover,onMouseOver,onMouseOut works only **2.x**


### With npm & babel

*Add the Toast into the package.json. #for vue **1.x***

    npm install vue-toastr@^1.0.4 --save


*Add the Toast into the package.json. #for vue **2.x***

    npm install vue-toastr@latest --save

*Add the toast in application and register component.*

    // import Toastr
    import Toastr from 'vue-toastr';
    // import toastr scss file: need webpack sass-loader
    require('vue-toastr/src/vue-toastr.scss
    ');
    // Register vue component
    Vue.component('vue-toastr',Toastr);
***Plugin** mode (work only vue 2.x)*

    // import Toastr
    import Toastr from 'vue-toastr';
    // import toastr scss file: need webpack sass-loader
    require('vue-toastr/src/vue-toastr.scss');
    // Register plugin
    Vue.use(Toastr);
***Plugin** Mode vue **2.x***

    this.$toastr // use plugin mode autoamatic installed if you use browser.

*Add component html: for vue **1.x***

    <vue-toastr v-ref:toastr></vue-toastr>

*Add component html: for vue **2.x***

    <vue-toastr ref="toastr"></vue-toastr>

*Now you can manage toastr*

    // use component
    this.$root.$refs.toastr.e("ERRROR MESSAGE");
    this.$root.$refs.toastr.s("SUCCESS MESSAGE");
    // use plugin
    this.$toastr.e("ERRROR MESSAGE");
    this.$toastr.s("SUCCESS MESSAGE");

### without npm

http://s4l1h.github.io/vue-toastr/

### Development Setup

``` bash
# install deps
npm install

# serve examples at http://localhost:8080/
npm run dev
# build  dist/vue-toastr.js dist/vue-toastr.css
npm run build
# build for production min version. dist/vue-toastr.min.js dist/vue-toastr.min.css
npm run build_min
# build for production js+css combine. dist/vue-toastr.combine.min.js
npm run build_combine
# clear All builds.. rm -rf dist/*
npm run clear
#Build all. npm run build && npm run build_min && npm run build_combine
npm run buildAll
```

## Doc # Overwrite Settings

#### Change Default Toast Timeout
```
this.$refs.toastr.defaultTimeout = 3000; // default timeout : 5000
```
#### Change Default Toast ProgressBar
```
this.$refs.toastr.defaultProgressBar = false; // default active : true
```
#### Change Default Toast ProgressBar Manual Value
```
this.$refs.toastr.defaultProgressBarValue = 0; // default value : null (managed by JS timer)
```
#### Change Default Toast Type
```
this.$refs.toastr.defaultType = "error"; // default type : success
```
#### Change Default Position
```
this.$refs.toastr.defaultPosition = "toast-bottom-left" // default position: toast-top-right
```
#### Change Default Close On Mouse Hover
```
this.$refs.toastr.defaultCloseOnHover = false // default close on hover: true
```

#### Change Default Style
```
this.$refs.toastr.defaultStyle = { background-color: 'red' } // default style of toast: {} (empty object)
```

## Doc # method
#### New Error Type Toast Message
```
this.$refs.toastr.e("this.$refs.toastr.e message", "Error");
```
#### New Success Type Toast Message
```
this.$refs.toastr.s("this.$refs.toastr.s message");
```
#### New Warning Type Toast Message
```
this.$refs.toastr.w("this.$refs.toastr.w message", "Warning");
```
#### New Information Type Toast Message
```
this.$refs.toastr.i("this.$refs.toastr.i message", "Information");
```
#### Remove Toast Messages by type.
```
this.$refs.toastr.removeByType("error"); // error, warning, success, info
```
#### Remove Toast Messages by Name.
```
this.$refs.toastr.removeByName("UniqueToastName");
```
#### New Toast Message with default options.
```
this.$refs.toastr.Add("Working on the default options");
```
#### New Toast Message with options.
```
this.$root.$refs.toastr.Add({
    name: "UniqueToastName", // Toast Name now you can remove by name
    title: "Easy Toast", // Toast Title
    msg: "Hi", // Message
    clickClose: false, // Click Close Disable
    timeout: 0, // Remember defaultTimeout is 5 sec..
    progressBarValue: 0, // Manually update progress bar value later; null (not 0) is default
    position: "toast-top-full-width", // Toast Position.
    type: "error", // Toast type,
    preventDuplicates: true, //Default is false,
    style: { backgroundColor: 'blue',width:'150px' } // bind inline style to toast (check (Vue docs)[https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles] for more examples)
});
```
## Doc # Options
```
{
        name: "Name Of The Toast",
        title: "Toast Title",
        msg: "Toast Msg",
        position: Toast position string can be  'toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left', 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-center', 'toast-bottom-center' ; default toast-top-right
        type: Toast type can be : info,warning,error,success ; default success
        timeout: Toast Timeout for auto close can be integer ; default 5000
        progressbar: Progress Bar option need timeout or progressBarValue. can be boolean; default true
        progressBarValue: Initial value of the progress bar in percents (0..100), default null which does mean the progress bar is controlled by timeout; use this.$root.$refs.toastr.setProgress(aToast, newValue) later
        style: Inline style option should be an object with key: value structure. default { } (empty object)
        closeOnHover: On mouse over stop timeout can be boolean; default true
        clickClose: On click toast close can be boolean; default false
        onCreated: On created toast event can be function
        onClicked: On clicked toast event can be function
        onClosed: On closed toast event can be function
        onMouseOver: On mouse over toast event can be function
        onMouseOut: On mouse over toast event can be function
}
```

### Note:
Pls for more details and example:
https://github.com/s4l1h/vue-toastr/blob/master/demo.js


Toastr for Vue.js no jquery dependencies https://github.com/s4l1h/vue-toastr

Demo: http://s4l1h.github.io/vue-toastr/


Ported From Jquery Toastr : http://codeseven.github.io/toastr/
