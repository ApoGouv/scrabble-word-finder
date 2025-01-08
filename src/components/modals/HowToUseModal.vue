<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue";

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "close"): void;

  // Event to open keyboard shortcuts modal
  (e: "show-keyboard-shortcuts-modal"): void;
}>();

const onClose = () => emit("close");

const onShowKeyboardShortcuts = () => {
  // Close the current modal
  emit("close");

  // Open the keyboard shortcuts modal
  emit("show-keyboard-shortcuts-modal");
};
</script>

<template>
  <ModalDialog :isVisible="isVisible" @close="onClose">
    <template #title>How to Use</template>
    <template #content>
      <section class="space-y-4 text-gray-300">
        <ol class="list-decimal pl-5 space-y-3">
          <li>
            <strong>Choose a Mode</strong>
            <p class="mt-1">Start by selecting your desired mode:</p>
            <ul class="list-disc pl-5 mt-1 space-y-1">
              <li>
                <span class="text-orange-500 font-semibold">Word Validation</span>
                : Verify if the selected letters form a valid Greek Scrabble word.
              </li>
              <li>
                <span class="text-orange-500 font-semibold">Anagram Search</span>
                : Discover all valid words that can be created using your selected letters.
              </li>
            </ul>
            <p class="mt-1">
              You can also use the keyboard shortcuts 
              <kbd class="kbd-key">1</kbd> for Word Validation and 
              <kbd class="kbd-key">2</kbd> for Anagram Search.
            </p>
            <p class="mt-1">
              Changing modes will clear the input field and reset your current selection.
            </p>
          </li>
          <li>
            <strong>Select Letters</strong>
            <p class="mt-1">
              Use the clickable letter tiles to choose your letters. The selected letters will appear in the input field.
            </p>
            <ul class="list-disc pl-5 mt-1 space-y-1">
              <li>
                <span class="text-orange-500 font-semibold">Word Validation</span>
                : Arrange the tiles to form the exact word you wish to validate.
              </li>
              <li>
                <span class="text-orange-500 font-semibold">Anagram Search</span>
                : The order of the letters doesn’t matter—select tiles as in a real Scrabble game.
              </li>
            </ul>
            <p class="mt-1">
              Alternatively, you can use the keyboard to add or remove letters. Simply type a letter to add it or use the 
              <kbd class="kbd-key">Backspace</kbd> key to remove the last letter.
            </p>
          </li>
          <li>
            <strong>Submit Your Selection</strong>
            <p class="mt-1">
              Click the 
              <span class="text-orange-500 font-semibold">Submit</span> button or use the keyboard shortcut 
              <kbd class="kbd-key">Enter</kbd> to execute your search or validation.
            </p>
          </li>
          <li>
            <strong>Review Results</strong>
            <ul class="list-disc pl-5 mt-1 space-y-1">
              <li>
                <span class="text-orange-500 font-semibold">Word Validation</span>
                : See whether the word is valid or invalid.
              </li>
              <li>
                <span class="text-orange-500 font-semibold">Anagram Search</span>
                : View a list of all valid words that can be created from your selected letters.
              </li>
            </ul>
          </li>
        </ol>
        <p class="mt-6">
          For a complete list of available keyboard shortcuts, check the 
          <button
            class="text-teal-200 hover:text-teal-300 underline"
            @click="onShowKeyboardShortcuts"
          >
            Keyboard Shortcuts
          </button> link in the footer.
        </p>
      </section>
    </template>
  </ModalDialog>
</template>
