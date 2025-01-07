<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :class="customClass"
    :style="customStyle"
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24"
    role="img"
    focusable="false"
    aria-label="Delete All Icon"
  >
    <title>Remove All Characters from Input</title>
    <path 
      fill="currentColor" 
      d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
    >
    </path>
  </svg>
</template>

<script lang="ts">
  import type { PropType } from 'vue';

  /**
   * material-symbols:delete-outline
   * @see https://icones.js.org/collection/all?s=delete&icon=material-symbols:delete-outline
   */
  export default {
    name: 'DeleteOutline',
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
