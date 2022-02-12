var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineComponent, openBlock, createElementBlock, normalizeStyle, resolveComponent, normalizeClass, createBlock, createCommentVNode, reactive, Fragment, renderList, createApp } from "vue";
var main = "";
const positions = [
  "toast-top-right",
  "toast-bottom-right",
  "toast-bottom-left",
  "toast-top-left",
  "toast-top-full-width",
  "toast-bottom-full-width",
  "toast-top-center",
  "toast-bottom-center"
];
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const ToastProgress = defineComponent({
  name: "ToastProgress",
  props: {
    percent: {
      type: Number,
      default: 100
    }
  },
  computed: {
    styleObject() {
      return {
        width: `${this.percent.toString()}%`
      };
    }
  }
});
const _sfc_main$2 = ToastProgress;
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "toast-progress",
    style: normalizeStyle(_ctx.styleObject)
  }, null, 4);
}
var ToastProgress$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
class IntervalTimeManager {
  constructor(params) {
    __publicField(this, "id");
    __publicField(this, "params");
    __publicField(this, "remaning");
    __publicField(this, "estimated");
    __publicField(this, "times");
    __publicField(this, "stepTime");
    this.params = params;
    this.id = 0;
    this.remaning = 0;
    this.estimated = 0;
    this.times = {};
    this.stepTime = typeof params.stepTime === "undefined" ? 50 : params.stepTime;
  }
  callback() {
    this.times.callback = IntervalTimeManager.getTime();
    this.remaning -= this.stepTime;
    this.estimated += this.stepTime;
    this.callCallbackFN("callback");
    if (this.remaning <= 0) {
      this.finish();
    }
  }
  static getTime() {
    return new Date().getTime();
  }
  getPercent() {
    return Math.floor(this.remaning / this.params.totalTime * 100);
  }
  start() {
    this.times.started = IntervalTimeManager.getTime();
    this.callCallbackFN("before:start");
    this.remaning = this.params.totalTime;
    this.setupInterval();
    this.callCallbackFN("after:start");
  }
  finish() {
    this.times.finished = IntervalTimeManager.getTime();
    this.callCallbackFN("before:finish");
    this.clearInterval();
    this.callCallbackFN("after:finish");
  }
  stop() {
    this.times.stoped = IntervalTimeManager.getTime();
    this.callCallbackFN("before:stop");
    this.clearInterval();
    this.callCallbackFN("after:stop");
  }
  pause() {
    this.times.paused = IntervalTimeManager.getTime();
    this.callCallbackFN("before:pause");
    this.clearInterval();
    this.callCallbackFN("after:pause");
  }
  resume() {
    this.times.resumed = IntervalTimeManager.getTime();
    this.callCallbackFN("before:resume");
    this.setupInterval();
    this.callCallbackFN("after:resume");
  }
  callCallbackFN(type) {
    var _a;
    if ((_a = this.params) == null ? void 0 : _a.callbackFunctions) {
      if (typeof this.params.callbackFunctions[type] === "function") {
        this.params.callbackFunctions[type]();
      }
    }
  }
  clearInterval() {
    clearInterval(this.id);
  }
  setupInterval() {
    this.id = setInterval(() => {
      this.callback();
    }, this.stepTime);
  }
}
const _sfc_main$1 = defineComponent({
  name: "Toast",
  components: {
    ToastProgress: ToastProgress$1
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      timeout: 0,
      progressbar: false,
      progressBarTimer: void 0,
      timeoutTimer: void 0
    };
  },
  mounted() {
    if (this.progressBarTimer) {
      this.progressBarTimer.start();
    }
    if (this.timeoutTimer) {
      this.timeoutTimer.start();
    }
  },
  created() {
    if (typeof this.data.timeout !== "undefined" && this.data.timeout !== 0) {
      this.timeoutTimer = new IntervalTimeManager({
        totalTime: this.data.timeout,
        stepTime: 50,
        callbackFunctions: {
          "after:finish": () => {
            this.close();
          }
        }
      });
      if (this.data.progressbar !== false) {
        this.progressbar = true;
        this.progressBarTimer = new IntervalTimeManager({
          totalTime: this.data.timeout
        });
      }
    } else if (this.data.progressBarValue !== null && this.data.progressbar !== false) {
      this.progressbar = true;
    }
  },
  computed: {
    classNames() {
      var _a;
      if ((_a = this.data) == null ? void 0 : _a.classNames) {
        return ["toast", `toast-${this.data.type}`].concat(this.data.classNames);
      }
      return ["toast", `toast-${this.data.type}`];
    },
    progressBarPercent() {
      if (this.data.progressBarValue != null) {
        return this.data.progressBarValue;
      }
      if (this.progressBarTimer !== void 0) {
        return this.progressBarTimer.getPercent();
      }
      return 0;
    }
  },
  beforeUnmount() {
    if (this.progressBarTimer != null) {
      this.progressBarTimer.stop();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.stop();
    }
  },
  methods: {
    onMouseOver() {
      if (typeof this.data.onMouseOver !== "undefined") {
        this.data.onMouseOver();
      }
      if (this.data.closeOnHover) {
        if (this.progressBarTimer != null) {
          this.progressBarTimer.pause();
        }
        if (this.timeoutTimer != null) {
          this.timeoutTimer.pause();
        }
      }
    },
    onMouseOut() {
      if (typeof this.data.onMouseOut !== "undefined") {
        this.data.onMouseOut();
      }
      if (this.data.closeOnHover) {
        if (this.progressBarTimer != null) {
          this.progressBarTimer.resume();
        }
        if (this.timeoutTimer != null) {
          this.timeoutTimer.resume();
        }
      }
    },
    clicked() {
      if (typeof this.data.onClicked !== "undefined") {
        this.data.onClicked();
      }
      this.clickClose();
    },
    clickClose() {
      if (typeof this.data.clickClose !== "undefined" && this.data.clickClose === false) {
        return;
      }
      this.close();
    },
    close() {
      const parent = this.$parent;
      parent.Close(this.data);
    }
  }
});
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = ["innerHTML"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_toast_progress = resolveComponent("toast-progress");
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle([_ctx.data.style, { "display": "block" }]),
    class: normalizeClass(_ctx.classNames),
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.clicked()),
    onMouseover: _cache[1] || (_cache[1] = (...args) => _ctx.onMouseOver && _ctx.onMouseOver(...args)),
    onMouseout: _cache[2] || (_cache[2] = (...args) => _ctx.onMouseOut && _ctx.onMouseOut(...args))
  }, [
    _ctx.progressbar ? (openBlock(), createBlock(_component_toast_progress, {
      key: 0,
      percent: _ctx.progressBarPercent,
      ref: "progressBar"
    }, null, 8, ["percent"])) : createCommentVNode("", true),
    _ctx.data.title ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "toast-title",
      innerHTML: _ctx.data.title
    }, null, 8, _hoisted_1)) : createCommentVNode("", true),
    _ctx.data.msg ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: "toast-message",
      innerHTML: _ctx.data.msg
    }, null, 8, _hoisted_2)) : createCommentVNode("", true)
  ], 38);
}
var Toast = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const list = reactive({});
const savedNames = reactive({});
const _sfc_main = defineComponent({
  name: "ToastContainer",
  props: {
    defaultClassNames: {
      type: Array,
      default: () => []
    },
    defaultPosition: {
      type: String,
      default: () => "toast-top-right"
    },
    defaultType: {
      type: String,
      default: () => "success"
    },
    defaultCloseOnHover: {
      type: Boolean,
      default: () => true
    },
    defaultTimeout: {
      type: Number,
      default: () => 5e3
    },
    defaultProgressBar: {
      type: Boolean,
      default: () => true
    },
    defaultProgressBarValue: {
      type: Number,
      default: () => void 0
    },
    defaultPreventDuplicates: {
      type: Boolean,
      default: () => false
    },
    defaultStyle: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Toast
  },
  data() {
    for (let i = 0; i <= positions.length - 1; i += 1) {
      list[positions[i]] = {};
    }
    return {
      positions,
      list,
      index: 0,
      savedNames
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    addToast(opt) {
      const data = opt;
      this.index += 1;
      data.index = this.index;
      this.list[data.position][this.index] = data;
      if (typeof data.name !== "undefined") {
        this.savedNames[data.name] = data;
      }
      this.$nextTick(() => {
        if (typeof data.onCreated !== "undefined") {
          data.onCreated();
        }
      });
    },
    removeByName(name) {
      if (typeof this.savedNames[name] !== "undefined") {
        this.Close(this.savedNames[name]);
        delete this.savedNames[name];
      }
    },
    removeToast(data) {
      const item = this.list[data.position][data.index];
      if (typeof item !== "undefined") {
        delete this.list[data.position][data.index];
        this.$nextTick(() => {
          if (typeof data.onClosed !== "undefined") {
            data.onClosed();
          }
        });
      }
    },
    setProgress(data, newValue) {
      const item = this.list[data.position][data.index];
      if (typeof item !== "undefined") {
        item.progressBarValue = newValue;
      }
    },
    Add(d) {
      return this.AddData(this.processObjectData(d));
    },
    AddData(data) {
      if (typeof data !== "object") {
        return false;
      }
      if (data.preventDuplicates) {
        const listKeys = Object.keys(this.list[data.position]);
        for (let i = 0; i < listKeys.length; i += 1) {
          if (this.list[data.position][listKeys[i]].title === data.title && this.list[data.position][listKeys[i]].msg === data.msg) {
            return false;
          }
        }
      }
      this.addToast(data);
      return data;
    },
    processObjectData(opt) {
      const data = opt;
      if (typeof data === "object" && typeof data.msg !== "undefined") {
        if (typeof data.classNames === "undefined") {
          data.classNames = this.defaultClassNames;
        }
        if (typeof data.position === "undefined") {
          data.position = this.defaultPosition;
        }
        if (typeof data.type === "undefined") {
          data.type = this.defaultType;
        }
        if (typeof data.timeout === "undefined") {
          data.timeout = this.defaultTimeout;
        }
        if (typeof data.progressbar === "undefined") {
          data.progressbar = this.defaultProgressBar;
        }
        if (typeof data.progressBarValue === "undefined") {
          data.progressBarValue = this.defaultProgressBarValue;
        }
        if (typeof data.closeOnHover === "undefined") {
          data.closeOnHover = this.defaultCloseOnHover;
        }
        if (typeof data.preventDuplicates === "undefined") {
          data.preventDuplicates = this.defaultPreventDuplicates;
        }
        if (typeof data.style === "undefined") {
          data.style = this.defaultStyle;
        }
        return data;
      }
      return {
        index: 0,
        msg: data.toString(),
        position: this.defaultPosition,
        type: this.defaultType,
        timeout: this.defaultTimeout,
        closeOnHover: this.defaultCloseOnHover,
        progressbar: this.defaultProgressBar,
        progressBarValue: this.defaultProgressBarValue,
        preventDuplicates: this.defaultPreventDuplicates,
        style: this.defaultStyle,
        classNames: this.defaultClassNames
      };
    },
    e(msg, title) {
      const data = this.processObjectData(msg);
      data.type = "error";
      if (title) {
        data.title = title;
      }
      return this.AddData(data);
    },
    s(msg, title) {
      const data = this.processObjectData(msg);
      data.type = "success";
      if (title) {
        data.title = title;
      }
      return this.AddData(data);
    },
    w(msg, title) {
      const data = this.processObjectData(msg);
      data.type = "warning";
      if (title) {
        data.title = title;
      }
      return this.AddData(data);
    },
    i(msg, title) {
      const data = this.processObjectData(msg);
      data.type = "info";
      if (title) {
        data.title = title;
      }
      return this.AddData(data);
    },
    Close(data) {
      this.removeToast(data);
    },
    removeByType(toastType) {
      for (let i = 0; i < this.positions.length; i += 1) {
        const listKeys = Object.keys(this.list[this.positions[i]]);
        for (let j = 0; j < listKeys.length; j += 1) {
          if (this.list[this.positions[i]][listKeys[j]].type === toastType) {
            this.Close(this.list[this.positions[i]][listKeys[j]]);
          }
        }
      }
    },
    clearAll() {
      for (let i = 0; i < this.positions.length; i += 1) {
        const listKeys = Object.keys(this.list[this.positions[i]]);
        for (let j = 0; j < listKeys.length; j += 1) {
          this.Close(this.list[this.positions[i]][listKeys[j]]);
        }
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Toast = resolveComponent("Toast");
  return openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (toasts, position) => {
    return openBlock(), createElementBlock("div", {
      class: normalizeClass("toast-container " + position),
      key: position
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(toasts, (toast) => {
        return openBlock(), createBlock(_component_Toast, {
          data: toast,
          key: toast.index
        }, null, 8, ["data"]);
      }), 128))
    ], 2);
  }), 128);
}
var ToastContainer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const VueToastr = {
  install: (app, options) => {
    const toast = createApp(ToastContainer, options);
    const wrapper = document.createElement("div");
    const component = toast.mount(wrapper);
    if (document.body) {
      document.body.appendChild(wrapper);
    }
    app.config.globalProperties.$toastr = component;
    app.provide("toastr", component);
  }
};
export { Toast, ToastContainer, ToastProgress$1 as ToastProgress, VueToastr };
//# sourceMappingURL=vue-toastr.es.js.map
