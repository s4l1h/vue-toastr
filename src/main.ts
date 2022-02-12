import { App, createApp } from "vue";
import ToastContainer from "./components/ToastContainer.vue";
import Toast from "./components/Toast.vue";
import ToastProgress from "./components/ToastProgress.vue";
import { ToastDefaultOptions } from "./types";

export * from "./types";

const VueToastr = {
    install: (app: App, options: ToastDefaultOptions): void => {
        // @ts-expect-error for props
        const toast = createApp(ToastContainer, options);
        // inserting to dom
        const wrapper = document.createElement("div");
        const component = toast.mount(wrapper);

        if (document.body) {
            document.body.appendChild(wrapper);
        }

        // eslint-disable-next-line no-param-reassign
        app.config.globalProperties.$toastr = component;
        app.provide("toastr", component);
    },
};

export { ToastContainer, ToastProgress, Toast, VueToastr };
