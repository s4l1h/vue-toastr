import template from './vue-toastr.html'
import toast from './toast/toast.js'
export default {
  template: template,
  name: 'vueToastr',
  data () {
    var positions = ['toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left', 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-center', 'toast-bottom-center']
    var list = {}
    for (var i = 0; i <= positions.length - 1; i++) {
      list[positions[i]] = {}
    }
    return {
      positions,
      defaultPosition: 'toast-top-right',
      defaultType: 'success',
      defaultCloseOnHover: true,
      defaultTimeout: 5000,
      defaultProgressBar: true,
      defaultProgressBarValue: null,
      defaultPreventDuplicates: false,
      list,
      index: 0
    }
  },
  created () {
    // console.log("Created");
  },
  mounted () {
    // console.log("ready", this.list);
  },
  components: {
    toast
  },
  methods: {
    addToast (data) {
      this.index++
      data['index'] = this.index
      this.$set(this.list[data.position], this.index, data)
      // if have onCreated
      if (typeof data.onCreated !== 'undefined') {
        // wait doom update after call cb
        this.$nextTick(() => {
          data.onCreated()
        })
      }
    },
    removeToast (data) {
      var item = this.list[data.position][data.index]
      // console.log("remove toast", data, item);
      if (typeof item !== 'undefined') {
        this.$delete(this.list[data.position], data.index)
        // if have onClosed
        if (typeof data.onClosed !== 'undefined') {
          // wait doom update after call cb
          this.$nextTick(() => {
            data.onClosed()
          })
        }
      }
    },
    setProgress (data, newValue) {
      var item = this.list[data.position][data.index]
      if (typeof item !== 'undefined') {
        this.$set(item, 'progressBarValue', newValue)
      }
    },
    Add (d) {
      return this.AddData(this.processObjectData(d))
    },
    AddData (data) {
      if (typeof data !== 'object') {
        console.log('AddData accept only Object', data)
        return false
      }
      if (data.preventDuplicates) {
        var listKeys = Object.keys(this.list[data.position])
        for (var i = 0; i < listKeys.length; i++) {
          if (this.list[data.position][listKeys[i]].title === data.title && this.list[data.position][listKeys[i]].msg === data.msg) {
            console.log('Prevent Duplicates', data)
            return false
          }
        }
      }
      this.addToast(data)
      return data
    },
    processObjectData (data) {
      // if Object
      if (typeof data === 'object' && typeof data.msg !== 'undefined') {
        if (typeof data.position === 'undefined') {
          data.position = this.defaultPosition
        }
        if (typeof data.type === 'undefined') {
          data.type = this.defaultType
        }
        if (typeof data.timeout === 'undefined') {
          data.timeout = this.defaultTimeout
        }
        // have progressBar ?
        if (typeof data.progressbar === 'undefined') {
          data.progressbar = this.defaultProgressBar
        }
        // should progressBar be bound to timer or is set manually ?
        if (typeof data.progressBarValue === 'undefined') {
          data.progressBarValue = this.defaultProgressBarValue
        }

        if (typeof data.closeOnHover === 'undefined') {
          data.closeOnHover = this.defaultCloseOnHover
        }

        if (typeof data.preventDuplicates === 'undefined') {
          data.preventDuplicates = this.defaultPreventDuplicates
        }
        return data
      }
      // if String
      return {
        msg: data.toString(),
        position: this.defaultPosition,
        type: this.defaultType,
        timeout: this.defaultTimeout,
        closeOnHover: this.defaultCloseOnHover,
        progressbar: this.defaultProgressBar,
        progressBarValue: this.defaultProgressBarValue,
        preventDuplicates: this.defaultPreventDuplicates
      }
    },
    e (msg, title) {
      var data = this.processObjectData(msg)
      data['type'] = 'error'
      if (typeof title !== 'undefined') {
        data['title'] = title
      }
      return this.AddData(data)
    },
    s (msg, title) {
      var data = this.processObjectData(msg)
      data['type'] = 'success'
      if (typeof title !== 'undefined') {
        data['title'] = title
      }
      return this.AddData(data)
    },
    w (msg, title) {
      var data = this.processObjectData(msg)
      data['type'] = 'warning'
      if (typeof title !== 'undefined') {
        data['title'] = title
      }
      return this.AddData(data)
    },
    i (msg, title) {
      var data = this.processObjectData(msg)
      data['type'] = 'info'
      if (typeof title !== 'undefined') {
        data['title'] = title
      }
      return this.AddData(data)
    },
    Close (data) {
      // console.log(data)
      this.removeToast(data)
    },
    removeByType (toastType) {
      for (var i = 0; i < this.positions.length; i++) {
        var listKeys = Object.keys(this.list[this.positions[i]])
        for (var j = 0; j < listKeys.length; j++) {
          if (this.list[this.positions[i]][listKeys[j]]['type'] === toastType) {
            this.Close(this.list[this.positions[i]][listKeys[j]])
          }
        }
      }
    },
    clearAll () {
      for (var i = 0; i < this.positions.length; i++) {
        var listKeys = Object.keys(this.list[this.positions[i]])
        for (var j = 0; j < listKeys.length; j++) {
          this.Close(this.list[this.positions[i]][listKeys[j]])
        }
      }
    }
  }
}
