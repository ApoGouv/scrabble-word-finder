import { ref } from 'vue';
import { logger } from '@/utils/logger';

// Reactive reference to store the results of
// the current operation (validation or anagram search)
export const results = ref<{
  mode: 'validate' | 'searchAnagram'; // Mode can either be 'validate' or 'searchAnagram'
  data: any; // The result data
} | null>(null);

/**
 * Processes the validation result of a word and updates the `results` reference.
 *
 * @param word - The word being validated.
 * @param result - The validation result, which includes lemma, dictionary,
 *                 comments, length, and points. Can be null.
 */
export const processValidationResult = (word: string, result: any | null) => {
  if (result) {
    // Extract relevant data if the word is valid
    const { lemma, dictionary, comments, length, points } = result;

    // Prepare the details object, ensuring all fields have default values if not provided
    const details = {
      lemma: lemma || '-',
      dictionary: dictionary || '-',
      comments: comments || '-',
      length,
      points,
    };

    // Set the result in the reactive state for 'validate' mode
    results.value = {
      mode: 'validate',
      data: {
        word,
        message: 'ΑΠΟΔΕΚΤΗ ΛΕΞΗ', // Accepted word message
        details,
      },
    };
  } else {
    // If the result is null (invalid word), update with an invalid message
    results.value = {
      mode: 'validate',
      data: {
        word,
        message: 'ΜΗ ΑΠΟΔΕΚΤΗ ΛΕΞΗ', // Invalid word message
      },
    };
  }
};

/**
 * Processes the result of an anagram search and updates the `results` reference.
 *
 * @param input - The input string used to search for anagrams.
 * @param anagrams - A record of valid anagrams found for the input.
 *                   Can be null or an empty object.
 */
export const processAnagramResults = (
  input: string,
  anagrams: Record<string, string[]> | null
) => {
  // Log the input and anagram result for debugging purposes
  logger.log('processAnagramResults > Anagrams:', { input, anagrams });

  if (anagrams && Object.keys(anagrams).length > 0) {
    // If anagrams are found, update the results for 'searchAnagram' mode
    results.value = {
      mode: 'searchAnagram',
      data: anagrams,
    };
  } else {
    // If no anagrams are found, keep the structure consistent with an empty object
    results.value = {
      mode: 'searchAnagram',
      data: {},
    };
  }
};
