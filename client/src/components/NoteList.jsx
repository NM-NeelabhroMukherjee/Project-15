import React from 'react';
import Note from './Note';

function NoteList({ notes, onNoteSelect, activeNote, onDeleteNote, onNewNote }) {
  return (
    <div className="note-list">
      <button className="new-note-btn" onClick={onNewNote}>+ New Note</button>
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          isActive={activeNote?.id === note.id}
          onSelect={onNoteSelect}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
}

export default NoteList;