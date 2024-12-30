<script setup lang="ts">
import { ref, watch } from "vue";
import LetterTile from './components/LetterTile.vue'
import Modes from './components/Modes.vue'
import Results from './components/Results.vue'
import { useToast } from "vue-toastification";
import {
  letterData,
  validateTileClick,
  validateInput,
  resetStateForMode,
  addLetter,
} from "./utils/appHelpers";

const toast = useToast();

const inputWord = ref("");
 // 'validate' or 'search'
const currentMode = ref("validate");
const letterCounts = ref<Record<string, number>>({});
const results = ref<string[]>([]);

// Initialize letterCounts with all counts set to 0
letterData.forEach(({ letter }) => {
  letterCounts.value[letter] = 0;
});

// Handle tile clicks: add the letter to the input
const handleTileClick = (letter: string) => {
  const error = validateTileClick(letter, currentMode.value, letterCounts.value, letterData);

  if (error) {
    toast.error(error);
    return;
  }

  const letterInfo = letterData.find((tile: { letter: string; }) => tile.letter === letter);
  if (currentMode.value === "search" && letterInfo) {
    letterCounts.value[letter] += 1;
  }

  const addError = addLetter(letter, inputWord);
  if (addError) {
    toast.error(addError);
  }
};



// Watch the input field to ensure no more than 8 letters
watch(inputWord, (newVal, oldVal) => {
  const error = validateInput(newVal, oldVal, currentMode.value);
  if (error) {
    inputWord.value = oldVal;
    toast.error(error);
  }
});

// Change the mode (e.g., 'validate' or 'search')
const changeMode = (mode: string) => {
  resetStateForMode(mode, currentMode, inputWord, letterCounts);
};

// Handle submission of the input
const handleSubmit = () => {
  if (!inputWord.value) {
    toast.error("Please enter letters or a word.");
    return;
  }
};
</script>

<template>
  <div id="app" class="app-container">
    <h1 class="scrabble-header">Greek Scrabble Finder</h1>

    <!-- Tiles, Input and Modes -->
    <div class="form-container">

      <!-- App modes -->
      <Modes 
        :currentMode="currentMode" 
        @changeMode="changeMode" 
      />

      <!-- Letter Tile Grid -->
      <div class="tile-grid">
        <LetterTile
          v-for="tile in letterData"
          :key="tile.letter"
          :letter="tile.letter"
          :points="tile.points"
          :isDisabled="currentMode === 'validate' && tile.letter === '*'"
          @click="handleTileClick(tile.letter)"
        />
      </div>

      <div class="scrabble-input-wrapper">
        <input 
          type="text"
          class="scrabble-input"
          v-model="inputWord" 
          placeholder="Enter your word or letters..." 
        />
      </div>
      
      <button 
        :disabled="!inputWord"
        @click="handleSubmit"
      >
        Submit
      </button>
    </div>

    <!-- Results Section -->
    <Results :results="results" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.tile-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  /* max-width: 600px; */
}

.scrabble-input-wrapper {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.scrabble-input {
  font-size: 1.5rem;
  padding: 10px;
  width: 100%;
  max-width: 100%;
  border: 2px solid #ddd;
  border-radius: 5px;
  margin: 19px 0;
}
</style>
