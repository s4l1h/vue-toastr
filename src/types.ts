import { positions, types } from "./utils/config";
import IntervalTimeManager from "./utils/intervalmanager";

export interface StringNumberMap {
    [key: string]: number;
}

export interface callbackFunctionsInterface {
    [key: string]: CallbackFunctionVariadic;
}
export type CallbackFunctionVariadic = (...args: unknown[]) => void;

export interface ToastInterface {
    progressbar: boolean;
    progressBarTimer?: IntervalTimeManager;
    timeoutTimer?: IntervalTimeManager;
}

export type ToastPosition = typeof positions[number];

export type ToastType = typeof types[number];

export interface ToastOptions {
    index: number;
    name?: string;
    title?: string;
    msg: string;
    position: ToastPosition;
    type?: ToastType;
    preventDuplicates?: boolean;
    classNames?: Array<string>;
    style?: {};
    timeout?: number;
    closeOnHover?: boolean;
    clickClose?: boolean;
    onCreated?: () => void;
    onClosed?: () => void;
    onClicked?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    progressbar?: boolean;
    progressBarValue?: number;
}

export interface ToastDefaultOptions {
    defaultClassNames?: Array<string>;
    defaultPosition?: ToastPosition;
    defaultType?: ToastType;
    defaultCloseOnHover?: boolean;
    defaultTimeout?: number;
    defaultProgressBar?: boolean;
    defaultProgressBarValue?: number;
    defaultPreventDuplicates?: boolean;
    defaultStyle?: {};
}

export interface IntervalTimeManagerOptions {
    totalTime: number;
    stepTime?: number;
    callbackFunctions?: callbackFunctionsInterface;
}
