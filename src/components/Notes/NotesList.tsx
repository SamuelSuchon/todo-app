import React, { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [editingTitle, setEditingTitle] = useState<string>('');

  const addNote = () => {
    if (newNote.trim()) {
      const timestamp = new Date().toLocaleString();
      const newNoteObj: Note = {
        id: notes.length + 1,
        title: 'Untitled',
        content: newNote,
        timestamp,
      };
      setNotes([...notes, newNoteObj]);
      setNewNote('');
    }
  };

  const editNote = (id: number, title: string, content: string) => {
    setEditingNoteId(id);
    setEditingTitle(title);
    setEditingContent(content);
  };

  const saveEditedNote = () => {
    const updatedNotes = notes.map(note =>
      note.id === editingNoteId
        ? { ...note, title: editingTitle, content: editingContent }
        : note
    );
    setNotes(updatedNotes);
    setEditingNoteId(null);
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditedNote();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Notes</h2>

      <input
        type="text"
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
        placeholder="Write a new note..."
        onKeyPress={e => e.key === 'Enter' && addNote()}
        style={styles.newNoteInput}
      />
      <button onClick={addNote} style={styles.button}>Add Note</button>

      <ul style={styles.notesList}>
        {notes.map(note => (
          <li key={note.id} style={styles.noteBox}>
            {editingNoteId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                  placeholder="Title"
                  style={styles.noteTitle}
                />
                <textarea
                  value={editingContent}
                  onChange={e => setEditingContent(e.target.value)}
                  onKeyPress={handleEditKeyPress}
                  style={styles.noteContent}
                  placeholder="Content"
                />
              </div>
            ) : (
              <div onClick={() => editNote(note.id, note.title, note.content)}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <p style={styles.timestamp}>{note.timestamp}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  newNoteInput: {
    padding: '10px',
    width: '300px',
    marginBottom: '10px',
    border: '2px solid gray',
    borderRadius: '5px',
  },
  button: {
    padding: '5px 10px',
    marginBottom: '20px',
  },
  notesList: {
    listStyleType: 'none' as const,
    padding: 0,
  },
  noteBox: {
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '10px',
    width: '300px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  noteTitle: {
    fontSize: '16px',
    marginBottom: '5px',
    width: '100%',
  },
  noteContent: {
    width: '100%',
    height: '50px',
    marginBottom: '10px',
  },
  timestamp: {
    fontSize: '12px',
    color: 'gray',
  },
};

export default NotesList;
