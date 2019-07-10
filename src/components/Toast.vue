<template>
  <div
    v-bind:style="data.style"
    v-bind:class="classNames"
    style="display: block;"
    @click="clicked()"
    v-on:mouseover="onMouseOver"
    v-on:mouseout="onMouseOut"
  >
    <toast-progress v-if="progressbar" :percent="progressBarPercent" ref="progressBar"></toast-progress>
    <div class="toast-title" v-html="data.title"></div>
    <div class="toast-message" v-html="data.msg"></div>
  </div>
</template>
<script>
import ToastProgress from "./ToastProgress.vue";
import IntervalTimeManager from "./IntervalTimeManager.js";
export default {
  components: {
    ToastProgress
  },
  props: ["data"],
  data() {
    return {
      progressbar: false,
      progressBarTimer: null,
      timeoutTimer: null
    };
  },
  mounted() {
    // console.log("ready", this.data);
    if (this.progressBarTimer != null) {
      this.progressBarTimer.start();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.start();
    }
  },
  created() {
    if (typeof this.data.timeout !== "undefined" && this.data.timeout !== 0) {
      // SetUP timeout Manager
      this.timeoutTimer = IntervalTimeManager({
        totalTime: this.data.timeout,
        callbackFunctions: {
          "after:finish": () => {
            this.close();
            // console.log("Timeout Fired");
          }
        }
      });
      // SetUP progressbar Time Manager
      if (this.data.progressbar !== false) {
        this.progressbar = true;
        this.progressBarTimer = IntervalTimeManager({
          totalTime: this.data.timeout
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
    classNames() {
      return ["toast", "toast-" + this.data.type].concat(this.data.classNames);
    },
    progressBarPercent() {
      if (this.data.progressBarValue != null) {
        return this.data.progressBarValue;
      }
      return this.progressBarTimer.getPercent();
    }
  },
  beforeDestroy() {
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
      // console.log(typeof this.$parent, this);
      // if toast not manuel closed.
      if (this.$parent != null) {
        this.$parent.Close(this.data);
      }
    }
  }
};
</script>
