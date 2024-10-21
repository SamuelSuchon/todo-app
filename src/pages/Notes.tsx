// src/pages/Notes.tsx
import React from 'react';
import NotesList from '../components/Notes/NotesList';

const Notes: React.FC = () => {
  return (
    <div>
      <h2>Notes</h2>
      <NotesList />
    </div>
  );
};

export default Notes;
