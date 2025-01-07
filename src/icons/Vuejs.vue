<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="customClass"
    :style="customStyle"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    role="img"
    focusable="false"
    aria-label="Vue.js Icon"
  >
    <title>Vue.js</title>
    <path
      fill="#41b883"
      d="M24.4 3.925H30l-14 24.15L2 3.925h10.71l3.29 5.6l3.22-5.6Z"
    ></path>
    <path
      fill="#41b883"
      d="m2 3.925l14 24.15l14-24.15h-5.6L16 18.415L7.53 3.925Z"
    ></path>
    <path
      fill="#35495e"
      d="M7.53 3.925L16 18.485l8.4-14.56h-5.18L16 9.525l-3.29-5.6Z"
    ></path>
  </svg>
</template>

<script lang="ts">
import type { PropType } from "vue";

/**
 * vscode-icons:file-type-vue
 * @see https://icones.js.org/collection/all?s=vue&icon=vscode-icons:file-type-vue
 */
export default {
  name: "VuejsIcon",
  props: {
    customClass: {
      type: String,
      default: "",
    },
    customStyle: {
      type: [String, Object] as PropType<string | Record<string, any>>,
      default: "",
    },
  },
};
</script>
