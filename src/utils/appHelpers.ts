import type { Ref } from "vue"

/**
 * Letter data for Greek Scrabble
 * Includes points and maximum counts for each letter
 * @see https://en.wikipedia.org/wiki/Scrabble_letter_distributions#Greek
 */
export const letterData = [
    { letter: "Α", points: 1, count: 12 },
    { letter: "Β", points: 8, count: 1 },
    { letter: "Γ", points: 4, count: 2 },
    { letter: "Δ", points: 4, count: 2 },
    { letter: "Ε", points: 1, count: 8 },
    { letter: "Ζ", points: 10, count: 1 },
    { letter: "Η", points: 1, count: 7 },
    { letter: "Θ", points: 10, count: 1 },
    { letter: "Ι", points: 1, count: 8 },
    { letter: "Κ", points: 2, count: 4 },
    { letter: "Λ", points: 3, count: 3 },
    { letter: "Μ", points: 3, count: 3 },
    { letter: "Ν", points: 1, count: 6 },
    { letter: "Ξ", points: 10, count: 1 },
    { letter: "Ο", points: 1, count: 9 },
    { letter: "Π", points: 2, count: 4 },
    { letter: "Ρ", points: 2, count: 5 },
    { letter: "Σ", points: 1, count: 7 },
    { letter: "Τ", points: 1, count: 8 },
    { letter: "Υ", points: 2, count: 4 },
    { letter: "Φ", points: 8, count: 1 },
    { letter: "Χ", points: 8, count: 1 },
    { letter: "Ψ", points: 10, count: 1 },
    { letter: "Ω", points: 3, count: 3 },
    { letter: "*", points: 0, count: 2 }, // Wildcard
];

/**
 * Validate tile click based on mode and constraints
 */
export function validateTileClick(
    letter: string,
    mode: string,
    counts: Record<string, number>,
    letterData: Array<{ letter: string; points: number; count: number }>
  ): string | null {
    const letterInfo = letterData.find((tile) => tile.letter === letter);
    if (!letterInfo) return "Invalid letter.";
  
    if (mode === "validate" && letter === "*") {
      return "Wildcard is not allowed in validate mode.";
    }
  
    if (mode === "search" && counts[letter] >= letterInfo.count) {
      return `Maximum ${letterInfo.count} ${letter}(s) allowed.`;
    }
  
    return null; // No error
  }
  
  /**
   * Validate the input field value
   */
  export function validateInput(newVal: string, oldVal: string, mode: string): string | null {
    if (mode === "validate" && newVal.includes("*")) {
      return "Wildcard is not allowed in validate mode.";
    }
  
    if (newVal.length > 8) {
      return "Maximum 8 letters allowed!";
    }
  
    return null; // No error
  }

  /**
 * Reset state when mode changes
 */
export function resetStateForMode(
    mode: string,
    currentMode: Ref<string>,
    inputWord: Ref<string>,
    letterCounts: Ref<Record<string, number>>
  ) {
    currentMode.value = mode;
    inputWord.value = "";
    Object.keys(letterCounts.value).forEach((key) => {
      letterCounts.value[key] = 0;
    });
  }
  
  /**
   * Add a letter to the input
   */
  export function addLetter(letter: string, inputWord: Ref<string>): string | null {
    if (inputWord.value.length < 8) {
      inputWord.value += letter;
      return null;
    } else {
      return "Maximum 8 letters allowed!";
    }
  }