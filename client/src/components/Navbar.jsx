import React from 'react';

function Navbar({ onSearch }) {
  return (
    <nav className="navbar">
      <h1>Privacy Notes</h1>
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </nav>
  );
}

export default Navbar;