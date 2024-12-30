<script setup lang="ts">
  const props = defineProps<{
    currentMode: string;
  }>();
</script>

<template>
  <fieldset class="modes" role="group" aria-labelledby="mode-selection">
    <legend id="mode-selection">Mode Selection</legend>
    <p class="modes-current">
      <strong>Current Mode: </strong>
      <span
        :class="
          currentMode === 'validate' ? 'validate-mode' : 'search-anagram-mode'
        "
      >
        {{ currentMode }}
      </span>
    </p>
    <p class="modes-description">
      <strong>Validate Mode:</strong> Select letters of a word to check if it's
      valid according to competitive Greek Scrabble rules.<br />
      <strong>Search Anagram Mode:</strong> Select up to 8 characters, to see
      all valid words. You can include wildcards (*).
    </p>
    <div class="buttons">
      <button
        @click="$emit('changeMode', 'validate')"
        :class="{ active: currentMode === 'validate' }"
        :aria-pressed="currentMode === 'validate'"
        :aria-label="'Select Validate Mode'"
        class="tooltip button-validate"
      >
        Validate
        <span class="tooltip-text">
          Select the letters of a word (up to 8 letters). We'll check if the
          word is valid in competitive Greek Scrabble.
        </span>
      </button>
      <button
        @click="$emit('changeMode', 'searchAnagram')"
        :class="{ active: currentMode === 'searchAnagram' }"
        :aria-pressed="currentMode === 'searchAnagram'"
        :aria-label="'Select Search Anagram Mode'"
        class="tooltip button-search-anagram"
      >
        Search Anagram
        <span class="tooltip-text">
          Select up to 8 letters, including wildcards (*). We'll return all
          valid words based on your input.
        </span>
      </button>
    </div>
  </fieldset>
</template>

<style scoped>
  .modes {
    border: 2px solid #1f575e;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    text-align: left;
  }

  .modes-current {
    margin: 0.5rem 0;
  }

  .modes-current span.validate-mode {
    color: #2a9d8f;
    font-weight: bold;
  }

  .modes-current span.search-anagram-mode {
    color: #e76f51;
    font-weight: bold;
  }

  .modes-description {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #ededed;
  }

  .buttons button {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    background: transparent;
    border: 1px solid #e2e8f0;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    font-family: inherit;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    border-radius: 0px;
    margin: 0.4rem;
  }

  .buttons button.active,
  .buttons button:active,
  .buttons button:hover {
    background: #f8fafc;
    border-color: #e2e8f0;
    color: #64748b;
    outline: none;
  }
  .buttons button:active {
    background: #cbdaea;
  }

  /* Tooltip styles */
  .tooltip {
    position: relative;
  }

  .tooltip-text {
    visibility: hidden;
    width: 220px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    bottom: 125%; /* Position above the button */
    left: 50%;
    margin-left: -110px; /* Center-align tooltip */
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 0.85rem;
    z-index: 1;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
</style>
