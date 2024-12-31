import { ref } from 'vue';
import { logger } from '@/utils/logger';

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
        word,
        message: 'ΑΠΟΔΕΚΤΗ ΛΕΞΗ',
        details,
      },
    };
  } else {
    results.value = {
      mode: 'validate',
      data: {
        word,
        message: 'ΜΗ ΑΠΟΔΕΚΤΗ ΛΕΞΗ',
      },
    };
  }
};

export const processAnagramResults = (
  input: string,
  anagrams: Record<string, string[]> | null
) => {
  logger.log('processAnagramResults > Anagrams:', anagrams);
  if (anagrams && Object.keys(anagrams).length > 0) {
    results.value = {
      mode: 'searchAnagram',
      data: anagrams,
    };
  } else {
    results.value = {
      mode: 'searchAnagram',
      data: {}, // Keep the structure consistent
    };
  }
};
