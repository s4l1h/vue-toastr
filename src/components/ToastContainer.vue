<template>
    <div
        v-bind:class="'toast-container ' + position"
        v-for="(toasts, position) in list"
        :key="position"
    >
        <Toast :data="toast" v-for="toast in toasts" :key="toast.index">
            <slot />
        </Toast>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { positions } from "../utils/config";
import { ToastOptions, ToastPosition, ToastType } from "../types";

import Toast from "./Toast.vue";

const list: { [key: string]: { [key: string]: ToastOptions } } = reactive({});
const savedNames: { [key: string]: ToastOptions } = reactive({});

export default defineComponent({
    name: "ToastContainer",
    props: {
        defaultClassNames: {
            type: Array as () => string[],
            default: () => [],
        },
        defaultPosition: {
            type: String as () => ToastPosition,
            default: () => "toast-top-right",
        },
        defaultType: {
            type: String as () => ToastType,
            default: () => "success",
        },
        defaultCloseOnHover: {
            type: Boolean,
            default: () => true,
        },
        defaultTimeout: {
            type: Number,
            default: () => 5000,
        },
        defaultProgressBar: {
            type: Boolean,
            default: () => true,
        },
        defaultProgressBarValue: {
            type: Number,
            default: () => undefined,
        },
        defaultPreventDuplicates: {
            type: Boolean,
            default: () => false,
        },
        defaultStyle: {
            type: Object as () => {},
            default: () => ({}),
        },
    },
    components: {
        Toast,
    },
    data() {
        for (let i = 0; i <= positions.length - 1; i += 1) {
            list[positions[i]] = {};
        }
        return {
            // defaultClassNames: this.processOption("defaultClassNames", []),
            // defaultPosition: this.processOption("defaultPosition", "toast-top-right"),
            // defaultType: this.processOption("defaultType", "success"),
            // defaultCloseOnHover: this.processOption("defaultCloseOnHover", true),
            // defaultTimeout: this.processOption("defaultTimeout", 5000),
            // defaultProgressBar: this.processOption("defaultProgressBar", true),
            // defaultProgressBarValue: this.processOption(
            //   "defaultProgressBarValue",
            //   null
            // ),
            // defaultPreventDuplicates: this.processOption(
            //   "defaultPreventDuplicates",
            //   false
            // ),
            // defaultStyle: this.processOption("defaultStyle", {}),

            positions,
            list,
            index: 0,
            savedNames,
        };
    },
    created() {
        // console.log("Created");
    },
    mounted() {
        // console.log("ready", this.list);
    },
    methods: {
        addToast(opt: ToastOptions) {
            const data = opt;
            this.index += 1;
            data.index = this.index;
            this.list[data.position][this.index] = data;
            if (typeof data.name !== "undefined") {
                this.savedNames[data.name] = data;
            }
            // if have onCreated
            // wait doom update after call cb
            this.$nextTick(() => {
                if (typeof data.onCreated !== "undefined") {
                    data.onCreated();
                }
            });
        },
        removeByName(name: string) {
            if (typeof this.savedNames[name] !== "undefined") {
                this.Close(this.savedNames[name]);
                delete this.savedNames[name];
            }
        },
        removeToast(data: ToastOptions) {
            const item = this.list[data.position][data.index];
            // console.log("remove toast", data, item);
            if (typeof item !== "undefined") {
                delete this.list[data.position][data.index];
                // if have onClosed
                this.$nextTick(() => {
                    if (typeof data.onClosed !== "undefined") {
                        data.onClosed();
                    }
                });
            }
        },
        setProgress(data: ToastOptions, newValue: number) {
            const item = this.list[data.position][data.index];
            if (typeof item !== "undefined") {
                item.progressBarValue = newValue;
            }
        },
        Add(d: ToastType | string) {
            return this.AddData(this.processObjectData(d));
        },
        AddData(data: ToastOptions) {
            if (typeof data !== "object") {
                // console.log("AddData accept only Object", data);
                return false;
            }
            if (data.preventDuplicates) {
                const listKeys = Object.keys(this.list[data.position]);
                for (let i = 0; i < listKeys.length; i += 1) {
                    if (
                        this.list[data.position][listKeys[i]].title ===
                            data.title &&
                        this.list[data.position][listKeys[i]].msg === data.msg
                    ) {
                        // console.log("Prevent Duplicates", data);
                        return false;
                    }
                }
            }
            this.addToast(data);
            return data;
        },
        // processOption(optionValue: string, defaultValue: any) {
        //   if (!this.options) {
        //     return defaultValue;
        //   }
        //   return typeof this.options[optionValue] !== "undefined"
        //     ? this.options[optionValue]
        //     : defaultValue;
        // },
        processObjectData(opt: ToastOptions | string): ToastOptions {
            const data = opt;
            // if Object
            if (typeof data === "object" && typeof data.msg !== "undefined") {
                if (typeof data.classNames === "undefined") {
                    data.classNames = this.defaultClassNames;
                }
                if (typeof data.position === "undefined") {
                    data.position = this.defaultPosition;
                }
                if (typeof data.type === "undefined") {
                    data.type = this.defaultType;
                }
                if (typeof data.timeout === "undefined") {
                    data.timeout = this.defaultTimeout;
                }
                // have progressBar ?
                if (typeof data.progressbar === "undefined") {
                    data.progressbar = this.defaultProgressBar;
                }
                // should progressBar be bound to timer or is set manually ?
                if (typeof data.progressBarValue === "undefined") {
                    data.progressBarValue = this.defaultProgressBarValue;
                }

                if (typeof data.closeOnHover === "undefined") {
                    data.closeOnHover = this.defaultCloseOnHover;
                }

                if (typeof data.preventDuplicates === "undefined") {
                    data.preventDuplicates = this.defaultPreventDuplicates;
                }

                if (typeof data.style === "undefined") {
                    data.style = this.defaultStyle;
                }
                return data;
            }
            // if String
            return {
                index: 0,
                msg: data.toString(),
                position: this.defaultPosition,
                type: this.defaultType,
                timeout: this.defaultTimeout,
                closeOnHover: this.defaultCloseOnHover,
                progressbar: this.defaultProgressBar,
                progressBarValue: this.defaultProgressBarValue,
                preventDuplicates: this.defaultPreventDuplicates,
                style: this.defaultStyle,
                classNames: this.defaultClassNames,
            };
        },
        e(msg: string, title?: string) {
            const data = this.processObjectData(msg);
            data.type = "error";
            if (title) {
                data.title = title;
            }
            return this.AddData(data);
        },
        s(msg: string, title?: string) {
            const data = this.processObjectData(msg);
            data.type = "success";
            if (title) {
                data.title = title;
            }
            return this.AddData(data);
        },
        w(msg: string, title?: string) {
            const data = this.processObjectData(msg);
            data.type = "warning";
            if (title) {
                data.title = title;
            }
            return this.AddData(data);
        },
        i(msg: string, title?: string) {
            const data = this.processObjectData(msg);
            data.type = "info";
            if (title) {
                data.title = title;
            }
            return this.AddData(data);
        },
        Close(data: ToastOptions) {
            this.removeToast(data);
        },
        removeByType(toastType: ToastType) {
            for (let i = 0; i < this.positions.length; i += 1) {
                const listKeys = Object.keys(this.list[this.positions[i]]);
                for (let j = 0; j < listKeys.length; j += 1) {
                    if (
                        this.list[this.positions[i]][listKeys[j]].type ===
                        toastType
                    ) {
                        this.Close(this.list[this.positions[i]][listKeys[j]]);
                    }
                }
            }
        },
        clearAll() {
            for (let i = 0; i < this.positions.length; i += 1) {
                const listKeys = Object.keys(this.list[this.positions[i]]);
                for (let j = 0; j < listKeys.length; j += 1) {
                    this.Close(this.list[this.positions[i]][listKeys[j]]);
                }
            }
        },
    },
});
</script>
<style></style>
