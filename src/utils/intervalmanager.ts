import { IntervalTimeManagerOptions, StringNumberMap } from "../types";

class IntervalTimeManager {
    id: number;

    params: IntervalTimeManagerOptions;

    remaning: number;

    estimated: number;

    times: StringNumberMap;

    stepTime: number;

    constructor(params: IntervalTimeManagerOptions) {
        this.params = params;
        this.id = 0;
        this.remaning = 0;
        this.estimated = 0;
        this.times = {};
        this.stepTime =
            typeof params.stepTime === "undefined" ? 50 : params.stepTime;
    }

    callback(): void {
        this.times.callback = IntervalTimeManager.getTime();

        this.remaning -= this.stepTime;
        this.estimated += this.stepTime;

        this.callCallbackFN("callback");

        if (this.remaning <= 0) {
            this.finish();
        }
    }

    static getTime(): number {
        return new Date().getTime();
    }

    getPercent(): number {
        return Math.floor((this.remaning / this.params.totalTime) * 100);
    }

    start(): void {
        this.times.started = IntervalTimeManager.getTime();
        this.callCallbackFN("before:start");
        this.remaning = this.params.totalTime;
        this.setupInterval();
        this.callCallbackFN("after:start");
    }

    finish(): void {
        this.times.finished = IntervalTimeManager.getTime();
        this.callCallbackFN("before:finish");
        this.clearInterval();
        this.callCallbackFN("after:finish");
    }

    stop(): void {
        this.times.stoped = IntervalTimeManager.getTime();
        // People can stop manualy
        this.callCallbackFN("before:stop");
        this.clearInterval();
        this.callCallbackFN("after:stop");
    }

    pause(): void {
        this.times.paused = IntervalTimeManager.getTime();
        this.callCallbackFN("before:pause");
        this.clearInterval();
        this.callCallbackFN("after:pause");
    }

    resume(): void {
        this.times.resumed = IntervalTimeManager.getTime();
        this.callCallbackFN("before:resume");
        this.setupInterval();
        this.callCallbackFN("after:resume");
    }

    callCallbackFN(type: string): void {
        if (this.params?.callbackFunctions) {
            if (typeof this.params.callbackFunctions[type] === "function") {
                this.params.callbackFunctions[type]();
            }
        }
    }

    clearInterval(): void {
        clearInterval(this.id);
    }

    setupInterval(): void {
        // @ts-expect-error Node.js Timer
        this.id = setInterval(() => {
            this.callback();
        }, this.stepTime);
    }
}

export default IntervalTimeManager;
