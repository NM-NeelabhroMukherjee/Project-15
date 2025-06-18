import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import Navbar from './components/Navbar';
import db from './utils/db';
import './styles.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadNotes = async () => {
      const loadedNotes = await db.getAllNotes();
      setNotes(loadedNotes);
    };
    loadNotes();
  }, []);

  const handleSaveNote = async (note) => {
    const updatedNotes = await db.saveNote(note, activeNote?.id);
    setNotes(updatedNotes);
    setActiveNote(null);
  };

  const handleDeleteNote = async (id) => {
    const updatedNotes = await db.deleteNote(id);
    setNotes(updatedNotes);
    if (activeNote?.id === id) setActiveNote(null);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Navbar onSearch={setSearchTerm} />
      <div className="main-content">
        <NoteList
          notes={filteredNotes}
          onNoteSelect={setActiveNote}
          activeNote={activeNote}
          onDeleteNote={handleDeleteNote}
          onNewNote={() => setActiveNote({ title: '', content: '' })}
        />
        {activeNote && (
          <div className="note-editor">
            <input
              type="text"
              value={activeNote.title}
              onChange={(e) => setActiveNote({ ...activeNote, title: e.target.value })}
              placeholder="Note title"
            />
            <textarea
              value={activeNote.content}
              onChange={(e) => setActiveNote({ ...activeNote, content: e.target.value })}
              placeholder="Write your note here..."
            />
            <div className="editor-actions">
              <button onClick={() => handleSaveNote(activeNote)}>Save</button>
              <button onClick={() => setActiveNote(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;