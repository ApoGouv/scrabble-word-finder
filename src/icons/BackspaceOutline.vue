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
    aria-label="Backspace Icon"
  >
    <title>Remove Last Character from Input</title>
    <path 
      fill="currentColor"
      d="m11.4 16l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L18 9.4L16.6 8L14 10.6L11.4 8L10 9.4l2.6 2.6l-2.6 2.6zM9 20q-.475 0-.9-.213t-.7-.587L2 12l5.4-7.2q.275-.375.7-.587T9 4h11q.825 0 1.413.587T22 6v12q0 .825-.587 1.413T20 20zm-4.5-8L9 18h11V6H9zm10 0"
    >
    </path>
  </svg>
</template>

<script lang="ts">
  import type { PropType } from 'vue';

  /**
   * material-symbols:backspace-outline
   * @see https://icones.js.org/collection/all?s=backspace&icon=material-symbols:backspace-outline
   */
  export default {
    name: 'BackspaceOutline',
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
