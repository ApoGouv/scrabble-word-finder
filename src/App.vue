<script setup lang="ts">
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  import { useToast } from 'vue-toastification';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import LetterTile from '@/components/LetterTile.vue';
  import Modes from '@/components/Modes.vue';
  import Results from '@/components/Results.vue';
  import Loader from '@/components/Loader.vue';
  import GitHubRibbon from '@/components/GitHubRibbon.vue'
  import {
    letterData,
    validateTileClick,
    validateInput,
    resetLetterCounts,
    addLetterToInput,
    isElementInViewport,
  } from './utils/appHelpers';
  import { validateWord } from '@/api/wordValidation';
  import { searchAnagrams } from '@/api/searchAnagrams';
  import { results, processValidationResult, processAnagramResults } from '@/utils/resultsHelpers';

  const toast = useToast();

  const inputField = ref<HTMLInputElement | null>(null);
  const inputWord = ref('');
  // 'validate' or 'searchAnagram'
  const modes = ['validate', 'searchAnagram'] as const;
  type Mode = typeof modes[number];

  const currentMode = ref<Mode>('validate');

  const letterCounts = ref<Record<string, number>>({});
  // Reactive loader state
  const isLoading = ref(false);

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
  const handleTileClick = (letter: string, event?: Event) => {
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

    // Shift focus to the input field
    // inputField.value?.focus();

    // Remove focus from the clicked tile
    if (event?.target instanceof HTMLElement) {
      const buttonElement = event.target.closest('button');
  
      // Check if the target itself is a button or if a button was found as an ancestor
      if (buttonElement && buttonElement.tagName === 'BUTTON') {
        // Remove focus from the button
        buttonElement.blur();
      }
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
  const changeMode = (mode: Mode) => {
    // Prevent redundant state changes
    if (mode === currentMode.value) return;

    // Update the current mode
    currentMode.value = mode;

    clearInput();

    // Reset results
    results.value = null;

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
      const validationResults = await validateWord(trimmedInput, toast, isLoading);
      processValidationResult(trimmedInput, validationResults);
    } else if (currentMode.value === 'searchAnagram') {
      // Add logic to search for anagrams
      const anagrams = await searchAnagrams(trimmedInput, toast, isLoading);
      processAnagramResults(trimmedInput, anagrams);
    }

    // Focus on the results wrapper if it exists and is not visible in the viewport
    const resultsWrapper = document.getElementById('results-wrapper');

    if (resultsWrapper) {
      const isInView = isElementInViewport(resultsWrapper);

      if (!isInView) {
        resultsWrapper.setAttribute('tabindex', '-1'); // Temporarily make it focusable
        resultsWrapper.focus();
        resultsWrapper.blur(); // Optionally remove focus immediately after scrolling
        resultsWrapper.removeAttribute('tabindex'); // Clean up tabindex
      }
    }
  };
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header></Header>

    <div class="app-container container mx-auto px-4 py-8 flex-1">
        <!-- Loader -->
        <Loader v-if="isLoading" />

        <!-- Tiles, Input and Modes -->
        <div 
          class="form-container flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-y-6 justify-between items-start"
        >

          <!-- App modes -->
          <div class="modes-wrapper w-full md:w-1/2 md:px-2">
            <Modes :currentMode="currentMode" @changeMode="changeMode" />
          </div>

          <!-- Letter Tile Grid -->
          <div 
              class="tile-grid grid grid-cols-5 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3 w-full md:w-1/2 md:px-2 max-w-lg"
            >
            <LetterTile
              v-for="tile in letterData"
              :key="tile.letter"
              :letter="tile.letter"
              :points="tile.points"
              :isDisabled="currentMode === 'validate' && tile.letter === '*'"
              @click="(event: Event) => handleTileClick(tile.letter, event)"
              class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-teal-600 text-white rounded-lg shadow-md cursor-pointer hover:bg-teal-500"
            />
          </div>

          <div class="scrabble-input-and-submit-wrapper flex flex-col gap-4 w-full md:w-full md:max-w-none md:px-2 lg:max-w-lg">
            <div class="scrabble-input-wrapper">
              <input
                type="text"
                class="scrabble-input p-2 text-md md:p-3 md:text-xl border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                v-model="inputWord"
                :placeholder="
                  currentMode === 'searchAnagram'
                    ? 'Choose your letters (wildcards allowed)...'
                    : 'Choose your word for validation...'
                "
                readonly
                aria-label="Read only input field for letters or word"
                ref="inputField"
              />
              <button
                v-if="inputWord.length > 0"
                class="clear-button text-xl"
                @click="clearInput"
                title="Clear Input"
                aria-label="Clear the input field"
              >
                ✖
              </button>
            </div>
            <div class="scrabble-submit-wrapper">
              <button
                :disabled="!inputWord"
                @click="handleSubmit"
                aria-label="Submit the word or letters"
                class="submit-button w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ currentMode === 'searchAnagram' ? 'Find Anagrams' : 'Validate Word' }}
              </button>
            </div>
          </div><!-- End of input and submit button -->
          
        </div><!-- End of form-container -->

        <!-- Results Section -->
        <Results :results="results" />
    </div>

    <Footer></Footer>

    <!-- GitHub Ribbon -->
    <GitHubRibbon 
      title="Check out the source code on GitHub"
      repoUrl="https://github.com/ApoGouv/scrabble-word-finder"
      :svgFill="'rgba(255, 255, 255, 0.3)'" 
      :svgColor="'rgba(21, 21, 19, 1)'" 
      :showMatrix="true"
    />
  </div>
</template>

<style scoped>
  .tile-grid {
  }

  .scrabble-input-wrapper {
    display: flex;
    gap: 10px;
    margin: 10px 0;
    position: relative;
  }

  .scrabble-input {
    width: 100%;
    max-width: 100%;
    height: 3rem;
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
