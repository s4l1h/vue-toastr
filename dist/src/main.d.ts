import { App } from "vue";
import ToastContainer from "./components/ToastContainer.vue";
import Toast from "./components/Toast.vue";
import ToastProgress from "./components/ToastProgress.vue";
import { ToastDefaultOptions } from "./types";
export * from "./types";
declare const VueToastr: {
    install: (app: App, options: ToastDefaultOptions) => void;
};
export { ToastContainer, ToastProgress, Toast, VueToastr };
//# sourceMappingURL=main.d.ts.map