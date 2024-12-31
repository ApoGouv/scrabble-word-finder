<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    letter: string;
    points?: number;
    isDisabled: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'tileClick', letter: string): void;
  }>();

  const isHovered = ref(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const handleHover = () => {
//     isHovered.value = true;
//     setTimeout(() => {
//       isHovered.value = false;
//     }, 300); // Duration to match hover effect
//   };
</script>

<template>
  <button
    :aria-label="`Letter ${letter} (${points} points)`"
    :role="'button'"
    :aria-disabled="isDisabled"
    :disabled="isDisabled"
    class="letter-tile"
    :class="{ disabled: isDisabled, hovered: isHovered }"
    @click="!isDisabled && emit('tileClick', letter)"
    :data-letter="letter"
  >
    <span class="letter" v-if="letter !== '*'">
      {{ letter }}
    </span>
    <span class="points" v-if="points && points > 0">
      {{ points }}
    </span>
  </button>
</template>

<style scoped>
  .letter-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    margin: 5px;
    padding: 0.8em;
    background-color: #f0f0f0;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: background-color 0.3s ease, transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .letter-tile.hovered,
  .letter-tile:hover {
    background-color: #009688;
    transform: scale(1.05);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  .letter-tile.hovered .letter,
  .letter-tile:hover .letter,
  .letter-tile.hovered .points,
  .letter-tile:hover .points {
    color: #fff;
  }

  .letter-tile.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .letter {
    font-size: 24px;
    margin-bottom: 4px;
    color: #000000;
    font-weight: 600;
    transition: color 0.2s ease;
  }
  .points {
    font-size: 14px;
    color: #888;
    position: absolute;
    bottom: 0;
    right: 4px;
    transition: color 0.2s ease;
  }
</style>
