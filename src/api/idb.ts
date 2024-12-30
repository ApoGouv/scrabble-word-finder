const DB_NAME = 'apog-scrabble-word-data';
const DB_VERSION = 1;
let DB: IDBDatabase | null = null;

// Table names
const ALPHAGRAMS_TABLE = 'words_by_alphagram';
const WORDS_TABLE = 'words_by_starting_letter';

export default {
  async getDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (DB) return resolve(DB);

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        console.error('Error opening database', e);
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
