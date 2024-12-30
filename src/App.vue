<script setup lang="ts">
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  import idb from './api/idb';
  import Header from './components/Header.vue';
  import LetterTile from './components/LetterTile.vue';
  import Modes from './components/Modes.vue';
  import Results from './components/Results.vue';
  import { useToast } from 'vue-toastification';
  import {
    letterData,
    validateTileClick,
    validateInput,
    resetLetterCounts,
    addLetterToInput,
  } from './utils/appHelpers';

  const toast = useToast();

  const inputWord = ref('');
  // 'validate' or 'searchAnagram'
  const currentMode = ref('validate');
  const letterCounts = ref<Record<string, number>>({});
  // Reactive loader state
  const isLoading = ref(true);
  const results = ref<string[]>([]);

  // Initialize letterCounts with all counts set to 0
  letterData.forEach(({ letter }) => {
    letterCounts.value[letter] = 0;
  });

  // Handle keyboard key presses
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();

    if (
      key === 'BACKSPACE' ||
      key === 'DELETE' ||
      key === 'DEL' ||
      ((event.ctrlKey || event.metaKey) && key === 'Z')
    ) {
      if (inputWord.value.length > 0) {
        const lastChar = inputWord.value.slice(-1);
        inputWord.value = inputWord.value.slice(0, -1);

        if (currentMode.value === 'searchAnagram') {
          // Decrement count for removed character
          letterCounts.value[lastChar] = Math.max(
            letterCounts.value[lastChar] - 1,
            0
          );
        }
        toast.info('Removed last character.');
      }
      return;
    }

    if (key === '1' || key === 'NUMPAD1') {
      changeMode('validate');
      return;
    }

    if (key === '2' || key === 'NUMPAD2') {
      changeMode('searchAnagram');
      return;
    }

    // Handle "Enter" key to submit word
    if (key === 'ENTER') {
      handleSubmit();
      return;
    }

    if (currentMode.value === 'validate' && key === '*') {
      toast.error('Wildcard is not allowed in Validate mode.');
      return;
    }

    const isValidLetter = letterData.some((tile) => tile.letter === key);
    if (!isValidLetter) return;

    // handleTileClick(key);
    const tile = document.querySelector(`[data-letter="${key}"]`);
    if (tile) {
      tile.dispatchEvent(new Event('click'));
      tile.classList.add('hovered');
      setTimeout(() => tile.classList.remove('hovered'), 300); // Match hover duration
    }
  };

  // Add and remove the keyboard event listener
  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress);
  });

  // Handle tile clicks or key presses: add the letter to the input
  const handleTileClick = (letter: string) => {
    const letterInfo = letterData.find((tile) => tile.letter === letter);

    const error = validateTileClick(
      letter,
      currentMode.value,
      letterCounts.value,
      letterInfo
    );

    if (error) {
      toast.error(error);
      return;
    }

    if (currentMode.value === 'searchAnagram' && letterInfo) {
      letterCounts.value[letter] += 1;
    }

    const result = addLetterToInput(letter, inputWord);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
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

  // Change the mode (e.g., 'validate' or 'searchAnagram')
  const changeMode = (mode: string) => {
    // Prevent redundant state changes
    if (mode === currentMode.value) return;

    // Update the current mode
    currentMode.value = mode;

    clearInput();

    const modeMessage =
      mode === 'validate'
        ? 'Switched to Validate mode.'
        : 'Switched to Search Anagram mode.';

    toast.info(modeMessage);
  };

  const clearInput = () => {
    inputWord.value = '';
    resetLetterCounts(letterCounts.value);
    toast.info('Input cleared.');
  };

  // Handle submission of the input
  const handleSubmit = async () => {
    // Trim the input to avoid spaces
    const trimmedInput = inputWord.value.trim();

    // Update the inputWord to reflect the trimmed value
    inputWord.value = trimmedInput;

    if (!trimmedInput) {
      toast.error('Please enter some letters or a word.');
      return;
    }

    // Check if input length is valid (2 to 8 characters)
    if (trimmedInput.length < 2 || trimmedInput.length > 8) {
      toast.error('Submitted word or letters must be 2 to 8 characters.');
      return;
    }

    // Proceed based on the mode
    if (currentMode.value === 'validate') {
      const validationResults = await validateWord(trimmedInput);
    } else if (currentMode.value === 'searchAnagram') {
      // Add logic to search for anagrams
      searchAnagrams(trimmedInput);
    }
  };

  // Helper function to load words for the starting letter
  async function loadWordsByLetter(letter: string): Promise<any[]> {
    const url = `/data/words_by_starting_letter/words_starting_with_${letter}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to load words for letter: ${letter}`);
    }
    return await response.json();
  }

  async function validateWord(word: string) {
    // Get the first letter of the word
    const startingLetter = word[0].toUpperCase();

    isLoading.value = true; // Show the loader

    try {
      // Check if the word is already in IndexedDB
      const cachedWord = await idb.getWord(word);

      if (cachedWord) {
        console.log("Word is valid!", cachedWord);
        toast.success('Word is valid!');
        return;
      }

      // If not cached, fetch and save the data to the database
      const words = await loadWordsByLetter(startingLetter);
      await idb.addWordsTableData(words);

      // Validate the word again after caching
      const wordExists = words.some((entry) => entry.word === word);
      if (wordExists) {
        console.log("Word is valid!!", wordExists);
        toast.success('Word is valid!');
      } else {
        console.log("Invalid word..", wordExists);
        toast.error('Invalid word.');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error validating word:', error.message);
      } else {
        console.error('Error validating word:', error);
      }
      toast.error('An error occurred during validation.');
    } finally {
      isLoading.value = false; // Hide the loader
    }
  }

  // Function to search for anagrams in 'searchAnagram' mode
  const searchAnagrams = (letters: string) => {
    // Logic to search anagrams based on the input letters
    // For now, we will return a mock result
    const mockAnagrams = ['ΑΒ', 'ΒΓ', 'ΓΔ']; // Replace with actual anagram search logic
    if (mockAnagrams.length > 0) {
      results.value = mockAnagrams; // Assuming 'results' is bound to the Results component
      toast.success('Anagrams found!');
    } else {
      results.value = [];
      toast.error('No anagrams found.');
    }
  };
</script>

<template>
  <Header></Header>
  <div class="app-container container">
    <div class="app-wrapper">
      <!-- Loader -->
      <div v-if="isLoading" class="loader">Validating...</div>

      <!-- Tiles, Input and Modes -->
      <div class="form-container">
        <!-- App modes -->
        <Modes :currentMode="currentMode" @changeMode="changeMode" />

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
            :placeholder="
              currentMode === 'searchAnagram'
                ? 'Enter your letters (wildcards allowed)...'
                : 'Enter your word for validation...'
            "
            readonly
            aria-label="Read only input field for letters or word"
          />
          <button
            v-if="inputWord.length > 0"
            class="clear-button"
            @click="clearInput"
            title="Clear Input"
            aria-label="Clear the input field"
          >
            ✖
          </button>
        </div>

        <button
          :disabled="!inputWord"
          @click="handleSubmit"
          aria-label="Submit the word or letters"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>

      <!-- Results Section -->
      <Results :results="results" />
    </div>
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

  .loader {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #555;
    margin-top: 20px;
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
    position: relative;
  }

  .scrabble-input {
    font-size: 1.5rem;
    padding: 10px;
    width: 100%;
    max-width: 100%;
    height: 3rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    margin: 19px 0;
    box-sizing: border-box;
    position: relative;
    transition: all 0.3s ease;
  }

  .scrabble-input.focus,
  .scrabble-input:focus {
    border-color: #2a9d8f;
    box-shadow: 0 0 8px rgba(42, 157, 143, 0.5);
  }

  .clear-button {
    background: #f44336;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    width: 35px;
    height: 35px;
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .clear-button:hover {
    background: #e53935;
  }
</style>
