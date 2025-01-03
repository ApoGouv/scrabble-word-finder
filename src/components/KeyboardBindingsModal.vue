<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

import { englishToGreekMap } from '@/utils/letterData'; // Ensure the map is imported correctly


const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <VueFinalModal
      content-transition="vfm-fade"
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    >
    <div class="modal-content">
      <h2>Keyboard Shortcuts</h2>
      <ul>
        <li><strong>Backspace / Delete:</strong> Remove the last character</li>
        <li><strong>Ctrl/Cmd + Z:</strong> Undo the last action</li>
        <li><strong>1:</strong> Switch to Validation mode</li>
        <li><strong>2:</strong> Switch to Anagram Search mode</li>
        <li><strong>Enter:</strong> Submit word</li>
      </ul>

      <h3>English to Greek Character Mapping</h3>
      <ul>
        <li v-for="(greekLetter, englishLetter) in englishToGreekMap" :key="englishLetter">
          <strong>{{ englishLetter }}:</strong> {{ greekLetter }}
        </li>
      </ul>

      <button @click="emit('close')">Close</button>
    </div>
  </VueFinalModal>
</template>


<style scoped>
.modal-content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}
button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
