import React from 'react';

function Note({ note, isActive, onSelect, onDelete }) {
  return (
    <div 
      className={`note ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(note)}
    >
      <h3>{note.title || 'Untitled Note'}</h3>
      <p>{note.content.substring(0, 50)}{note.content.length > 50 ? '...' : ''}</p>
      <div className="note-actions">
        <button onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}>Delete</button>
      </div>
    </div>
  );
}

export default Note;