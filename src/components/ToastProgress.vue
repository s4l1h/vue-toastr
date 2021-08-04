<template>
    <div class="toast-progress" :style="styleObject"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

const ToastProgress = defineComponent({
    name: "ToastProgress",
    props: {
        percent: {
            type: Number,
            default: 100,
        },
    },
    computed: {
        styleObject(): { width: string } {
            return {
                width: `${this.percent.toString()}%`,
            };
        },
    },
});
export default ToastProgress;
</script>
