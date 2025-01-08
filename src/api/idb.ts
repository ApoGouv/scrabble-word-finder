import { logger } from '@/utils/logger';

const DB_NAME = 'apog-scrabble-word-data';
const DB_VERSION = 1;
let DB: IDBDatabase | null = null;

// Table names
const ALPHAGRAMS_TABLE = 'words_by_alphagram';
const WORDS_TABLE = 'words_by_starting_letter';

export default {
  /**
   * Gets the IndexedDB instance.
   *
   * @returns A promise that resolves to the IndexedDB instance.
   */
  async getDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (DB) return resolve(DB);

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        logger.error('Error opening database', e);
        reject('Error');
      };

      request.onsuccess = (e) => {
        DB = (e.target as IDBOpenDBRequest).result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(WORDS_TABLE)) {
          db.createObjectStore(WORDS_TABLE, { keyPath: 'word' });
        }

        if (!db.objectStoreNames.contains(ALPHAGRAMS_TABLE)) {
          db.createObjectStore(ALPHAGRAMS_TABLE, { keyPath: 'alphagram' });
        }
      };
    });
  },

  /**
   * Adds words data to the WORDS_TABLE table.
   *
   * @param data - The data to be added to the table, an array of word entries.
   * @returns A promise that resolves when the data is added.
   */
  async addWordsTableData(data: any[]): Promise<void> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([WORDS_TABLE], 'readwrite');
      const store = transaction.objectStore(WORDS_TABLE);

      transaction.oncomplete = () => resolve();
      transaction.onerror = (e) => reject(e);

      data.forEach((entry) => store.put(entry));
    });
  },

  /**
   * Adds alphagrams data to the ALPHAGRAMS_TABLE table.
   *
   * @param data - A record of alphagrams and their associated words.
   * @returns A promise that resolves when the data is added.
   */
  async addAlphagramsTableData(data: Record<string, string[]>): Promise<void> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([ALPHAGRAMS_TABLE], 'readwrite');
      const store = transaction.objectStore(ALPHAGRAMS_TABLE);

      transaction.oncomplete = () => resolve();
      transaction.onerror = (e) => reject(e);

      Object.entries(data).forEach(([alphagram, words]) =>
        store.put({ alphagram, words })
      );
    });
  },

  /**
   * Retrieves a word's data from the WORDS_TABLE table.
   *
   * @param word - The word to retrieve data for.
   * @returns A promise that resolves to the word's data, or null if not found.
   */
  async getWord(word: string): Promise<any | null> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([WORDS_TABLE], 'readonly');
      const store = transaction.objectStore(WORDS_TABLE);

      const request = store.get(word);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e);
    });
  },

  /**
   * Checks if the ALPHAGRAMS_TABLE table is empty.
   *
   * @returns A promise that resolves to true if the table is empty, false otherwise.
   */
  async checkIfAlphagramTableIsEmpty(): Promise<boolean> {
    const db = await this.getDb();
    const transaction = db.transaction([ALPHAGRAMS_TABLE], 'readonly');
    const store = transaction.objectStore(ALPHAGRAMS_TABLE);

    const countRequest = store.count();

    return new Promise((resolve, reject) => {
      countRequest.onsuccess = () => {
        logger.log('idx > checkIfAlphagramTableIsEmpty: ', {
          recordsCount: countRequest.result,
        });
        resolve(countRequest.result === 0);
      };

      countRequest.onerror = (e) => {
        reject(
          new Error('Failed to count records in alphagrams table. Error: ' + e)
        );
      };
    });
  },

  /**
   * Retrieves words grouped by alphagram from the ALPHAGRAMS_TABLE table.
   *
   * @param alphagram - The alphagram to retrieve words for.
   * @returns A promise that resolves to the words associated with the alphagram,
   *          or null if not found.
   */
  async getWordsByAlphagram(alphagram: string): Promise<string[] | null> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([ALPHAGRAMS_TABLE], 'readonly');
      const store = transaction.objectStore(ALPHAGRAMS_TABLE);

      const request = store.get(alphagram);

      request.onsuccess = () => resolve(request.result?.words || null);
      request.onerror = (e) => reject(e);
    });
  },
};
