import { ref } from 'vue';

export const results = ref<{
  mode: 'validate' | 'searchAnagram';
  data: any;
} | null>(null);

export const processValidationResult = (word: string, result: any | null) => {
  if (result) {
    const { lemma, dictionary, comments, length, points } = result;

    const details = {
      lemma: lemma || '-',
      dictionary: dictionary || '-',
      comments: comments || '-',
      length,
      points,
    };

    results.value = {
      mode: 'validate',
      data: {
        message: 'ΑΠΟΔΕΚΤΗ ΛΕΞΗ',
        details,
      },
    };
  } else {
    results.value = {
      mode: 'validate',
      data: {
        message: 'ΜΗ ΑΠΟΔΕΚΤΗ ΛΕΞΗ',
      },
    };
  }
};

export const processAnagramResults = (
  input: string,
  anagrams: string[] | null
) => {
  if (anagrams && anagrams.length > 0) {
    // Group anagrams by word length
    const groupedByLength = anagrams.reduce<Record<number, string[]>>(
      (acc, word) => {
        const length = word.length;
        if (!acc[length]) acc[length] = [];
        acc[length].push(word);
        return acc;
      },
      {}
    );

    results.value = {
      mode: 'searchAnagram',
      data: groupedByLength,
    };

    console.log('Grouped Anagrams:', groupedByLength); // Optional for debugging
  } else {
    results.value = {
      mode: 'searchAnagram',
      data: {}, // Keep the structure consistent
    };

    console.log('No anagrams found for input:', input); // Optional for debugging
  }
};
