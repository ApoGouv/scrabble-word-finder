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
    aria-label="Tailwind CSS Icon"
  >
    <title>Tailwind CSS</title>
    <path
      fill="#44a8b3"
      d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1q-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1m-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1q-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1"
    ></path>
  </svg>
</template>

<script lang="ts">
import type { PropType } from "vue";

/**
 * vscode-icons:file-type-tailwind
 * @see https://icones.js.org/collection/all?s=tailwind&icon=vscode-icons:file-type-tailwind
 */
export default {
  name: "TailwindCSSIcon",
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
