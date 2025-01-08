<script setup lang="ts">
  import CoffeeIcon from '@/icons/Coffee.vue'
  import CircleIcon from '@/icons/Circle.vue'
</script>


<template>
  <footer class="bg-teal-600 text-white py-4 mt-4 shadow-inner">
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
          </a>, powered by <CoffeeIcon customClass="inline-flex mx-1" />
        </span>
      </div>  

      <!-- App Links -->
      <div class="text-center md:text-left">
        <ul class="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-0">
          <!-- How to Use Button Link -->
          <li class="flex items-center">
            <button
              @click="$emit('show-how-to-use-modal')"
              class="text-teal-200 hover:text-teal-300"
            >
              How to Use
            </button>
            <!-- Separator -->
            <CircleIcon customClass="hidden md:inline w-2 h-2 mx-2 text-gray-300 fill-current" />
          </li>

          <!-- Keyboard Shortcuts Button Link -->
          <li class="flex items-center">
            <button
              @click="$emit('show-keyboard-shortcuts-modal')"
              class="text-teal-200 hover:text-teal-300"
            >
              Keyboard Shortcuts
            </button>
            <!-- Separator -->
            <CircleIcon customClass="hidden md:inline w-2 h-2 mx-2 text-gray-300 fill-current" />
          </li>

          <!-- About Button Link -->
          <li class="flex items-center">
            <button
              @click="$emit('show-about-modal')"
              class="text-teal-200 hover:text-teal-300"
            >
              About
            </button>
          </li>
        </ul>
      </div>

      <!-- GitHub Badge Link -->
      <div class="flex space-x-4 text-center md:text-right">
        <a href="https://github.com/ApoGouv/scrabble-word-finder" target="_blank" rel="noopener noreferrer" class="github-corner" aria-label="View source on GitHub">
          <img src="https://img.shields.io/badge/GitHub-Scrabble%20Word%20Finder-fedcba?logo=github&style=flat-square" alt="GitHub" />
        </a>
      </div>
    </div>
  </footer>
</template>
