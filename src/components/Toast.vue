<template>
    <div
        v-bind:style="data.style"
        v-bind:class="classNames"
        style="display: block"
        v-on:click="clicked()"
        v-on:mouseover="onMouseOver"
        v-on:mouseout="onMouseOut"
    >
        <toast-progress
            v-if="progressbar"
            :percent="progressBarPercent"
            ref="progressBar"
        ></toast-progress>
        <div v-if="data.title" class="toast-title" v-html="data.title"></div>
        <div
            v-if="data.msg && !$slots.default"
            class="toast-message"
            v-html="data.msg"
        ></div>
        <div v-if="$slots.default" class="toast-message">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { ComponentPublicInstance, defineComponent } from "vue";
import ToastProgress from "./ToastProgress.vue";
import ToastContainer from "./ToastContainer.vue";
import IntervalTimeManager from "../utils/intervalmanager";

import { ToastInterface, ToastOptions } from "../types";

export default defineComponent({
    name: "Toast",
    components: {
        ToastProgress,
    },
    props: {
        data: {
            type: Object as () => ToastOptions,
            default: () => ({}),
        },
    },
    // props: ["data"],
    data() {
        return {
            timeout: 0,
            progressbar: false,
            progressBarTimer: undefined,
            timeoutTimer: undefined,
        } as ToastInterface;
    },
    mounted() {
        if (this.progressBarTimer) {
            this.progressBarTimer.start();
        }
        if (this.timeoutTimer) {
            this.timeoutTimer.start();
        }
    },
    created() {
        if (
            typeof this.data.timeout !== "undefined" &&
            this.data.timeout !== 0
        ) {
            // SetUP timeout Manager
            this.timeoutTimer = new IntervalTimeManager({
                totalTime: this.data.timeout,
                stepTime: 50,
                callbackFunctions: {
                    "after:finish": () => {
                        this.close();
                        // console.log("Timeout Fired");
                    },
                },
            });
            // SetUP progressbar Time Manager
            if (this.data.progressbar !== false) {
                this.progressbar = true;
                this.progressBarTimer = new IntervalTimeManager({
                    totalTime: this.data.timeout,
                });
            }
        } else if (
            this.data.progressBarValue !== null &&
            this.data.progressbar !== false
        ) {
            this.progressbar = true;
        }
    },
    computed: {
        classNames(): Array<string> {
            if (this.data?.classNames) {
                return ["toast", `toast-${this.data.type}`].concat(
                    this.data.classNames
                );
            }
            return ["toast", `toast-${this.data.type}`];
        },
        progressBarPercent(): number {
            if (this.data.progressBarValue != null) {
                return this.data.progressBarValue;
            }
            if (this.progressBarTimer !== undefined) {
                return this.progressBarTimer.getPercent();
            }
            return 0;
        },
    },
    beforeUnmount() {
        if (this.progressBarTimer != null) {
            this.progressBarTimer.stop();
        }

        if (this.timeoutTimer != null) {
            this.timeoutTimer.stop();
        }
    },
    methods: {
        // Enter Hover
        onMouseOver() {
            // console.log("onMouseOver")
            if (typeof this.data.onMouseOver !== "undefined") {
                this.data.onMouseOver();
            }
            if (this.data.closeOnHover) {
                if (this.progressBarTimer != null) {
                    this.progressBarTimer.pause();
                }
                if (this.timeoutTimer != null) {
                    this.timeoutTimer.pause();
                }
            }
        },
        // Leave Hover
        onMouseOut() {
            // console.log("onMouseOut")
            if (typeof this.data.onMouseOut !== "undefined") {
                this.data.onMouseOut();
            }
            if (this.data.closeOnHover) {
                if (this.progressBarTimer != null) {
                    this.progressBarTimer.resume();
                }
                if (this.timeoutTimer != null) {
                    this.timeoutTimer.resume();
                }
            }
        },
        // Clicked Toast
        clicked() {
            if (typeof this.data.onClicked !== "undefined") {
                this.data.onClicked();
            }
            this.clickClose();
        },
        // Click Close?
        clickClose() {
            if (
                typeof this.data.clickClose !== "undefined" &&
                this.data.clickClose === false
            ) {
                return;
            }
            this.close();
        },
        // Close Toast
        close() {
            const parent = this.$parent as ComponentPublicInstance<
                typeof ToastContainer
            >;
            parent.Close(this.data);
        },
    },
});
</script>
