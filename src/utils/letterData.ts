/**
 * Letter data for Greek Scrabble
 * This array contains the letter, its corresponding point value,
 * and the maximum number of tiles available for each letter.
 * The data follows the Greek letter distribution used in Scrabble.
 *
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
 * Returns an array of Greek letters from the letterData.
 * Filters out the wildcard (*) from the list.
 *
 * @returns Array of Greek letters without wildcards.
 */
export function getGreekLetters(): string[] {
  return letterData
    .filter((item) => item.letter !== '*') // Exclude the wildcard
    .map((item) => item.letter);
}

/**
 * Maps English letters to their corresponding Greek letters based on
 * the Greek keyboard layout.
 * This map is used for converting English letters into Greek letters
 * when english keyboard keys are being pressed.
 *
 * Note: The English letters are mapped to Greek letters considering
 * their placement in the Greek keyboard layout.
 * For example, English 'A' maps to Greek 'Α', English 'C' maps to Greek 'Ψ', etc.
 */
export const englishToGreekMap: Record<string, string> = {
  A: 'Α', // English 'A' -> Greek 'Α'
  B: 'Β', // English 'B' -> Greek 'Β'
  C: 'Ψ', // English 'C' -> Greek 'Ψ'
  D: 'Δ', // English 'D' -> Greek 'Δ'
  E: 'Ε', // English 'E' -> Greek 'Ε'
  F: 'Φ', // English 'F' -> Greek 'Φ'
  G: 'Γ', // English 'G' -> Greek 'Γ'
  H: 'Η', // English 'H' -> Greek 'Η'
  I: 'Ι', // English 'I' -> Greek 'Ι'
  J: 'Ξ', // English 'J' -> Greek 'Ξ'
  K: 'Κ', // English 'K' -> Greek 'Κ'
  L: 'Λ', // English 'L' -> Greek 'Λ'
  M: 'Μ', // English 'M' -> Greek 'Μ'
  N: 'Ν', // English 'N' -> Greek 'Ν'
  O: 'Ο', // English 'O' -> Greek 'Ο'
  P: 'Π', // English 'P' -> Greek 'Π'
  R: 'Ρ', // English 'R' -> Greek 'Ρ'
  S: 'Σ', // English 'S' -> Greek 'Σ'
  T: 'Τ', // English 'T' -> Greek 'Τ'
  U: 'Θ', // English 'U' -> Greek 'Θ'
  V: 'Ω', // English 'V' -> Greek 'Ω'
  X: 'Χ', // English 'X' -> Greek 'Χ'
  Y: 'Υ', // English 'Y' -> Greek 'Υ'
  Z: 'Ζ', // English 'Z' -> Greek 'Ζ'
};
