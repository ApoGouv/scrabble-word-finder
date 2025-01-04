import idb from '@/api/idb';
import { fetchWordsByLetter } from '@/api/dataFetcher';
import { logger } from '@/utils/logger';

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
      logger.log('Word found in cached data and is Valid!', {
        word,
        cachedWordData,
      });
      toast.success('Word is valid!');
      return cachedWordData;
    }

    // If not cached, fetch and save the data to the database
    const words = await fetchWordsByLetter(startingLetter);
    if (!words) {
      return null;
    }

    // Cache the newly fetched data
    await idb.addWordsTableData(words);

    // Validate the word again after caching
    cachedWordData = await idb.getWord(word);
    if (cachedWordData) {
      logger.log('Word data fetched and cached and word is Valid!!', {
        word,
        cachedWordData,
      });
      toast.success('Word is valid!');
      return cachedWordData;
    } else {
      logger.log('Word data fetched and cached but word is Invalid.', {
        word,
        cachedWordData,
      });
      toast.error('Invalid word.');
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error validating word:', error.message);
    } else {
      console.error('Error validating word:', error);
    }
    toast.error('An error occurred during validation.');
    return null;
  } finally {
    isLoading.value = false; // Hide the loader
  }
}
