import { encryptData, decryptData } from './encryption';

const DB_NAME = 'privacy-notes-db';
const STORE_NAME = 'notes';

const db = {
  async getAllNotes() {
    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
          const notes = getAllRequest.result.map(note => ({
            ...note,
            title: decryptData(note.title),
            content: decryptData(note.content)
          }));
          resolve(notes);
        };
      };

      request.onerror = () => {
        resolve([]);
      };
    });
  },

  async saveNote(note, id) {
    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const noteToSave = {
          id: id || Date.now().toString(),
          title: encryptData(note.title),
          content: encryptData(note.content),
          updatedAt: new Date().toISOString()
        };

        const putRequest = store.put(noteToSave);

        putRequest.onsuccess = () => {
          this.getAllNotes().then(resolve);
        };
      };
    });
  },

  async deleteNote(id) {
    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const deleteRequest = store.delete(id);

        deleteRequest.onsuccess = () => {
          this.getAllNotes().then(resolve);
        };
      };
    });
  }
};

export default db;