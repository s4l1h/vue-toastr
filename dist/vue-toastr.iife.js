var V=Object.defineProperty;var M=(o,s,d)=>s in o?V(o,s,{enumerable:!0,configurable:!0,writable:!0,value:d}):o[s]=d;var l=(o,s,d)=>(M(o,typeof s!="symbol"?s+"":s,d),d);var VueToastr=function(o,s){"use strict";var d="";const p=["toast-top-right","toast-bottom-right","toast-bottom-left","toast-top-left","toast-top-full-width","toast-bottom-full-width","toast-top-center","toast-bottom-center"];var f=(e,t)=>{const i=e.__vccOpts||e;for(const[a,n]of t)i[a]=n;return i};const B=s.defineComponent({name:"ToastProgress",props:{percent:{type:Number,default:100}},computed:{styleObject(){return{width:`${this.percent.toString()}%`}}}});function C(e,t,i,a,n,T){return s.openBlock(),s.createElementBlock("div",{class:"toast-progress",style:s.normalizeStyle(e.styleObject)},null,4)}var h=f(B,[["render",C]]);class r{constructor(t){l(this,"id");l(this,"params");l(this,"remaning");l(this,"estimated");l(this,"times");l(this,"stepTime");this.params=t,this.id=0,this.remaning=0,this.estimated=0,this.times={},this.stepTime=typeof t.stepTime=="undefined"?50:t.stepTime}callback(){this.times.callback=r.getTime(),this.remaning-=this.stepTime,this.estimated+=this.stepTime,this.callCallbackFN("callback"),this.remaning<=0&&this.finish()}static getTime(){return new Date().getTime()}getPercent(){return Math.floor(this.remaning/this.params.totalTime*100)}start(){this.times.started=r.getTime(),this.callCallbackFN("before:start"),this.remaning=this.params.totalTime,this.setupInterval(),this.callCallbackFN("after:start")}finish(){this.times.finished=r.getTime(),this.callCallbackFN("before:finish"),this.clearInterval(),this.callCallbackFN("after:finish")}stop(){this.times.stoped=r.getTime(),this.callCallbackFN("before:stop"),this.clearInterval(),this.callCallbackFN("after:stop")}pause(){this.times.paused=r.getTime(),this.callCallbackFN("before:pause"),this.clearInterval(),this.callCallbackFN("after:pause")}resume(){this.times.resumed=r.getTime(),this.callCallbackFN("before:resume"),this.setupInterval(),this.callCallbackFN("after:resume")}callCallbackFN(t){var i;((i=this.params)==null?void 0:i.callbackFunctions)&&typeof this.params.callbackFunctions[t]=="function"&&this.params.callbackFunctions[t]()}clearInterval(){clearInterval(this.id)}setupInterval(){this.id=setInterval(()=>{this.callback()},this.stepTime)}}const N=s.defineComponent({name:"Toast",components:{ToastProgress:h},props:{data:{type:Object,default:()=>({})}},data(){return{timeout:0,progressbar:!1,progressBarTimer:void 0,timeoutTimer:void 0}},mounted(){this.progressBarTimer&&this.progressBarTimer.start(),this.timeoutTimer&&this.timeoutTimer.start()},created(){typeof this.data.timeout!="undefined"&&this.data.timeout!==0?(this.timeoutTimer=new r({totalTime:this.data.timeout,stepTime:50,callbackFunctions:{"after:finish":()=>{this.close()}}}),this.data.progressbar!==!1&&(this.progressbar=!0,this.progressBarTimer=new r({totalTime:this.data.timeout}))):this.data.progressBarValue!==null&&this.data.progressbar!==!1&&(this.progressbar=!0)},computed:{classNames(){var e;return((e=this.data)==null?void 0:e.classNames)?["toast",`toast-${this.data.type}`].concat(this.data.classNames):["toast",`toast-${this.data.type}`]},progressBarPercent(){return this.data.progressBarValue!=null?this.data.progressBarValue:this.progressBarTimer!==void 0?this.progressBarTimer.getPercent():0}},beforeUnmount(){this.progressBarTimer!=null&&this.progressBarTimer.stop(),this.timeoutTimer!=null&&this.timeoutTimer.stop()},methods:{onMouseOver(){typeof this.data.onMouseOver!="undefined"&&this.data.onMouseOver(),this.data.closeOnHover&&(this.progressBarTimer!=null&&this.progressBarTimer.pause(),this.timeoutTimer!=null&&this.timeoutTimer.pause())},onMouseOut(){typeof this.data.onMouseOut!="undefined"&&this.data.onMouseOut(),this.data.closeOnHover&&(this.progressBarTimer!=null&&this.progressBarTimer.resume(),this.timeoutTimer!=null&&this.timeoutTimer.resume())},clicked(){typeof this.data.onClicked!="undefined"&&this.data.onClicked(),this.clickClose()},clickClose(){typeof this.data.clickClose!="undefined"&&this.data.clickClose===!1||this.close()},close(){this.$parent.Close(this.data)}}}),O=["innerHTML"],P=["innerHTML"];function $(e,t,i,a,n,T){const u=s.resolveComponent("toast-progress");return s.openBlock(),s.createElementBlock("div",{style:s.normalizeStyle([e.data.style,{display:"block"}]),class:s.normalizeClass(e.classNames),onClick:t[0]||(t[0]=c=>e.clicked()),onMouseover:t[1]||(t[1]=(...c)=>e.onMouseOver&&e.onMouseOver(...c)),onMouseout:t[2]||(t[2]=(...c)=>e.onMouseOut&&e.onMouseOut(...c))},[e.progressbar?(s.openBlock(),s.createBlock(u,{key:0,percent:e.progressBarPercent,ref:"progressBar"},null,8,["percent"])):s.createCommentVNode("",!0),e.data.title?(s.openBlock(),s.createElementBlock("div",{key:1,class:"toast-title",innerHTML:e.data.title},null,8,O)):s.createCommentVNode("",!0),e.data.msg?(s.openBlock(),s.createElementBlock("div",{key:2,class:"toast-message",innerHTML:e.data.msg},null,8,P)):s.createCommentVNode("",!0)],38)}var m=f(N,[["render",$]]);const g=s.reactive({}),v=s.reactive({}),D=s.defineComponent({name:"ToastContainer",props:{defaultClassNames:{type:Array,default:()=>[]},defaultPosition:{type:String,default:()=>"toast-top-right"},defaultType:{type:String,default:()=>"success"},defaultCloseOnHover:{type:Boolean,default:()=>!0},defaultTimeout:{type:Number,default:()=>5e3},defaultProgressBar:{type:Boolean,default:()=>!0},defaultProgressBarValue:{type:Number,default:()=>{}},defaultPreventDuplicates:{type:Boolean,default:()=>!1},defaultStyle:{type:Object,default:()=>({})}},components:{Toast:m},data(){for(let e=0;e<=p.length-1;e+=1)g[p[e]]={};return{positions:p,list:g,index:0,savedNames:v}},created(){},mounted(){},methods:{addToast(e){const t=e;this.index+=1,t.index=this.index,this.list[t.position][this.index]=t,typeof t.name!="undefined"&&(this.savedNames[t.name]=t),this.$nextTick(()=>{typeof t.onCreated!="undefined"&&t.onCreated()})},removeByName(e){typeof this.savedNames[e]!="undefined"&&(this.Close(this.savedNames[e]),delete this.savedNames[e])},removeToast(e){typeof this.list[e.position][e.index]!="undefined"&&(delete this.list[e.position][e.index],this.$nextTick(()=>{typeof e.onClosed!="undefined"&&e.onClosed()}))},setProgress(e,t){const i=this.list[e.position][e.index];typeof i!="undefined"&&(i.progressBarValue=t)},Add(e){return this.AddData(this.processObjectData(e))},AddData(e){if(typeof e!="object")return!1;if(e.preventDuplicates){const t=Object.keys(this.list[e.position]);for(let i=0;i<t.length;i+=1)if(this.list[e.position][t[i]].title===e.title&&this.list[e.position][t[i]].msg===e.msg)return!1}return this.addToast(e),e},processObjectData(e){const t=e;return typeof t=="object"&&typeof t.msg!="undefined"?(typeof t.classNames=="undefined"&&(t.classNames=this.defaultClassNames),typeof t.position=="undefined"&&(t.position=this.defaultPosition),typeof t.type=="undefined"&&(t.type=this.defaultType),typeof t.timeout=="undefined"&&(t.timeout=this.defaultTimeout),typeof t.progressbar=="undefined"&&(t.progressbar=this.defaultProgressBar),typeof t.progressBarValue=="undefined"&&(t.progressBarValue=this.defaultProgressBarValue),typeof t.closeOnHover=="undefined"&&(t.closeOnHover=this.defaultCloseOnHover),typeof t.preventDuplicates=="undefined"&&(t.preventDuplicates=this.defaultPreventDuplicates),typeof t.style=="undefined"&&(t.style=this.defaultStyle),t):{index:0,msg:t.toString(),position:this.defaultPosition,type:this.defaultType,timeout:this.defaultTimeout,closeOnHover:this.defaultCloseOnHover,progressbar:this.defaultProgressBar,progressBarValue:this.defaultProgressBarValue,preventDuplicates:this.defaultPreventDuplicates,style:this.defaultStyle,classNames:this.defaultClassNames}},e(e,t){const i=this.processObjectData(e);return i.type="error",t&&(i.title=t),this.AddData(i)},s(e,t){const i=this.processObjectData(e);return i.type="success",t&&(i.title=t),this.AddData(i)},w(e,t){const i=this.processObjectData(e);return i.type="warning",t&&(i.title=t),this.AddData(i)},i(e,t){const i=this.processObjectData(e);return i.type="info",t&&(i.title=t),this.AddData(i)},Close(e){this.removeToast(e)},removeByType(e){for(let t=0;t<this.positions.length;t+=1){const i=Object.keys(this.list[this.positions[t]]);for(let a=0;a<i.length;a+=1)this.list[this.positions[t]][i[a]].type===e&&this.Close(this.list[this.positions[t]][i[a]])}},clearAll(){for(let e=0;e<this.positions.length;e+=1){const t=Object.keys(this.list[this.positions[e]]);for(let i=0;i<t.length;i+=1)this.Close(this.list[this.positions[e]][t[i]])}}}});function j(e,t,i,a,n,T){const u=s.resolveComponent("Toast");return s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(e.list,(c,b)=>(s.openBlock(),s.createElementBlock("div",{class:s.normalizeClass("toast-container "+b),key:b},[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(c,k=>(s.openBlock(),s.createBlock(u,{data:k,key:k.index},null,8,["data"]))),128))],2))),128)}var y=f(D,[["render",j]]);const F={install:(e,t)=>{const i=s.createApp(y,t),a=document.createElement("div"),n=i.mount(a);document.body&&document.body.appendChild(a),e.config.globalProperties.$toastr=n,e.provide("toastr",n)}};return o.Toast=m,o.ToastContainer=y,o.ToastProgress=h,o.VueToastr=F,Object.defineProperty(o,"__esModule",{value:!0}),o[Symbol.toStringTag]="Module",o}({},Vue);
//# sourceMappingURL=vue-toastr.iife.js.map