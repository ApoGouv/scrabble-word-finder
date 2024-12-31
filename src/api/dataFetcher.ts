// Function to load words starting with a specific letter
export async function fetchWordsByLetter(
  letter: string
): Promise<any[] | null> {
  const url = `${import.meta.env.BASE_URL}/data/words_by_starting_letter/words_starting_with_${letter}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to load json file for letter: ${letter}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching words for letter ${letter}:`, error);
    return null;
  }
}

// Function to fetch the words grouped by alphagram from the JSON file
export async function fetchWordsByAlphagram(): Promise<Record<
  string,
  string[]
> | null> {
  const url = `${import.meta.env.BASE_URL}data/words_by_alphagram/words_grouped_by_alphagram.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to load words grouped by alphagram.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching words by alphagram:', error);
    return null;
  }
}
