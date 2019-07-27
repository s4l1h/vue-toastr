/*!
 * vue-toastr v2.1.2 
 * (c) 2019 s4l1h
 * Released under the MIT License.
 */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

//
//
//
var script = {
  props: {
    percent: {
      type: Number,
      default: 100
    }
  },
  computed: {
    style: function style() {
      return {
        width: this.percent.toString() + "%"
      };
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"toast-progress",style:(_vm.style)})};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ToastProgress = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var IntervalTimeManager = function IntervalTimeManager(params) {
  return {
    id: false,
    times: {},
    estimated: null,
    remaning: null,
    totalTime: params.totalTime || 5000,
    stepTime: params.stepTime || 50,
    callbackFunctions: params.callbackFunctions || {},
    callback: function callback() {
      this.times["callback"] = this.getTime();
      this.remaning = this.remaning - this.stepTime;
      this.estimated = this.estimated + this.stepTime;
      this.callCallbackFN("callback");

      if (this.remaning <= 0) {
        return this.finish();
      }
    },
    getTime: function getTime() {
      return new Date().getTime();
    },
    getPercent: function getPercent() {
      return Math.floor(this.remaning / this.totalTime * 100);
    },
    start: function start() {
      this.times["started"] = this.getTime();
      this.callCallbackFN("before:start");
      this.remaning = this.totalTime;

      this._setupInterval();

      this.callCallbackFN("after:start");
    },
    finish: function finish() {
      this.times["finished"] = this.getTime();
      this.callCallbackFN("before:finish");

      this._clearInterval(this.id);

      this.callCallbackFN("after:finish");
    },
    stop: function stop() {
      this.times["stoped"] = this.getTime(); // People can stop manualy

      this.callCallbackFN("before:stop");

      this._clearInterval(this.id);

      this.callCallbackFN("after:stop");
    },
    pause: function pause() {
      this.times["paused"] = this.getTime();
      this.callCallbackFN("before:pause");

      this._clearInterval(this.id);

      this.callCallbackFN("after:pause");
    },
    resume: function resume() {
      this.times["resumed"] = this.getTime();
      this.callCallbackFN("before:resume");

      this._setupInterval();

      this.callCallbackFN("after:resume");
    },
    callCallbackFN: function callCallbackFN(type) {
      // console.log(this.callbackFunctions, type);
      if (typeof this.callbackFunctions[type] === "function") {
        this.callbackFunctions[type]();
      }
    },
    _clearInterval: function _clearInterval() {
      clearInterval(this.id);
    },
    _setupInterval: function _setupInterval() {
      var _this = this;

      this.id = setInterval(function () {
        _this.callback();
      }, this.stepTime);
    }
  };
};

//
var script$1 = {
  components: {
    ToastProgress: ToastProgress
  },
  props: ["data"],
  data: function data() {
    return {
      progressbar: false,
      progressBarTimer: null,
      timeoutTimer: null
    };
  },
  mounted: function mounted() {
    // console.log("ready", this.data);
    if (this.progressBarTimer != null) {
      this.progressBarTimer.start();
    }

    if (this.timeoutTimer != null) {
      this.timeoutTimer.start();
    }
  },
  created: function created() {
    var _this = this;

    if (typeof this.data.timeout !== "undefined" && this.data.timeout !== 0) {
      // SetUP timeout Manager
      this.timeoutTimer = IntervalTimeManager({
        totalTime: this.data.timeout,
        callbackFunctions: {
          "after:finish": function afterFinish() {
            _this.close(); // console.log("Timeout Fired");

          }
        }
      }); // SetUP progressbar Time Manager

      if (this.data.progressbar !== false) {
        this.progressbar = true;
        this.progressBarTimer = IntervalTimeManager({
          totalTime: this.data.timeout
        });
      }
    } else if (this.data.progressBarValue !== null && this.data.progressbar !== false) {
      this.progressbar = true;
    }
  },
  computed: {
    classNames: function classNames() {
      return ["toast", "toast-" + this.data.type].concat(this.data.classNames);
    },
    progressBarPercent: function progressBarPercent() {
      if (this.data.progressBarValue != null) {
        return this.data.progressBarValue;
      }

      return this.progressBarTimer.getPercent();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.progressBarTimer != null) {
      this.progressBarTimer.stop();
    }

    if (this.timeoutTimer != null) {
      this.timeoutTimer.stop();
    }
  },
  methods: {
    // Enter Hover
    onMouseOver: function onMouseOver() {
      // console.log("onMouseOver")
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
    // Leave Hover
    onMouseOut: function onMouseOut() {
      // console.log("onMouseOut")
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
    // Clicked Toast
    clicked: function clicked() {
      if (typeof this.data.onClicked !== "undefined") {
        this.data.onClicked();
      }

      this.clickClose();
    },
    // Click Close?
    clickClose: function clickClose() {
      if (typeof this.data.clickClose !== "undefined" && this.data.clickClose === false) {
        return;
      }

      this.close();
    },
    // Close Toast
    close: function close() {
      // console.log(typeof this.$parent, this);
      // if toast not manuel closed.
      if (this.$parent != null) {
        this.$parent.Close(this.data);
      }
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classNames,staticStyle:{"display":"block"},style:(_vm.data.style),on:{"click":function($event){return _vm.clicked()},"mouseover":_vm.onMouseOver,"mouseout":_vm.onMouseOut}},[(_vm.progressbar)?_c('toast-progress',{ref:"progressBar",attrs:{"percent":_vm.progressBarPercent}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"toast-title",domProps:{"innerHTML":_vm._s(_vm.data.title)}}),_vm._v(" "),_c('div',{staticClass:"toast-message",domProps:{"innerHTML":_vm._s(_vm.data.msg)}})],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var toast = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var script$2 = {
  name: "VueToastr",
  props: {
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    var positions = ["toast-top-right", "toast-bottom-right", "toast-bottom-left", "toast-top-left", "toast-top-full-width", "toast-bottom-full-width", "toast-top-center", "toast-bottom-center"];
    var list = {};

    for (var i = 0; i <= positions.length - 1; i++) {
      list[positions[i]] = {};
    }

    return {
      positions: positions,
      defaultClassNames: this.processOption("defaultClassNames", []),
      defaultPosition: this.processOption("defaultPosition", "toast-top-right"),
      defaultType: this.processOption("defaultType", "success"),
      defaultCloseOnHover: this.processOption("defaultCloseOnHover", true),
      defaultTimeout: this.processOption("defaultTimeout", 5000),
      defaultProgressBar: this.processOption("defaultProgressBar", true),
      defaultProgressBarValue: this.processOption("defaultProgressBarValue", null),
      defaultPreventDuplicates: this.processOption("defaultPreventDuplicates", false),
      defaultStyle: this.processOption("defaultStyle", {}),
      list: list,
      index: 0,
      savedNames: {}
    };
  },
  created: function created() {// console.log("Created");
  },
  mounted: function mounted() {// console.log("ready", this.list);
  },
  components: {
    toast: toast
  },
  methods: {
    addToast: function addToast(data) {
      this.index++;
      data["index"] = this.index;
      this.$set(this.list[data.position], this.index, data);

      if (typeof data["name"] !== "undefined") {
        this.$set(this.savedNames, data["name"], data);
      } // if have onCreated


      if (typeof data.onCreated !== "undefined") {
        // wait doom update after call cb
        this.$nextTick(function () {
          data.onCreated();
        });
      }
    },
    removeByName: function removeByName(name) {
      if (typeof this.savedNames[name] !== "undefined") {
        this.Close(this.savedNames[name]);
        this.$delete(this.savedNames, name);
      }
    },
    removeToast: function removeToast(data) {
      var item = this.list[data.position][data.index]; // console.log("remove toast", data, item);

      if (typeof item !== "undefined") {
        this.$delete(this.list[data.position], data.index); // if have onClosed

        if (typeof data.onClosed !== "undefined") {
          // wait doom update after call cb
          this.$nextTick(function () {
            data.onClosed();
          });
        }
      }
    },
    setProgress: function setProgress(data, newValue) {
      var item = this.list[data.position][data.index];

      if (typeof item !== "undefined") {
        this.$set(item, "progressBarValue", newValue);
      }
    },
    Add: function Add(d) {
      return this.AddData(this.processObjectData(d));
    },
    AddData: function AddData(data) {
      if (_typeof(data) !== "object") {
        //console.log("AddData accept only Object", data);
        return false;
      }

      if (data.preventDuplicates) {
        var listKeys = Object.keys(this.list[data.position]);

        for (var i = 0; i < listKeys.length; i++) {
          if (this.list[data.position][listKeys[i]].title === data.title && this.list[data.position][listKeys[i]].msg === data.msg) {
            //console.log("Prevent Duplicates", data);
            return false;
          }
        }
      }

      this.addToast(data);
      return data;
    },
    processOption: function processOption(optionValue, defaultValue) {
      if (!this.options) {
        return defaultValue;
      }

      return typeof this.options[optionValue] !== "undefined" ? this.options[optionValue] : defaultValue;
    },
    processObjectData: function processObjectData(data) {
      // if Object
      if (_typeof(data) === "object" && typeof data.msg !== "undefined") {
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
        } // have progressBar ?


        if (typeof data.progressbar === "undefined") {
          data.progressbar = this.defaultProgressBar;
        } // should progressBar be bound to timer or is set manually ?


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
      } // if String


      return {
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
    e: function e(msg, title) {
      var data = this.processObjectData(msg);
      data["type"] = "error";

      if (typeof title !== "undefined") {
        data["title"] = title;
      }

      return this.AddData(data);
    },
    s: function s(msg, title) {
      var data = this.processObjectData(msg);
      data["type"] = "success";

      if (typeof title !== "undefined") {
        data["title"] = title;
      }

      return this.AddData(data);
    },
    w: function w(msg, title) {
      var data = this.processObjectData(msg);
      data["type"] = "warning";

      if (typeof title !== "undefined") {
        data["title"] = title;
      }

      return this.AddData(data);
    },
    i: function i(msg, title) {
      var data = this.processObjectData(msg);
      data["type"] = "info";

      if (typeof title !== "undefined") {
        data["title"] = title;
      }

      return this.AddData(data);
    },
    Close: function Close(data) {
      // console.log(data)
      this.removeToast(data);
    },
    removeByType: function removeByType(toastType) {
      for (var i = 0; i < this.positions.length; i++) {
        var listKeys = Object.keys(this.list[this.positions[i]]);

        for (var j = 0; j < listKeys.length; j++) {
          if (this.list[this.positions[i]][listKeys[j]]["type"] === toastType) {
            this.Close(this.list[this.positions[i]][listKeys[j]]);
          }
        }
      }
    },
    clearAll: function clearAll() {
      for (var i = 0; i < this.positions.length; i++) {
        var listKeys = Object.keys(this.list[this.positions[i]]);

        for (var j = 0; j < listKeys.length; j++) {
          this.Close(this.list[this.positions[i]][listKeys[j]]);
        }
      }
    }
  }
};

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}

var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.list),function(toasts,position){return _c('div',{key:position,class:'toast-container ' + position},_vm._l((toasts),function(toast,index){return _c('toast',{key:index,attrs:{"data":toast}})}),1)}),0)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-578ba195_0", { source: ".toast-title{font-weight:700}.toast-message{-ms-word-wrap:break-word;word-wrap:break-word}.toast-message a,.toast-message label{color:#fff}.toast-message a:hover{color:#ccc;text-decoration:none}.toast-close-button{position:relative;right:-.3em;top:-.3em;float:right;font-size:20px;font-weight:700;color:#fff;-webkit-text-shadow:0 1px 0 #fff;text-shadow:0 1px 0 #fff;opacity:.8}.toast-close-button:focus,.toast-close-button:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.4}button.toast-close-button{padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}.toast-top-center{top:0;right:0;width:100%}.toast-bottom-center{bottom:0;right:0;width:100%}.toast-top-full-width{top:0;right:0;width:100%}.toast-bottom-full-width{bottom:0;right:0;width:100%}.toast-top-left{top:12px;left:12px}.toast-top-right{top:12px;right:12px}.toast-bottom-right{right:12px;bottom:12px}.toast-bottom-left{bottom:12px;left:12px}.toast-container{position:fixed;z-index:999999;pointer-events:none}.toast-container *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.toast-container>div{position:relative;pointer-events:auto;overflow:hidden;margin:0 0 6px;padding:15px 15px 15px 50px;width:300px;-moz-border-radius:3px 3px 3px 3px;-webkit-border-radius:3px 3px 3px 3px;border-radius:3px 3px 3px 3px;background-position:15px center;background-repeat:no-repeat;-moz-box-shadow:0 0 12px #999;-webkit-box-shadow:0 0 12px #999;box-shadow:0 0 12px #999;color:#fff;opacity:.8}.toast-container>:hover{-moz-box-shadow:0 0 12px #000;-webkit-box-shadow:0 0 12px #000;box-shadow:0 0 12px #000;opacity:1;cursor:pointer}.toast-container>.toast-info{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=)!important}.toast-container>.toast-error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=)!important}.toast-container>.toast-success{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==)!important}.toast-container>.toast-warning{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=)!important}.toast-container.toast-bottom-center>div,.toast-container.toast-top-center>div{width:300px;margin-left:auto;margin-right:auto}.toast-container.toast-bottom-full-width>div,.toast-container.toast-top-full-width>div{width:96%;margin-left:auto;margin-right:auto}.toast{background-color:#030303}.toast-success{background-color:#51a351}.toast-error{background-color:#bd362f}.toast-info{background-color:#2f96b4}.toast-warning{background-color:#f89406}.toast-progress{position:absolute;left:0;bottom:0;height:4px;background-color:#000;opacity:.4}@media all and (max-width:240px){.toast-container>div{padding:8px 8px 8px 50px;width:11em}.toast-container .toast-close-button{right:-.2em;top:-.2em}}@media all and (min-width:241px) and (max-width:480px){.toast-container>div{padding:8px 8px 8px 50px;width:18em}.toast-container .toast-close-button{right:-.2em;top:-.2em}}@media all and (min-width:481px) and (max-width:768px){.toast-container>div{padding:15px 15px 15px 50px;width:25em}}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var VueToastr = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );

VueToastr.install = function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // console.log("install vuetoastr")
  // Create component instance
  var MyComponent = Vue.extend({
    render: function render(h) {
      return h(VueToastr, {
        props: {
          options: options
        },
        ref: "vueToastr"
      });
    }
  }); // or, render off-document and append afterwards:

  var component = new MyComponent().$mount(); // console.log(document.body, component.$el)

  document.body.appendChild(component.$el); // 4. add an instance method

  Vue.prototype.$toastr = component.$refs.vueToastr;
}; // Install by default if using the script tag
// equal to Vue.use(window.vueToastr)


if (typeof window !== "undefined" && window.Vue) {
  // console.log(window.Vue)
  window.Vue.use(VueToastr);
}

/* script */
const __vue_script__$3 = VueToastr;

/* template */

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VueToastr$1 = normalizeComponent_1(
    {},
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

// export { default } from "./components/VueToastr.vue";

export default VueToastr$1;
