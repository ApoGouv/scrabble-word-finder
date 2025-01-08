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
    aria-label="Keyboard Icon"
  >
    <title>Keyboard</title>
    <path
      fill="currentColor"
      d="M3 20q-.825 0-1.412-.587T1 18V6q0-.825.588-1.412T3 4h18q.825 0 1.413.588T23 6v12q0 .825-.587 1.413T21 20zm0-2h18V6H3zm5-1h8v-2H8zm-3-3.5h2v-2H5zm4 0h2v-2H9zm4 0h2v-2h-2zm4 0h2v-2h-2zM5 10h2V8H5zm4 0h2V8H9zm4 0h2V8h-2zm4 0h2V8h-2zM3 18V6z"
    />
  </svg>
</template>

<script lang="ts">
  import type { PropType } from 'vue';

  /**
   * material-symbols:keyboard-alt-outline
   * @see https://icones.js.org/collection/all?s=keyboard&icon=material-symbols:keyboard-alt-outline
   */
  export default {
    name: 'KeyboardIcon',
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
