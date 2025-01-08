import type { Ref } from 'vue';
import { logger } from '@/utils/logger';

/**
 * Validates a tile click based on the selected mode and constraints.
 * Ensures that the letter clicked is allowed in the current mode, and enforces
 * any applicable limits on letter usage.
 *
 * @param letter The clicked letter.
 * @param mode The current mode of the application (either 'validate' or 'searchAnagram').
 * @param counts A record of how many times each letter has been used.
 * @param letterInfo Optional parameter that provides the letter's valid count (used for searchAnagram mode).
 * @returns A string error message if validation fails, or null if the letter is valid.
 */
export function validateTileClick(
  letter: string,
  mode: string,
  counts: Record<string, number>,
  letterInfo?: { letter: string; count: number }
): string | null {
  if (!letterInfo) return 'Invalid letter.';

  if (mode === 'validate' && letter === '*') {
    return 'Wildcard is not allowed in validate mode.';
  }

  if (mode === 'searchAnagram' && counts[letter] >= letterInfo.count) {
    return `Maximum ${letterInfo.count} ${letter}(s) allowed.`;
  }

  // No error
  return null;
}

/**
 * Validates the input word according to the selected mode.
 * Ensures the input doesn't exceed the maximum word length and
 * doesn't include wildcards in 'validate' mode.
 *
 * @param newVal The new value of the input field.
 * @param mode The current mode of the application.
 * @returns A string error message if validation fails, or null if the input is valid.
 */
export function validateInput(newVal: string, mode: string): string | null {
  if (mode === 'validate' && newVal.includes('*')) {
    return 'Wildcard is not allowed in validate mode.';
  }

  if (newVal.length > 8) {
    return 'Maximum 8 letters allowed!';
  }

  // No error
  return null;
}

/**
 * Resets the letter counts to 0 for all letters.
 * This is used to reset the letter selections state.
 *
 * @param letterCounts A record of the current counts of each letter.
 */
export const resetLetterCounts = (letterCounts: Record<string, number>) => {
  Object.keys(letterCounts).forEach((key) => (letterCounts[key] = 0));
};

/**
 * Adds a letter to the input word.
 * This function checks if the current input word has reached
 * the maximum length of 8 letters before adding a new letter.
 *
 * @param letter The letter to be added to the input word.
 * @param inputWord The reference to the input word where the letter will be added.
 * @returns An object containing the success status and a message describing the action.
 */
export function addLetterToInput(
  letter: string,
  inputWord: Ref<string>
): { success: boolean; message: string } {
  if (inputWord.value.length < 8) {
    inputWord.value += letter;

    return {
      success: true,
      message: letter === '*' ? 'Wildcard added.' : `Letter '${letter}' added.`,
    };
  } else {
    return {
      success: false,
      message: 'Maximum 8 letters allowed!',
    };
  }
}

/**
 * Greek alphabet letters, used for wildcard replacement and other logic
 */
export const GREEK_LETTERS = [
  'Α',
  'Β',
  'Γ',
  'Δ',
  'Ε',
  'Ζ',
  'Η',
  'Θ',
  'Ι',
  'Κ',
  'Λ',
  'Μ',
  'Ν',
  'Ξ',
  'Ο',
  'Π',
  'Ρ',
  'Σ',
  'Τ',
  'Υ',
  'Φ',
  'Χ',
  'Ψ',
  'Ω',
];

/**
 * Generates all possible combinations of a given length from a set of letters.
 * This is used to create possible word combinations from selected letters.
 *
 * @param letters The array of letters to combine.
 * @param length The desired length of each combination.
 * @returns An array of all valid combinations.
 */
export function generateCombinations(
  letters: string[],
  length: number
): string[] {
  const combinations: string[] = [];

  const generate = (current: string[], start: number) => {
    if (current.length === length) {
      combinations.push(current.join(''));
      return;
    }
    for (let i = start; i < letters.length; i++) {
      generate([...current, letters[i]], i + 1);
    }
  };

  generate([], 0);
  return combinations;
}

/**
 * Sorts the letters of the input word in alphabetical order.
 * This is useful for creating alphagrams.
 *
 * @param input The input word or combination of letters.
 * @returns The alphagram (sorted string).
 */
export function getAlphagram(input: string): string {
  return input.toUpperCase().split('').sort().join('');
}

/**
 * Recursively replaces wildcards (*) in the provided letters with every Greek letter.
 * This function generates all possible letter combinations
 * considering wildcard replacements.
 *
 * @param letters The array of letters, potentially containing wildcards.
 * @returns A 2D array of combinations with wildcards replaced by Greek letters.
 */
function replaceWildcards(letters: string[]): string[][] {
  const wildcardIndex = letters.indexOf('*');

  if (wildcardIndex === -1) {
    // No wildcards, return the original letters as a single combination
    return [letters];
  }

  // Generate combinations by replacing the wildcard with every Greek letter
  const combinations: string[][] = [];
  for (const greekLetter of GREEK_LETTERS) {
    const newCombination = [...letters];
    newCombination[wildcardIndex] = greekLetter; // Replace the wildcard
    combinations.push(...replaceWildcards(newCombination)); // Recursive for multiple wildcards
  }

  logger.log('replaceWildcards > combinations: ', combinations);

  return combinations;
}

/**
 * Generates unique alphagrams from a set of letters, considering wildcards.
 * The function replaces wildcards with all possible Greek letters and
 * generates all valid combinations of the resulting set of letters.
 *
 * @param letters The letters to use for generating the alphagrams.
 * @param minLength The minimum length of the combinations to generate (defaults to 2).
 * @returns An array of unique alphagrams generated from the letters.
 */
export function getUniqueAlphagrams(
  letters: string,
  minLength: number = 2
): string[] {
  // Convert to uppercase array
  const letterArray = letters.toUpperCase().split('');
  // Handle wildcards
  const expandedLetters = replaceWildcards(letterArray);
  const uniqueAlphagrams: Set<string> = new Set();

  for (const expandedCombo of expandedLetters) {
    // Generate combinations for each expanded set of letters
    for (let i = minLength; i <= expandedCombo.length; i++) {
      // Generate all possible combinations of a given length from a set of letters.
      const combinations = generateCombinations(expandedCombo, i);
      for (const combo of combinations) {
        // Sort letters alphabetically
        const alphagram = getAlphagram(combo);
        // Ensure uniqueness using a Set
        uniqueAlphagrams.add(alphagram);
      }
    }
  }

  // Convert the Set to an array and return it
  return Array.from(uniqueAlphagrams);
}

/**
 * Retrieves the currently focused element on the page.
 * Useful when we need to check the focused element for keyboard events or
 * remove focus from an element programmatically.
 *
 * @returns The currently focused DOM element, or null if none is focused.
 */
export function getCurrentFocusedElement() {
  // Try to get the currently focused element
  let focusedElement = document.activeElement;

  // Check if the focused element is the body or if no element is focused
  if (!focusedElement || focusedElement === document.body) {
    // Use :focus pseudo-class as a fallback
    focusedElement = document.querySelector(':focus') || null;
  }

  // Log the currently focused element
  logger.log('Currently focused element:', focusedElement);

  // Return the focused element or null if none is found
  return focusedElement;
}

/**
 * Checks if an element is within the viewport.
 * Used to determine if results `div` should be scrolled into view.
 *
 * @param element The DOM element to check.
 * @returns True if the element is within the viewport, false otherwise.
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
