<template>
  <div>
    <div
      v-bind:class="'toast-container ' + position"
      v-for="(toasts, position) in list"
      :key="position"
    >
      <toast :data="toast" v-for="(toast, index) in toasts" :key="index"></toast>
    </div>
  </div>
</template>
<script>
import toast from "./Toast.vue";
export default {
  name: "VueToastr",
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    var positions = [
      "toast-top-right",
      "toast-bottom-right",
      "toast-bottom-left",
      "toast-top-left",
      "toast-top-full-width",
      "toast-bottom-full-width",
      "toast-top-center",
      "toast-bottom-center"
    ];
    var list = {};
    for (var i = 0; i <= positions.length - 1; i++) {
      list[positions[i]] = {};
    }
    return {
      positions,
      defaultClassNames: this.processOption("defaultClassNames", []),
      defaultPosition: this.processOption("defaultPosition", "toast-top-right"),
      defaultType: this.processOption("defaultType", "success"),
      defaultCloseOnHover: this.processOption("defaultCloseOnHover", true),
      defaultTimeout: this.processOption("defaultTimeout", 5000),
      defaultProgressBar: this.processOption("defaultProgressBar", true),
      defaultProgressBarValue: this.processOption(
        "defaultProgressBarValue",
        null
      ),
      defaultPreventDuplicates: this.processOption(
        "defaultPreventDuplicates",
        false
      ),
      defaultStyle: this.processOption("defaultStyle", {}),
      list,
      index: 0,
      savedNames: {}
    };
  },
  created() {
    // console.log("Created");
  },
  mounted() {
    // console.log("ready", this.list);
  },
  components: {
    toast
  },
  methods: {
    addToast(data) {
      this.index++;
      data["index"] = this.index;
      this.$set(this.list[data.position], this.index, data);
      if (typeof data["name"] !== "undefined") {
        this.$set(this.savedNames, data["name"], data);
      }
      // if have onCreated
      if (typeof data.onCreated !== "undefined") {
        // wait doom update after call cb
        this.$nextTick(() => {
          data.onCreated();
        });
      }
    },
    removeByName(name) {
      if (typeof this.savedNames[name] !== "undefined") {
        this.Close(this.savedNames[name]);
        this.$delete(this.savedNames, name);
      }
    },
    removeToast(data) {
      var item = this.list[data.position][data.index];
      // console.log("remove toast", data, item);
      if (typeof item !== "undefined") {
        this.$delete(this.list[data.position], data.index);
        // if have onClosed
        if (typeof data.onClosed !== "undefined") {
          // wait doom update after call cb
          this.$nextTick(() => {
            data.onClosed();
          });
        }
      }
    },
    setProgress(data, newValue) {
      var item = this.list[data.position][data.index];
      if (typeof item !== "undefined") {
        this.$set(item, "progressBarValue", newValue);
      }
    },
    Add(d) {
      return this.AddData(this.processObjectData(d));
    },
    AddData(data) {
      if (typeof data !== "object") {
        //console.log("AddData accept only Object", data);
        return false;
      }
      if (data.preventDuplicates) {
        var listKeys = Object.keys(this.list[data.position]);
        for (var i = 0; i < listKeys.length; i++) {
          if (
            this.list[data.position][listKeys[i]].title === data.title &&
            this.list[data.position][listKeys[i]].msg === data.msg
          ) {
            //console.log("Prevent Duplicates", data);
            return false;
          }
        }
      }
      this.addToast(data);
      return data;
    },
    processOption(optionValue, defaultValue) {
      if (!this.options) {
        return defaultValue;
      }
      return typeof this.options[optionValue] !== "undefined"
        ? this.options[optionValue]
        : defaultValue;
    },
    processObjectData(data) {
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
        msg: data.toString(),
        position: this.defaultPosition,
        type: this.defaultType,
        timeout: this.defaultTimeout,
        closeOnHover: this.defaultCloseOnHover,
        progressbar: this.defaultProgressBar,
        progressBarValue: this.defaultProgressBarValue,
        preventDuplicates: this.defaultPreventDuplicates,
        style: this.defaultStyle,
        classNames: this.defaultClassNames
      };
    },
    e(msg, title) {
      var data = this.processObjectData(msg);
      data["type"] = "error";
      if (typeof title !== "undefined") {
        data["title"] = title;
      }
      return this.AddData(data);
    },
    s(msg, title) {
      var data = this.processObjectData(msg);
      data["type"] = "success";
      if (typeof title !== "undefined") {
        data["title"] = title;
      }
      return this.AddData(data);
    },
    w(msg, title) {
      var data = this.processObjectData(msg);
      data["type"] = "warning";
      if (typeof title !== "undefined") {
        data["title"] = title;
      }
      return this.AddData(data);
    },
    i(msg, title) {
      var data = this.processObjectData(msg);
      data["type"] = "info";
      if (typeof title !== "undefined") {
        data["title"] = title;
      }
      return this.AddData(data);
    },
    Close(data) {
      // console.log(data)
      this.removeToast(data);
    },
    removeByType(toastType) {
      for (var i = 0; i < this.positions.length; i++) {
        var listKeys = Object.keys(this.list[this.positions[i]]);
        for (var j = 0; j < listKeys.length; j++) {
          if (this.list[this.positions[i]][listKeys[j]]["type"] === toastType) {
            this.Close(this.list[this.positions[i]][listKeys[j]]);
          }
        }
      }
    },
    clearAll() {
      for (var i = 0; i < this.positions.length; i++) {
        var listKeys = Object.keys(this.list[this.positions[i]]);
        for (var j = 0; j < listKeys.length; j++) {
          this.Close(this.list[this.positions[i]][listKeys[j]]);
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "../vue-toastr.scss";
</style>
