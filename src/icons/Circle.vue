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
    aria-label="Circle separator Icon"
  >
    <title>Circle separator</title>
    <path
      fill="currentColor"
      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
    />
  </svg>
</template>

<script lang="ts">
  import type { PropType } from 'vue';

  /**
   * material-symbols:circle
   * @see https://icones.js.org/collection/all?s=circle&icon=material-symbols:circle
   */
  export default {
    name: 'CircleIcon',
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
