<script setup lang="ts">
  import LineMdCoffeeHalfEmptyFilledLoop from '@/icons/Coffee.vue'
</script>


<template>
  <footer class="bg-teal-600 text-white py-4 mt-8 shadow-inner">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <!-- Copyright Info -->
      <p class="text-sm text-gray-200">
        &copy; 2024 Scrabble Word Finder. All rights reserved.
        <span class="powered ml-2 italic">
          Made by&nbsp;
          <a href="https://github.com/ApoGouv/" target="_blank" rel="noopener noreferrer" class="text-teal-200 hover:text-teal-300">
            ApoGouv
          </a>
          , powered by <LineMdCoffeeHalfEmptyFilledLoop/>
        </span>
      </p>

      <div class="flex space-x-4">
        <a href="https://github.com/ApoGouv/scrabble-word-finder" target="_blank" rel="noopener noreferrer" class="text-teal-200 hover:text-teal-300">
          See code on GitHub
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.powered {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}

.powered svg {
  display: inline-flex;
  margin: 0 3px;
}
</style>