<template>
  <div class="toast-progress" v-bind:style="style"></div>
</template>
<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 100
    }
  },
  computed: {
    style() {
      return {
        width: this.percent.toString() + "%"
      };
    }
  }
};
</script>