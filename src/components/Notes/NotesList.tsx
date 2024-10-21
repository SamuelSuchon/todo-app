import React, { useState } from 'react';

interface Note {
  id: number;
  content: string;
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: 'Remember to call the doctor' },
    { id: 2, content: 'Plan next week\'s meeting' },
  ]);

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
