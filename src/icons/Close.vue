<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :class="customClass"
    :style="customStyle"
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24"
  >
    <title>Close</title>
    <path 
      fill="currentColor" 
      d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
    >
    </path>
  </svg>
</template>

<script lang="ts">
  import type { PropType } from 'vue';

  /**
   * material-symbols:close
   * @see https://icones.js.org/collection/material-symbols?s=close&icon=material-symbols:close
   */
  export default {
    name: 'Close',
    props: {
      customClass: {
        type: String,
        default: '',
      },
      customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: '',
      },
    },
};
</script>
