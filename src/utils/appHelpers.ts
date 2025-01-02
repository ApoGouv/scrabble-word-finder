import type { Ref } from 'vue';
import { logger } from '@/utils/logger';

/**
 * Letter data for Greek Scrabble
 * Includes points and maximum counts for each letter
 * @see https://en.wikipedia.org/wiki/Scrabble_letter_distributions#Greek
 */
export const letterData = [
  { letter: 'Α', points: 1, count: 12 },
  { letter: 'Β', points: 8, count: 1 },
  { letter: 'Γ', points: 4, count: 2 },
  { letter: 'Δ', points: 4, count: 2 },
  { letter: 'Ε', points: 1, count: 8 },
  { letter: 'Ζ', points: 10, count: 1 },
  { letter: 'Η', points: 1, count: 7 },
  { letter: 'Θ', points: 10, count: 1 },
  { letter: 'Ι', points: 1, count: 8 },
  { letter: 'Κ', points: 2, count: 4 },
  { letter: 'Λ', points: 3, count: 3 },
  { letter: 'Μ', points: 3, count: 3 },
  { letter: 'Ν', points: 1, count: 6 },
  { letter: 'Ξ', points: 10, count: 1 },
  { letter: 'Ο', points: 1, count: 9 },
  { letter: 'Π', points: 2, count: 4 },
  { letter: 'Ρ', points: 2, count: 5 },
  { letter: 'Σ', points: 1, count: 7 },
  { letter: 'Τ', points: 1, count: 8 },
  { letter: 'Υ', points: 2, count: 4 },
  { letter: 'Φ', points: 8, count: 1 },
  { letter: 'Χ', points: 8, count: 1 },
  { letter: 'Ψ', points: 10, count: 1 },
  { letter: 'Ω', points: 3, count: 3 },
  { letter: '*', points: 0, count: 2 }, // Wildcard
];

/**
 * Validate tile click based on mode and constraints
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

  return null; // No error
}

/**
 * Validate the input field value
 */
export function validateInput(
  newVal: string,
  oldVal: string,
  mode: string
): string | null {
  if (mode === 'validate' && newVal.includes('*')) {
    return 'Wildcard is not allowed in validate mode.';
  }

  if (newVal.length > 8) {
    return 'Maximum 8 letters allowed!';
  }

  return null; // No error
}

export const resetLetterCounts = (letterCounts: Record<string, number>) => {
  Object.keys(letterCounts).forEach((key) => (letterCounts[key] = 0));
};

/**
 * Add a letter to the input
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

// Greek alphabet letters
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

// Helper function to generate all combinations of a given length
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

export function getAlphagram(input: string): string {
  return input.toUpperCase().split('').sort().join('');
}

// Function to replace wildcards and generate all possible combinations
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

// Function to generate unique alphagrams for combinations of the letters
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
      const combinations = generateCombinations(expandedCombo, i); // Use existing function
      for (const combo of combinations) {
        const alphagram = getAlphagram(combo); // Sort letters alphabetically
        uniqueAlphagrams.add(alphagram); // Ensure uniqueness using a Set
      }
    }
  }

  // Convert the Set to an array and return it
  return Array.from(uniqueAlphagrams);
}

export function getCurrentFocusedElement() {
  // Try to get the currently focused element
  let focusedElement = document.activeElement;

  // Check if the focused element is the body or if no element is focused
  if (!focusedElement || focusedElement === document.body) {
    // Use :focus pseudo-class as a fallback
    focusedElement = document.querySelector(':focus') || null;
  }

  // Log the currently focused element
  console.log('Currently focused element:', focusedElement);

  // Return the focused element or null if none is found
  return focusedElement;
}

// Checks if an element is in the viewport
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
