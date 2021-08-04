import { IntervalTimeManagerOptions, StringNumberMap } from "../types";
declare class IntervalTimeManager {
    id: number;
    params: IntervalTimeManagerOptions;
    remaning: number;
    estimated: number;
    times: StringNumberMap;
    stepTime: number;
    constructor(params: IntervalTimeManagerOptions);
    callback(): void;
    static getTime(): number;
    getPercent(): number;
    start(): void;
    finish(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    callCallbackFN(type: string): void;
    clearInterval(): void;
    setupInterval(): void;
}
export default IntervalTimeManager;
//# sourceMappingURL=intervalmanager.d.ts.map