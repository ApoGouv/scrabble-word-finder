import idb from '@/api/idb';
import { fetchWordsByAlphagram } from '@/api/dataFetcher';
import { getAlphagram, generateCombinations } from '@/utils/appHelpers';

// Function to search for anagrams given a string
export async function searchAnagrams(
  letters: string,
  toast: any,
  isLoading: { value: boolean }
): Promise<string[] | null> {
  const alphagram = getAlphagram(letters);

  isLoading.value = true; // Show the loader

  try {
    // Check if the anagrams for this alphagram are already cached in IndexedDB
    let cachedAnagrams = await idb.getWordsByAlphagram(alphagram);

    if (cachedAnagrams) {
      console.log('Anagrams found in cache:', cachedAnagrams);
      return cachedAnagrams;
    }

    // If not cached, fetch the words based on the alphagram
    const wordsByAlphagram = await fetchWordsByAlphagram();

    if (!wordsByAlphagram) {
      return null;
    }

    // Cache the newly fetched data
    await idb.addAlphagramsTableData(wordsByAlphagram);

    // Query the newly cached data
    cachedAnagrams = await idb.getWordsByAlphagram(alphagram);

    if (cachedAnagrams) {
      console.log('Anagrams found after fetch and cache:', cachedAnagrams);
      return cachedAnagrams;
    } else {
      console.log('No anagrams found.');
      toast.error('No anagrams found.');
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error searching anagrams:', error.message);
    } else {
      console.error('Error searching anagrams:', error);
    }
    toast.error('An error occurred while searching for anagrams.');
    return null;
  } finally {
    isLoading.value = false; // Hide the loader
  }
}
