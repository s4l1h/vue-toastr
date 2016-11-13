# vue-toastr

> This is master branch vue-toastr which works only with **Vue 2.x**. vue-toastr@**latest**

> For the **Vue 1.x** see the [1.0 branch](https://github.com/s4l1h/vue-toastr/tree/1.0). vue-toastr@**1.0.4**


**Note:**:closeOnHover,onMouseOver,onMouseOut works only **2.x**


### With npm & babel

*Add the Toast into the package.json. #for vue **1.x***

    npm install vue-toastr@^1.0.4 --save


*Add the Toast into the package.json. #for vue **2.x***

    npm install vue-toastr@^latest --save

*Add the toast in application and register component.*

    // import Toastr
    import Toastr from 'vue-toastr';
    // import toastr less file: need webpack less-loader
    require('vue-toastr/src/vue-toastr.less');
    // Register vue component
    Vue.component('vue-toastr',Toastr);

*Add component html: for vue **1.x***

    <vue-toastr v-ref:toastr></vue-toastr>

*Add component html: for vue **2.x***

    <vue-toastr ref="toastr"></vue-toastr>

*Now you can manage toastr* 

    this.$root.$refs.toastr.e("ERRROR MESSAGE");
    this.$root.$refs.toastr.s("SUCCESS MESSAGE");

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

Toastr for Vue.js no jquery dependencies https://github.com/s4l1h/vue-toastr

Demo: http://s4l1h.github.io/vue-toastr/


Ported From Jquery Toastr : http://codeseven.github.io/toastr/