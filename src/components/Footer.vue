<script setup lang="ts">
  import { ref } from 'vue'
  import LineMdCoffeeHalfEmptyFilledLoop from '@/icons/Coffee.vue'
  import KeyboardShortcuts from '@/components/modals/KeyboardShortcuts.vue'
  import About from '@/components/modals/About.vue'
  import HowToUseModal from "@/components/modals/HowToUseModal.vue";

  const showHowToUseModal = ref(false)
  const showKeyboardModal = ref(false)
  const showAboutModal = ref(false)

</script>


<template>
  <footer class="bg-teal-600 text-white py-4 mt-8 shadow-inner">
    <div class="container mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
      <!-- Copyright Info -->
      <div class="text-sm text-gray-200 text-center md:text-left">
        <span class="copyright-text">
          &copy; 2024 Scrabble Word Finder. All rights reserved.
        </span>

        <span class="powered-text ml-0 md:ml-1 italic inline-flex items-center">
          Made by&nbsp;
          <a
            href="https://github.com/ApoGouv/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-teal-200 hover:text-teal-300"
          >
            ApoGouv
          </a>, powered by <LineMdCoffeeHalfEmptyFilledLoop customClass="inline-flex mx-1" />
        </span>
      </div>  

      <!-- Keyboard Shortcuts and About Links -->
      <div class="text-center md:text-left space-x-4">
        <button
          @click="showHowToUseModal = true"
          class="text-teal-200 hover:text-teal-300"
        >
        How to Use
        </button>
        <span>|</span>
        <button
          @click="showKeyboardModal = true"
          class="text-teal-200 hover:text-teal-300"
        >
          Keyboard Shortcuts
        </button>
        <span>|</span>
        <button
          @click="showAboutModal = true"
          class="text-teal-200 hover:text-teal-300"
        >
          About
        </button>
      </div>

      <!-- GitHub Badge Link -->
      <div class="flex space-x-4 text-center md:text-right">
        <a href="https://github.com/ApoGouv/scrabble-word-finder" target="_blank" rel="noopener noreferrer" class="github-corner" aria-label="View source on GitHub">
          <img src="https://img.shields.io/badge/GitHub-Scrabble%20Word%20Finder-fedcba?logo=github&style=flat-square" alt="GitHub" />
        </a>
      </div>
    </div>

    <!-- Modals -->
    <HowToUseModal
      :isVisible="showHowToUseModal"
      @close="showHowToUseModal = false"
    />
    <KeyboardShortcuts
      :isVisible="showKeyboardModal"
      @close="showKeyboardModal = false"
    />
    <About
      :isVisible="showAboutModal"
      @close="showAboutModal = false"
    />

  </footer>
</template>
