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

// Map English letters to Greek letters based on Greek keyboard layout
export const englishToGreekMap: Record<string, string> = {
  A: 'Α',
  B: 'Β',
  G: 'Γ',
  D: 'Δ',
  E: 'Ε',
  Z: 'Ζ',
  H: 'Η',
  U: 'Θ',
  I: 'Ι',
  K: 'Κ',
  L: 'Λ',
  M: 'Μ',
  N: 'Ν',
  J: 'Ξ',
  O: 'Ο',
  P: 'Π',
  R: 'Ρ',
  S: 'Σ',
  T: 'Τ',
  Y: 'Υ',
  F: 'Φ',
  X: 'Χ',
  C: 'Ψ',
  V: 'Ω',
};
