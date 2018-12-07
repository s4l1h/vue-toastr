(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vueToastr"] = factory();
	else
		root["vueToastr"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vueToastr = __webpack_require__(19);
	
	var _vueToastr2 = _interopRequireDefault(_vueToastr);
	
	__webpack_require__(45);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Add Plugin capability.
	_vueToastr2.default.install = function (Vue, options) {
	  // console.log("install vuetoastr")
	  // Create component instance
	  var MyComponent = Vue.extend({
	    render: function render(createElement) {
	      return createElement(_vueToastr2.default, {
	        props: {
	          options: options
	        },
	        ref: 'vueToastr'
	      });
	    },
	    components: {
	      'vue-toastr': _vueToastr2.default
	    },
	    data: function data() {
	      return {
	        options: options || {}
	      };
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
	
	// import './vue-toastr.less'
	
	// Change less to sass
	if (typeof window !== 'undefined' && window.Vue) {
	  // console.log(window.Vue)
	  window.Vue.use(_vueToastr2.default);
	}
	exports.default = _vueToastr2.default;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(2)
	  , ctx       = __webpack_require__(29)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(11)
	  , defined = __webpack_require__(8);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(3)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(7);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(8);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(13)('wks')
	  , uid    = __webpack_require__(15)
	  , Symbol = __webpack_require__(4).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  render: function render(createElement) {
	    return createElement('div', {
	      class: 'toast-progress',
	      style: this.style
	    });
	  },
	  props: ['data'],
	  data: function data() {
	    return {
	      intervalId: false,
	      hideEta: false,
	      progressBarValue: this.data.progressBarValue,
	      style: {
	        width: '100%'
	      }
	    };
	  },
	  mounted: function mounted() {
	    if (this.progressBarValue === null) {
	      this.hideEta = new Date().getTime() + this.data.timeout;
	      this.setTimer();
	    } else {
	      this.updateProgress();
	    }
	  },
	  destroyed: function destroyed() {
	    clearInterval(this.intervalId);
	  },
	
	  methods: {
	    setTimer: function setTimer() {
	      var _this = this;
	
	      // console.log(this.hideEta)
	      this.intervalId = setInterval(function () {
	        _this.updateProgress();
	      }, 10);
	      // console.log(this.data.intervalId)
	    },
	    setValue: function setValue(newValue) {
	      this.progressBarValue = newValue;
	      this.updateProgress();
	    },
	    updateProgress: function updateProgress() {
	      var percentage;
	      if (this.progressBarValue === null) {
	        var diff = this.hideEta - new Date().getTime();
	        percentage = diff / this.data.timeout * 100;
	        percentage = Math.floor(percentage);
	        // console.log(diff, this.data.timeout, percentage)
	        this.style.width = percentage + '%';
	      } else {
	        percentage = Math.floor(this.progressBarValue);
	        this.style.width = percentage + '%';
	      }
	    }
	  }
	
	};
	module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(20);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _toastProgress = __webpack_require__(17);
	
	var _toastProgress2 = _interopRequireDefault(_toastProgress);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    toastProgress: _toastProgress2.default
	  },
	  render: function render(createElement) {
	    var toastChildNodes = [];
	    if (this.progressbar) {
	      toastChildNodes.push(createElement('toastProgress', {
	        props: {
	          data: this.data
	        },
	        ref: 'progressBar'
	      }));
	    }
	
	    if (this.data.title) {
	      toastChildNodes.push(createElement('div', {
	        class: 'toast-title',
	        domProps: {
	          innerHTML: this.data.title
	        }
	      }));
	    }
	
	    if (this.data.msg) {
	      toastChildNodes.push(createElement('div', {
	        class: 'toast-message',
	        domProps: {
	          innerHTML: this.data.msg
	        }
	      }));
	    }
	
	    return createElement('div', {
	      style: (0, _assign2.default)({ display: 'block' }, this.data.style),
	      class: 'toast toast-' + this.data.type,
	      on: {
	        click: this.clicked,
	        mouseover: this.onMouseOver,
	        mouseout: this.onMouseOut
	      }
	    }, toastChildNodes);
	  },
	  props: ['data'],
	  data: function data() {
	    return { progressbar: false, intervalId: false };
	  },
	  mounted: function mounted() {
	    // console.log("ready", this.data);
	  },
	  created: function created() {
	    // console.log("created", this.data);
	    if (typeof this.data.timeout !== 'undefined' && this.data.timeout !== 0) {
	      if (this.data.progressbar !== false) {
	        this.progressbar = true;
	      }
	      this.setTimeout();
	    } else if (this.data.progressBarValue !== null && this.data.progressbar !== false) {
	      this.progressbar = true;
	    }
	  },
	
	  watch: {
	    data: {
	      handler: function handler(val, oldVal) {
	        this.setProgressBarValue(val.progressBarValue);
	      },
	      deep: true
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.clearIntervalID();
	  },
	
	  methods: {
	    clearIntervalID: function clearIntervalID() {
	      // console.log(this.intervalId)
	      if (this.intervalId !== false) {
	        clearInterval(this.intervalId);
	      }
	      this.intervalId = false;
	    },
	
	    // Enter Hover
	    onMouseOver: function onMouseOver() {
	      // console.log("onMouseOver")
	      if (typeof this.data.onMouseOver !== 'undefined') {
	        this.data.onMouseOver();
	      }
	      if (!this.data.closeOnHover) {
	        this.clearIntervalID();
	      }
	    },
	
	    // Leave Hover
	    onMouseOut: function onMouseOut() {
	      // console.log("onMouseOut")
	      if (typeof this.data.onMouseOut !== 'undefined') {
	        this.data.onMouseOut();
	      }
	      if (!this.data.closeOnHover) {
	        this.setTimeout();
	      }
	    },
	
	    // Set timeout to close
	    setTimeout: function (_setTimeout) {
	      function setTimeout() {
	        return _setTimeout.apply(this, arguments);
	      }
	
	      setTimeout.toString = function () {
	        return _setTimeout.toString();
	      };
	
	      return setTimeout;
	    }(function () {
	      var _this = this;
	
	      // console.log("setTimeout")
	      this.intervalId = setTimeout(function () {
	        _this.close();
	      }, this.data.timeout);
	      // console.log(this.data.intervalId)
	    }),
	
	    // Set progress bar value if manually managed
	    setProgressBarValue: function setProgressBarValue(newValue) {
	      if (this.data.progressBarValue !== null) {
	        this.$refs.progressBar.setValue(newValue);
	      }
	    },
	
	    // Clicked Toast
	    clicked: function clicked() {
	      if (typeof this.data.onClicked !== 'undefined') {
	        this.data.onClicked();
	      }
	      this.cclose();
	    },
	
	    // Click Close?
	    cclose: function cclose() {
	      if (typeof this.data.clickClose !== 'undefined' && this.data.clickClose === false) {
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
	module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(23);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _keys = __webpack_require__(21);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _toast = __webpack_require__(18);
	
	var _toast2 = _interopRequireDefault(_toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  render: function render(createElement) {
	    var toastContainers = [];
	    for (var i = 0; i < this.positions.length; i++) {
	      var position = this.positions[i];
	      var toastNodes = [];
	
	      var listKeys = (0, _keys2.default)(this.list[position]);
	      for (var j = 0; j < listKeys.length; j++) {
	        var index = listKeys[j];
	        toastNodes.push(createElement('toast', {
	          props: {
	            data: this.list[position][index]
	          },
	          key: index
	        }));
	      }
	
	      toastContainers.push(createElement('div', {
	        class: 'toast-container ' + position,
	        key: position
	      }, toastNodes));
	    }
	    return createElement('div', toastContainers);
	  },
	  name: 'vueToastr',
	  props: ['options'],
	  data: function data() {
	    var positions = ['toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left', 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-center', 'toast-bottom-center'];
	    var list = {};
	    for (var i = 0; i <= positions.length - 1; i++) {
	      list[positions[i]] = {};
	    }
	    return {
	      positions: positions,
	      defaultPosition: this.processOption('defaultPosition', 'toast-top-right'),
	      defaultType: this.processOption('defaultType', 'success'),
	      defaultCloseOnHover: this.processOption('defaultCloseOnHover', true),
	      defaultTimeout: this.processOption('defaultTimeout', 5000),
	      defaultProgressBar: this.processOption('defaultProgressBar', true),
	      defaultProgressBarValue: this.processOption('defaultProgressBarValue', null),
	      defaultPreventDuplicates: this.processOption('defaultPreventDuplicates', false),
	      defaultStyle: this.processOption('defaultStyle', {}),
	      list: list,
	      index: 0,
	      savedNames: {}
	    };
	  },
	  created: function created() {
	    // console.log("Created");
	  },
	  mounted: function mounted() {
	    // console.log("ready", this.list);
	  },
	
	  components: {
	    toast: _toast2.default
	  },
	  methods: {
	    addToast: function addToast(data) {
	      this.index++;
	      data['index'] = this.index;
	      this.$set(this.list[data.position], this.index, data);
	      if (typeof data['name'] !== 'undefined') {
	        this.$set(this.savedNames, data['name'], data);
	      }
	      // if have onCreated
	      if (typeof data.onCreated !== 'undefined') {
	        // wait doom update after call cb
	        this.$nextTick(function () {
	          data.onCreated();
	        });
	      }
	    },
	    removeByName: function removeByName(name) {
	      if (typeof this.savedNames[name] !== 'undefined') {
	        this.Close(this.savedNames[name]);
	        this.$delete(this.savedNames, name);
	      }
	    },
	    removeToast: function removeToast(data) {
	      var item = this.list[data.position][data.index];
	      // console.log("remove toast", data, item);
	      if (typeof item !== 'undefined') {
	        this.$delete(this.list[data.position], data.index);
	        // if have onClosed
	        if (typeof data.onClosed !== 'undefined') {
	          // wait doom update after call cb
	          this.$nextTick(function () {
	            data.onClosed();
	          });
	        }
	      }
	    },
	    setProgress: function setProgress(data, newValue) {
	      var item = this.list[data.position][data.index];
	      if (typeof item !== 'undefined') {
	        this.$set(item, 'progressBarValue', newValue);
	      }
	    },
	    Add: function Add(d) {
	      return this.AddData(this.processObjectData(d));
	    },
	    AddData: function AddData(data) {
	      if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') {
	        console.log('AddData accept only Object', data);
	        return false;
	      }
	      if (data.preventDuplicates) {
	        var listKeys = (0, _keys2.default)(this.list[data.position]);
	        for (var i = 0; i < listKeys.length; i++) {
	          if (this.list[data.position][listKeys[i]].title === data.title && this.list[data.position][listKeys[i]].msg === data.msg) {
	            console.log('Prevent Duplicates', data);
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
	      return typeof this.options[optionValue] !== 'undefined' ? this.options[optionValue] : defaultValue;
	    },
	    processObjectData: function processObjectData(data) {
	      // if Object
	      if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object' && typeof data.msg !== 'undefined') {
	        if (typeof data.position === 'undefined') {
	          data.position = this.defaultPosition;
	        }
	        if (typeof data.type === 'undefined') {
	          data.type = this.defaultType;
	        }
	        if (typeof data.timeout === 'undefined') {
	          data.timeout = this.defaultTimeout;
	        }
	        // have progressBar ?
	        if (typeof data.progressbar === 'undefined') {
	          data.progressbar = this.defaultProgressBar;
	        }
	        // should progressBar be bound to timer or is set manually ?
	        if (typeof data.progressBarValue === 'undefined') {
	          data.progressBarValue = this.defaultProgressBarValue;
	        }
	
	        if (typeof data.closeOnHover === 'undefined') {
	          data.closeOnHover = this.defaultCloseOnHover;
	        }
	
	        if (typeof data.preventDuplicates === 'undefined') {
	          data.preventDuplicates = this.defaultPreventDuplicates;
	        }
	
	        if (typeof data.style === 'undefined') {
	          data.style = this.defaultStyle;
	        }
	        return data;
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
	        preventDuplicates: this.defaultPreventDuplicates,
	        style: this.defaultStyle
	      };
	    },
	    e: function e(msg, title) {
	      var data = this.processObjectData(msg);
	      data['type'] = 'error';
	      if (typeof title !== 'undefined') {
	        data['title'] = title;
	      }
	      return this.AddData(data);
	    },
	    s: function s(msg, title) {
	      var data = this.processObjectData(msg);
	      data['type'] = 'success';
	      if (typeof title !== 'undefined') {
	        data['title'] = title;
	      }
	      return this.AddData(data);
	    },
	    w: function w(msg, title) {
	      var data = this.processObjectData(msg);
	      data['type'] = 'warning';
	      if (typeof title !== 'undefined') {
	        data['title'] = title;
	      }
	      return this.AddData(data);
	    },
	    i: function i(msg, title) {
	      var data = this.processObjectData(msg);
	      data['type'] = 'info';
	      if (typeof title !== 'undefined') {
	        data['title'] = title;
	      }
	      return this.AddData(data);
	    },
	    Close: function Close(data) {
	      // console.log(data)
	      this.removeToast(data);
	    },
	    removeByType: function removeByType(toastType) {
	      for (var i = 0; i < this.positions.length; i++) {
	        var listKeys = (0, _keys2.default)(this.list[this.positions[i]]);
	        for (var j = 0; j < listKeys.length; j++) {
	          if (this.list[this.positions[i]][listKeys[j]]['type'] === toastType) {
	            this.Close(this.list[this.positions[i]][listKeys[j]]);
	          }
	        }
	      }
	    },
	    clearAll: function clearAll() {
	      for (var i = 0; i < this.positions.length; i++) {
	        var listKeys = (0, _keys2.default)(this.list[this.positions[i]]);
	        for (var j = 0; j < listKeys.length; j++) {
	          this.Close(this.list[this.positions[i]][listKeys[j]]);
	        }
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(25), __esModule: true };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Symbol = __webpack_require__(22)["default"];
	
	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};
	
	exports.__esModule = true;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(41);
	module.exports = __webpack_require__(2).Object.assign;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(42);
	module.exports = __webpack_require__(2).Object.keys;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	__webpack_require__(43);
	module.exports = __webpack_require__(2).Symbol;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(34);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(27);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(1);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(6)
	  , getNames  = __webpack_require__(1).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(1)
	  , createDesc = __webpack_require__(12);
	module.exports = __webpack_require__(9) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(7);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(1)
	  , toIObject = __webpack_require__(6);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(1)
	  , toObject = __webpack_require__(14)
	  , IObject  = __webpack_require__(11);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(3)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5)
	  , core    = __webpack_require__(2)
	  , fails   = __webpack_require__(3);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(1).setDesc
	  , has = __webpack_require__(10)
	  , TAG = __webpack_require__(16)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(37)});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(14);
	
	__webpack_require__(38)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ }),
/* 43 */
/***/ (function(module, exports) {



/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(1)
	  , global         = __webpack_require__(4)
	  , has            = __webpack_require__(10)
	  , DESCRIPTORS    = __webpack_require__(9)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(39)
	  , $fails         = __webpack_require__(3)
	  , shared         = __webpack_require__(13)
	  , setToStringTag = __webpack_require__(40)
	  , uid            = __webpack_require__(15)
	  , wks            = __webpack_require__(16)
	  , keyOf          = __webpack_require__(35)
	  , $names         = __webpack_require__(31)
	  , enumKeys       = __webpack_require__(30)
	  , isArray        = __webpack_require__(33)
	  , anObject       = __webpack_require__(28)
	  , toIObject      = __webpack_require__(6)
	  , createDesc     = __webpack_require__(12)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(36)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ])
});
;
//# sourceMappingURL=vue-toastr.js.map