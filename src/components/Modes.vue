<script setup lang="ts">
  defineProps<{
    currentMode: string;
  }>();
</script>

<template>
  <fieldset 
    class="modes p-4 border-2 border-teal-700 rounded-lg mb-4 bg-gray-800 text-left"
  >
    <legend id="mode-selection" class="text-xl text-white font-semibold mb-4">Mode Selection</legend>
    <p class="modes-current mb-2">
      <strong class="text-white">Current Mode: </strong>
      <span
        :class="[
          currentMode === 'validate' ? 'text-teal-300 font-bold' : 'text-orange-400 font-bold'
        ]"
      >
        {{ currentMode }}
      </span>
    </p>
    
    <!-- Dynamic description -->
    <p class="modes-description mb-4 text-sm text-gray-300">
      <template v-if="currentMode === 'validate'">
        <strong>Validate Mode:</strong>
        <span>
          Select letters of a word to check if it's valid according to competitive Greek Scrabble rules.
        </span>
      </template>

      <template v-if="currentMode === 'searchAnagram'">
        <strong>Search Anagram Mode:</strong>
        <span>
          Select up to 8 characters, to see all valid words. You can include wildcards (*).
        </span>
      </template>
    </p>

    <!-- Buttons -->
    <div class="buttons flex space-x-4">
      <button
        @click="$emit('changeMode', 'validate')"
        :class="[
          currentMode === 'validate' ? 'bg-teal-700 text-white' : 'bg-transparent text-teal-300',
          'hover:bg-teal-600 hover:text-white hover:border-teal-600 border p-2 rounded-md transition duration-200'
        ]"
        :aria-pressed="currentMode === 'validate'"
        aria-label="Select Validate Mode"
      >
        Validate
      </button>

      <button
        @click="$emit('changeMode', 'searchAnagram')"
        :class="[
          currentMode === 'searchAnagram' ? 'bg-orange-400 text-white' : 'bg-transparent text-orange-300',
          'hover:bg-orange-300 hover:text-white hover:border-orange-300 border p-2 rounded-md transition duration-200'
        ]"
        :aria-pressed="currentMode === 'searchAnagram'"
        aria-label="Select Search Anagram Mode"
      >
        Search Anagram
      </button>
    </div>
  </fieldset>
</template>

<style scoped>

</style>
