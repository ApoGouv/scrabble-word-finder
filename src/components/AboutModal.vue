<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <VueFinalModal
    content-transition="vfm-fade"
    class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50"
    :hide-overlay="true"
    content-class="w-full max-w-4xl bg-gray-900 p-6 rounded-lg space-y-4 overflow-y-auto h-90"
  >
      <h2 class="text-xl font-semibold">About This App</h2>
      <p>Scrabble Word Finder is an app that helps you find valid words based on your available letters for Greek Scrabble.</p>
      <h3 class="text-lg font-medium">Credits</h3>
      <ul class="list-disc pl-5">
        <li>Developed by: Your Name</li>
        <li>Icons from: Icon Source</li>
        <!-- Add other credits as necessary -->
      </ul>

      <button
        class="absolute top-4 right-4 px-4 py-2 border rounded-lg bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        @click="emit('close')"
      >
        x
      </button>
  </VueFinalModal>
</template>

<style scoped>
button:focus {
  outline: none;
}
</style>
