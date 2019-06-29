const IntervalTimeManager = params => ({
  id: false,
  times: {},
  estimated: null,
  remaning: null,
  totalTime: params.totalTime || 5000,
  stepTime: params.stepTime || 50,
  callbackFunctions: params.callbackFunctions || {},
  callback() {
    this.times["callback"] = this.getTime();

    this.remaning = this.remaning - this.stepTime;
    this.estimated = this.estimated + this.stepTime;

    this.callCallbackFN("callback");

    if (this.remaning <= 0) {
      return this.finish();
    }
  },
  getTime() {
    return new Date().getTime();
  },
  getPercent() {
    return Math.floor((this.remaning / this.totalTime) * 100);
  },
  start() {
    this.times["started"] = this.getTime();
    this.callCallbackFN("before:start");
    this.remaning = this.totalTime;
    this._setupInterval();
    this.callCallbackFN("after:start");
  },
  finish() {
    this.times["finished"] = this.getTime();
    this.callCallbackFN("before:finish");
    this._clearInterval(this.id);
    this.callCallbackFN("after:finish");
  },
  stop() {
    this.times["stoped"] = this.getTime();
    // People can stop manualy
    this.callCallbackFN("before:stop");
    this._clearInterval(this.id);
    this.callCallbackFN("after:stop");
  },
  pause() {
    this.times["paused"] = this.getTime();
    this.callCallbackFN("before:pause");
    this._clearInterval(this.id);
    this.callCallbackFN("after:pause");
  },
  resume() {
    this.times["resumed"] = this.getTime();
    this.callCallbackFN("before:resume");
    this._setupInterval();
    this.callCallbackFN("after:resume");
  },
  callCallbackFN(type) {
    // console.log(this.callbackFunctions, type);
    if (typeof this.callbackFunctions[type] === "function") {
      this.callbackFunctions[type]();
    }
  },
  _clearInterval() {
    clearInterval(this.id);
  },
  _setupInterval() {
    this.id = setInterval(() => {
      this.callback();
    }, this.stepTime);
  }
});
export default IntervalTimeManager;
