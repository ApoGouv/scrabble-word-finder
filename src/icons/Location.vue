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
    aria-label="Location Icon"
  >
    <title>Location</title>
    <path
      fill="#888888"
      d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"
    />
  </svg>
</template>

<script lang="ts">
import type { PropType } from "vue";

/**
 * material-symbols:location-on-outline
 * @see https://icones.js.org/collection/all?s=pin&icon=material-symbols:location-on-outline
 */
export default {
  name: "LocationIcon",
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
