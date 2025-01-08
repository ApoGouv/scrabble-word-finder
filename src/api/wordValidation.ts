import idb from '@/api/idb';
import { fetchWordsByLetter } from '@/api/dataFetcher';
import { logger } from '@/utils/logger';

/**
 * Function to validate a word by checking if it's in the IndexedDB or
 * fetching it from an external source.
 *
 * @param word - The word to validate.
 * @param toast - The toast notification handler for success or error messages.
 * @param isLoading - An object to control the loading state (used for showing a loader).
 * @returns A promise that resolves to the word data if valid or
 *          null if invalid or an error occurs.
 */
export async function validateWord(
  word: string,
  toast: any,
  isLoading: { value: boolean }
): Promise<any> {
  // Get the first letter of the word
  const startingLetter = word[0].toUpperCase();

  isLoading.value = true; // Show the loader

  try {
    // Check if the word is already in IndexedDB
    let cachedWordData = await idb.getWord(word);

    if (cachedWordData) {
      logger.log('Word found in cached data and is valid!', {
        word,
        cachedWordData,
      });
      toast.success('Word is valid!');
      return cachedWordData;
    }

    // If not cached, fetch and save the data to the database
    const words = await fetchWordsByLetter(startingLetter);
    if (!words) {
      toast.error('Failed to fetch word data.');
      return null;
    }

    // Cache the newly fetched data
    await idb.addWordsTableData(words);

    // Validate the word again after caching
    cachedWordData = await idb.getWord(word);
    if (cachedWordData) {
      logger.log('Word data fetched, cached, and word is valid!', {
        word,
        cachedWordData,
      });
      toast.success('Word is valid!');
      return cachedWordData;
    } else {
      logger.log('Word data fetched and cached, but word is invalid.', {
        word,
        cachedWordData,
      });
      toast.error('Invalid word.');
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error validating word:', error.message);
    } else {
      logger.error('Error validating word:', error);
    }
    toast.error('An error occurred during validation.');
    return null;
  } finally {
    isLoading.value = false; // Hide the loader
  }
}
