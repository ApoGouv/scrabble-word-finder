import type { Ref } from 'vue';

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

  if (mode === 'search' && counts[letter] >= letterInfo.count) {
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

// Function to generate unique alphagrams for combinations of the letters
export function getUniqueAlphagrams(
  letters: string,
  minLength: number = 2
): string[] {
  const letterArray = letters.toUpperCase().split('');
  const uniqueAlphagrams: Set<string> = new Set();

  // Loop through combinations from 2 characters to the full length
  for (let i = minLength; i <= letterArray.length; i++) {
    const combinations = generateCombinations(letterArray, i);
    for (const combo of combinations) {
      const alphagram = getAlphagram(combo); // Get the alphagram of the combination
      uniqueAlphagrams.add(alphagram); // Use a Set to ensure uniqueness
    }
  }

  // Convert the Set to an array and return it
  return Array.from(uniqueAlphagrams);
}
