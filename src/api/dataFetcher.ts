import { logger } from '@/utils/logger';

/**
 * Fetches words starting with a specific letter from the data folder.
 *
 * @param letter - The starting letter of the words to fetch.
 * @returns A promise that resolves to an array of words starting with the
 *          provided letter or null if there is an error.
 */
export async function fetchWordsByLetter(
  letter: string
): Promise<any[] | null> {
  // Construct the URL based on the provided letter
  const url = `${
    import.meta.env.BASE_URL
  }/data/words_by_starting_letter/words_starting_with_${letter}.json`;

  try {
    // Fetch the data from the constructed URL
    const response = await fetch(url);

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to load json file for letter: ${letter}`);
    }

    // Parse and return the JSON response if successful
    return await response.json();
  } catch (error) {
    // Log any errors to the console
    logger.error(`Error fetching words for letter ${letter}:`, error);
    return null;
  }
}

/**
 * Fetches words grouped by alphagram from the data folder.
 *
 * @returns A promise that resolves to a record of words grouped by
 *          their alphagram or null if there is an error.
 */
export async function fetchWordsByAlphagram(): Promise<Record<
  string,
  string[]
> | null> {
  // Construct the URL for fetching words grouped by alphagram
  const url = `${
    import.meta.env.BASE_URL
  }data/words_by_alphagram/words_grouped_by_alphagram.json`;

  try {
    // Fetch the data from the constructed URL
    const response = await fetch(url);

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error('Failed to load words grouped by alphagram.');
    }

    // Parse and return the JSON response if successful
    return await response.json();
  } catch (error) {
    // Log any errors to the console
    logger.error('Error fetching words by alphagram:', error);
    return null;
  }
}
