import vueToastr from './vue-toastr.js'
// import './vue-toastr.less'

// Change less to sass
import './vue-toastr.scss'

// Add Plugin capability.
vueToastr.install = function (Vue, options) {
  // console.log("install vuetoastr")
  // Create component instance
  let MyComponent = Vue.extend({
    template: '<vue-toastr :options="options" ref="vueToastr"></vue-toastr>',
    components: {
      'vue-toastr': vueToastr
    },
    data: function () {
      return {
        options: options || {}
      }
    }
  })
  // or, render off-document and append afterwards:
  var component = new MyComponent().$mount()
  // console.log(document.body, component.$el)
  document.body.appendChild(component.$el)
  // 4. add an instance method
  Vue.prototype.$toastr = component.$refs.vueToastr
}
// Install by default if using the script tag
// equal to Vue.use(window.vueToastr)
if (typeof window !== 'undefined' && window.Vue) {
  // console.log(window.Vue)
  window.Vue.use(vueToastr)
}
export default vueToastr
