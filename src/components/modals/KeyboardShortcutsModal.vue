<script setup lang="ts">
import ModalDialog from '@/components/ModalDialog.vue'
import { englishToGreekMap } from '@/utils/letterData';
import KeyboardIcon from '@/icons/Keyboard.vue';

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onClose = () => emit('close')
</script>

<template>
  <ModalDialog :isVisible="isVisible" @close="onClose">
    <template #title>
      <KeyboardIcon class="w-5 h-5 inline-block mr-1" />
      Keyboard Shortcuts
    </template>
    <template #content>
      <!-- Keyboard Shortcuts Section -->
      <section class="mb-6">
        <ul class="space-y-2">
          <li class="mb-1">
            Press <kbd class="kbd-key">Enter</kbd> to <span class="text-orange-500 font-semibold">Submit word</span>
          </li>
          <li class="mb-1">
            Press 
            <kbd class="kbd-key">Backspace</kbd> 
            or <kbd class="kbd-key">Delete</kbd> 
            or <kbd class="kbd-key">Ctrl/Cmd</kbd> + <kbd class="kbd-key">Z</kbd> to 
            <span class="text-orange-500 font-semibold">Remove the last character</span>
          </li>
          <li class="mb-1">
            Press <kbd class="kbd-key">1</kbd> to 
            <span class="text-orange-500 font-semibold">Switch to Validation mode</span>
          </li>
          <li class="mb-1">
            Press <kbd class="kbd-key">2</kbd> to 
            <span class="text-orange-500 font-semibold">Switch to Anagram Search mode</span>
          </li>
        </ul>
      </section>

      <!-- English to Greek Mapping Section -->
      <section>
        <h3 class="text-lg font-semibold mb-4 text-gray-300">English to Greek Character Mapping</h3>
        <!-- Grid layout with two columns and twelve rows each -->
        <div class="english-to-greek-char-mapping max-w-[600px] mr-auto grid grid-rows-12 grid-flow-col gap-x-8 gap-y-4">
          <div v-for="(greekLetter, englishLetter) in englishToGreekMap" 
            :key="englishLetter"
            class="flex justify-between items-center"
          >
            <kbd class="kbd-key">{{ englishLetter }}</kbd>
            <span class="text-orange-500">→</span>
            <kbd class="kbd-key">{{ greekLetter }}</kbd>
          </div>
        </div>
      </section>
    </template>
  </ModalDialog>
</template>



<style scoped>


</style>
