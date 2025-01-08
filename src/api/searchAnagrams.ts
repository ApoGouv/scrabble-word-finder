import idb from '@/api/idb';
import { logger } from '@/utils/logger';
import { fetchWordsByAlphagram } from '@/api/dataFetcher';
import { getUniqueAlphagrams } from '@/utils/appHelpers';

/**
 * Function to search for anagrams given a string of letters.
 *
 * @param letters - The string of letters for which to find anagrams.
 * @param toast - The toast notification handler for error messages.
 * @param isLoading - An object to control the loading state (used for showing a loader).
 * @returns A promise that resolves to a record of grouped anagrams or null if no anagrams are found.
 */
export async function searchAnagrams(
  letters: string,
  toast: any,
  isLoading: { value: boolean }
): Promise<Record<string, string[]> | null> {
  const uniqueAlphagrams = getUniqueAlphagrams(letters, 2);
  const groupedByLength: Record<string, string[]> = {};

  isLoading.value = true; // Show the loader

  logger.log(
    `searchAnagrams for given letters "${letters}" and uniqueAlphagrams:`,
    { uniqueAlphagrams }
  );

  try {
    // Check if the alphagram table is empty
    const isTableEmpty = await idb.checkIfAlphagramTableIsEmpty();

    // Fetch words only if the table is empty
    if (isTableEmpty) {
      // If no cached anagrams found, fetch the words based on the alphagram
      const wordsByAlphagram = await fetchWordsByAlphagram();

      if (!wordsByAlphagram) {
        // Bail out early if no data is available
        return null;
      }

      // Cache the fetched data
      await idb.addAlphagramsTableData(wordsByAlphagram);
    }

    // Loop through all unique alphagrams
    for (const alphagram of uniqueAlphagrams) {
      let cachedAnagrams = await idb.getWordsByAlphagram(alphagram);

      if (!cachedAnagrams) {
        // Skip to the next combination if no data is available
        continue;
      }

      // Group anagrams by their length
      const wordLength = cachedAnagrams[0].length;
      // Create the string key based on length
      const lengthKey = `length_${wordLength}`;

      if (!groupedByLength[lengthKey]) {
        groupedByLength[lengthKey] = [];
      }
      groupedByLength[lengthKey].push(...cachedAnagrams);
    }

    if (Object.keys(groupedByLength).length === 0) {
      toast.error('No anagrams found.');
      return null;
    }

    // Optional for debugging
    logger.log('Unsorted Grouped Anagrams:', groupedByLength);

    // Sort the groupedByLength by length in descending order
    // Then sort each group alphabetically
    const sortedGroupedByLength = Object.entries(groupedByLength)
      // Sort by length in descending order
      .sort(
        ([keyA], [keyB]) =>
          Number(keyB.replace('length_', '')) -
          Number(keyA.replace('length_', ''))
      )
      .reduce<Record<string, string[]>>((acc, [key, words]) => {
        // The acc in the reduce function stands for "accumulator."
        // Sort words alphabetically within each length group
        acc[key] = words.sort();
        return acc;
      }, {});

    // Optional for debugging
    logger.log('Sorted Grouped Anagrams:', sortedGroupedByLength);

    return sortedGroupedByLength;
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error searching anagrams:', error.message);
    } else {
      logger.error('Error searching anagrams:', error);
    }
    toast.error('An error occurred while searching for anagrams.');
    return null;
  } finally {
    isLoading.value = false; // Hide the loader
  }
}
