!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.vueToastr=e():t.vueToastr=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="/dist/",e(0)}([function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(14),i=o(r);n(35),e["default"]=i["default"],t.exports=e["default"]},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var o=n(26),r=n(21);t.exports=function(t){return o(r(t))}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},function(t,e,n){t.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var o=n(2),r="__core-js_shared__",i=o[r]||(o[r]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+o).toString(36))}},function(t,e,n){var o=n(10)("wks"),r=n(11),i=n(2).Symbol;t.exports=function(t){return o[t]||(o[t]=i&&i[t]||(i||r)("Symbol."+t))}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(36),i=o(r);e["default"]={template:i["default"],props:["data"],ready:function(){},created:function(){("undefined"!=typeof this.data.timeout||0!=this.data.timeout)&&setTimeout(function(){this.close()}.bind(this),this.data.timeout)},methods:{clicked:function(){"undefined"!=typeof this.data.onClicked&&this.data.onClicked(),this.cclose()},cclose:function(){(void 0==this.data.clickClose||0!=this.data.clickClose)&&this.close()},close:function(){null!=this.$parent&&this.$parent.Close(this.data)}}},t.exports=e["default"]},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var r=n(16),i=o(r);Object.defineProperty(e,"__esModule",{value:!0});var u=n(37),s=o(u),a=n(13),c=o(a);e["default"]={template:s["default"],name:"vueToastr",data:function(){return{positions:["toast-top-right","toast-bottom-right","toast-bottom-left","toast-top-left","toast-top-full-width","toast-bottom-full-width","toast-top-center","toast-bottom-center"],defaultPosition:"toast-top-right",defaultType:"success",defaultTimeout:5e3,list:{}}},created:function(){for(var t=0;t<=this.positions.length-1;t++)this.list[this.positions[t]]=[]},ready:function(){},components:{toast:c["default"]},methods:{addToast:function(t){this.list[t.position].push(t),"undefined"!=typeof t.onCreated&&this.$nextTick(function(){t.onCreated()})},removeToast:function(t){"undefined"!=typeof t.onClosed&&t.onClosed(),this.list[t.position].$remove(t)},Add:function(t){return this.AddData(this.processObjectData(t))},AddData:function(t){return"object"!==("undefined"==typeof t?"undefined":(0,i["default"])(t))?(console.log("AddData accept only Object"),!1):(this.addToast(t),t)},processObjectData:function(t){return"object"==("undefined"==typeof t?"undefined":(0,i["default"])(t))&&"undefined"!=typeof t.msg?("undefined"==typeof t.position&&(t.position=this.defaultPosition),"undefined"==typeof t.type&&(t.type=this.defaultType),"undefined"==typeof t.timeout&&(t.timeout=this.defaultTimeout),t):{msg:t.toString(),position:this.defaultPosition,type:this.defaultType,timeout:this.defaultTimeout}},e:function(t,e){var n=this.processObjectData(t);return n.type="error","undefined"!=typeof e&&(n.title=e),this.AddData(n)},s:function(t,e){var n=this.processObjectData(t);return n.type="success","undefined"!=typeof e&&(n.title=e),this.AddData(n)},w:function(t,e){var n=this.processObjectData(t);return n.type="warning","undefined"!=typeof e&&(n.title=e),this.AddData(n)},i:function(t,e){var n=this.processObjectData(t);return n.type="info","undefined"!=typeof e&&(n.title=e),this.AddData(n)},Close:function(t){this.removeToast(t)}}},t.exports=e["default"]},function(t,e,n){t.exports={"default":n(17),__esModule:!0}},function(t,e,n){"use strict";var o=n(15)["default"];e["default"]=function(t){return t&&t.constructor===o?"symbol":typeof t},e.__esModule=!0},function(t,e,n){n(34),n(33),t.exports=n(5).Symbol},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var o=n(28);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var o=n(18);t.exports=function(t,e,n){if(o(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var o=n(1);t.exports=function(t){var e=o.getKeys(t),n=o.getSymbols;if(n)for(var r,i=n(t),u=o.isEnum,s=0;i.length>s;)u.call(t,r=i[s++])&&e.push(r);return e}},function(t,e,n){var o=n(2),r=n(5),i=n(20),u="prototype",s=function(t,e,n){var a,c,f,l=t&s.F,d=t&s.G,p=t&s.S,y=t&s.P,h=t&s.B,m=t&s.W,v=d?r:r[e]||(r[e]={}),b=d?o:p?o[e]:(o[e]||{})[u];d&&(n=e);for(a in n)c=!l&&b&&a in b,c&&a in v||(f=c?b[a]:n[a],v[a]=d&&"function"!=typeof b[a]?n[a]:h&&c?i(f,o):m&&b[a]==f?function(t){var e=function(e){return this instanceof t?new t(e):t(e)};return e[u]=t[u],e}(f):y&&"function"==typeof f?i(Function.call,f):f,y&&((v[u]||(v[u]={}))[a]=f))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,e,n){var o=n(3),r=n(1).getNames,i={}.toString,u="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return r(t)}catch(e){return u.slice()}};t.exports.get=function(t){return u&&"[object Window]"==i.call(t)?s(t):r(o(t))}},function(t,e,n){var o=n(1),r=n(9);t.exports=n(6)?function(t,e,n){return o.setDesc(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var o=n(4);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},function(t,e,n){var o=n(4);t.exports=Array.isArray||function(t){return"Array"==o(t)}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var o=n(1),r=n(3);t.exports=function(t,e){for(var n,i=r(t),u=o.getKeys(i),s=u.length,a=0;s>a;)if(i[n=u[a++]]===e)return n}},function(t,e){t.exports=!0},function(t,e,n){t.exports=n(25)},function(t,e,n){var o=n(1).setDesc,r=n(8),i=n(12)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,i)&&o(t,i,{configurable:!0,value:e})}},function(t,e){},function(t,e,n){"use strict";var o=n(1),r=n(2),i=n(8),u=n(6),s=n(23),a=n(31),c=n(7),f=n(10),l=n(32),d=n(11),p=n(12),y=n(29),h=n(24),m=n(22),v=n(27),b=n(19),g=n(3),x=n(9),O=o.getDesc,S=o.setDesc,_=o.create,w=h.get,j=r.Symbol,D=r.JSON,P=D&&D.stringify,T=!1,k=p("_hidden"),M=o.isEnum,C=f("symbol-registry"),E=f("symbols"),A="function"==typeof j,N=Object.prototype,F=u&&c(function(){return 7!=_(S({},"a",{get:function(){return S(this,"a",{value:7}).a}})).a})?function(t,e,n){var o=O(N,e);o&&delete N[e],S(t,e,n),o&&t!==N&&S(N,e,o)}:S,I=function(t){var e=E[t]=_(j.prototype);return e._k=t,u&&T&&F(N,t,{configurable:!0,set:function(e){i(this,k)&&i(this[k],t)&&(this[k][t]=!1),F(this,t,x(1,e))}}),e},J=function(t){return"symbol"==typeof t},W=function(t,e,n){return n&&i(E,e)?(n.enumerable?(i(t,k)&&t[k][e]&&(t[k][e]=!1),n=_(n,{enumerable:x(0,!1)})):(i(t,k)||S(t,k,x(1,{})),t[k][e]=!0),F(t,e,n)):S(t,e,n)},$=function(t,e){b(t);for(var n,o=m(e=g(e)),r=0,i=o.length;i>r;)W(t,n=o[r++],e[n]);return t},G=function(t,e){return void 0===e?_(t):$(_(t),e)},K=function(t){var e=M.call(this,t);return e||!i(this,t)||!i(E,t)||i(this,k)&&this[k][t]?e:!0},B=function(t,e){var n=O(t=g(t),e);return!n||!i(E,e)||i(t,k)&&t[k][e]||(n.enumerable=!0),n},z=function(t){for(var e,n=w(g(t)),o=[],r=0;n.length>r;)i(E,e=n[r++])||e==k||o.push(e);return o},q=function(t){for(var e,n=w(g(t)),o=[],r=0;n.length>r;)i(E,e=n[r++])&&o.push(E[e]);return o},H=function(t){if(void 0!==t&&!J(t)){for(var e,n,o=[t],r=1,i=arguments;i.length>r;)o.push(i[r++]);return e=o[1],"function"==typeof e&&(n=e),(n||!v(e))&&(e=function(t,e){return n&&(e=n.call(this,t,e)),J(e)?void 0:e}),o[1]=e,P.apply(D,o)}},L=c(function(){var t=j();return"[null]"!=P([t])||"{}"!=P({a:t})||"{}"!=P(Object(t))});A||(j=function(){if(J(this))throw TypeError("Symbol is not a constructor");return I(d(arguments.length>0?arguments[0]:void 0))},a(j.prototype,"toString",function(){return this._k}),J=function(t){return t instanceof j},o.create=G,o.isEnum=K,o.getDesc=B,o.setDesc=W,o.setDescs=$,o.getNames=h.get=z,o.getSymbols=q,u&&!n(30)&&a(N,"propertyIsEnumerable",K,!0));var Q={"for":function(t){return i(C,t+="")?C[t]:C[t]=j(t)},keyFor:function(t){return y(C,t)},useSetter:function(){T=!0},useSimple:function(){T=!1}};o.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(t){var e=p(t);Q[t]=A?e:I(e)}),T=!0,s(s.G+s.W,{Symbol:j}),s(s.S,"Symbol",Q),s(s.S+s.F*!A,"Object",{create:G,defineProperty:W,defineProperties:$,getOwnPropertyDescriptor:B,getOwnPropertyNames:z,getOwnPropertySymbols:q}),D&&s(s.S+s.F*(!A||L),"JSON",{stringify:H}),l(j,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e){},function(t,e){t.exports='<div class="toast toast-{{data.type}}" style="display: block" @click=clicked()><div class=toast-title>{{{data.title}}}</div><div class=toast-message>{{{data.msg}}}</div></div>'},function(t,e){t.exports='<div class="toast-container {{k}}" v-for="(k,m) in list"><toast :data=mm v-for="mm in m"></toast></div>'}])});
//# sourceMappingURL=vue-toastr.js.map