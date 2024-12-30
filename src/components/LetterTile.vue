<script setup lang="ts">
const props = defineProps<{
  letter: string;
  points?: number;
  isDisabled: boolean,
}>();

const emit = defineEmits<{
  (e: "tileClick", letter: string): void;
}>();

</script>

<template>
    <div 
      class="letter-tile"
      :class="{ disabled: isDisabled }"
      @click="!isDisabled && emit('tileClick', letter)"
    >
      <span class="letter">{{ letter }}</span>
      <span 
        class="points" 
        v-if="points && points > 0">{{ points }}</span>
    </div>
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
    background-color: #f0f0f0;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: background-color 0.3s, transform 0.2s;
  }
  .letter-tile:hover {
    background-color: #ddd;
    transform: scale(1.05);
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
  }
  .points {
    font-size: 14px;
    color: #888;
    position: absolute;
    bottom: 0;
    right: 4px;
  }
</style>
  