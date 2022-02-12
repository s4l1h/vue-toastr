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
    timeout: number;
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

export interface IToastContainer {
    addToast?: (opt: ToastOptions) => void;
    removeByName?: (name: string) => void;
    removeToast?: (opt: ToastOptions) => void;
    setProgress?: (data: ToastOptions, newValue: number) => void;
    Add?: (d: ToastType | string) => void;
    addData?: (opt: ToastOptions) => void;
    processObjectData?: (opt: ToastOptions | string) => ToastOptions;
    e?: (msg: string, title?: string) => void;
    i?: (msg: string, title?: string) => void;
    s?: (msg: string, title?: string) => void;
    w?: (msg: string, title?: string) => void;
    Close?: (data: ToastOptions) => void;
    removeByType?: (toastType: ToastType) => void;
    clearAll?: () => void;
    list?: {
        [key: string]: {
            [key: string]: ToastOptions;
        };
    };
    positions?: typeof positions;
    index?: number;
    savedNames?: { [key: string]: ToastOptions };
}
