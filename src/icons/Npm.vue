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
    aria-label="NPM Icon"
  >
    <title>NPM</title>
    <path
      fill="#cb3837"
      d="M2 10.555h28v9.335H16v1.556H9.778v-1.557H2Zm1.556 7.779h3.111v-4.668h1.555v4.667h1.556v-6.222H3.556Zm7.778-6.223v7.779h3.111v-1.556h3.111v-6.223Zm3.111 1.556H16v3.112h-1.556Zm4.667-1.556v6.223h3.111v-4.668h1.556v4.667h1.556v-4.667h1.556v4.667h1.556v-6.222Z"
    ></path>
  </svg>
</template>

<script lang="ts">
import type { PropType } from "vue";

/**
 * vscode-icons:file-type-npm
 * @see https://icones.js.org/collection/all?s=npm&icon=vscode-icons:file-type-npm
 */
export default {
  name: "NpmIcon",
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
