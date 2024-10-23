import React, { useState, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export interface Note {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  timestamp: string;
}

interface NotesProps {
  notes: Note[];
  pinNote: (note: Note) => void;
  updateNotes: (updatedNotes: Note[]) => void;
  deleteNote: (noteId: number) => void;
}

const Notes: React.FC<NotesProps> = ({ notes, pinNote, updateNotes, deleteNote }) => {
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingNoteTitle, setEditingNoteTitle] = useState<string>('');
  const [editingNoteContent, setEditingNoteContent] = useState<string>('');

  const addNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote: Note = {
        id: notes.length + 1,
        title: newNoteTitle,
        content: newNoteContent,
        pinned: false,
        timestamp: new Date().toLocaleString(),
      };
      updateNotes([...notes, newNote]);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  const saveEditedNote = () => {
    const updatedNotes = notes.map((note) =>
      note.id === editingNoteId
        ? { ...note, title: editingNoteTitle, content: editingNoteContent, timestamp: new Date().toLocaleString() }
        : note
    );
    updateNotes(updatedNotes);
    setEditingNoteId(null);
    setEditingNoteTitle('');
    setEditingNoteContent('');
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Notes</h2>
      </div>
      <div style={styles.contentContainer}>
        <input
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder="Note Title"
          style={styles.input}
        />
        <textarea
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Note Content"
          style={styles.textarea}
        />
        <button onClick={addNote} style={styles.button}>Add Note</button>

        <ul style={styles.list}>
          {notes.map((note) => (
            <li key={note.id} style={styles.listItem}>
              <div style={styles.noteContainer}>
                {editingNoteId === note.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingNoteTitle}
                      onChange={(e) => setEditingNoteTitle(e.target.value)}
                      placeholder="Edit Title"
                      style={styles.input}
                    />
                    <textarea
                      value={editingNoteContent}
                      onChange={(e) => setEditingNoteContent(e.target.value)}
                      placeholder="Edit Content"
                      style={styles.textarea}
                    />
                    <button onClick={saveEditedNote} style={styles.button}>Save</button>
                  </div>
                ) : (
                  <div>
                    <h3>{note.title}</h3>
                    <p style={styles.noteContent}>{note.content}</p>
                    <p style={styles.timestamp}>Last edited: {note.timestamp}</p>
                  </div>
                )}

                <div style={styles.iconContainer}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteNote(note.id)}
                    style={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => {
                      setEditingNoteId(note.id);
                      setEditingNoteTitle(note.title);
                      setEditingNoteContent(note.content);
                    }}
                    style={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={() => pinNote(note)}
                    style={{
                      cursor: 'pointer',
                      color: note.pinned ? 'gold' : 'gray',
                      marginLeft: '10px',
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a',
    padding: '20px 0',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  headerText: {
    margin: 0,
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    paddingTop: '80px', // Adjusted paddingTop
    backgroundColor: '#f8f9fa',
    width: '100%',
    height: 'calc(100vh - 80px)', // Set fixed height
    overflowY: 'auto', // Added overflowY
    paddingBottom: '80px', // Add padding to the bottom to avoid overlap with the navbar
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: '20px 0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  noteContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '400px',
    maxWidth: '100%', // Ensure container doesn't exceed screen width
    wordWrap: 'break-word',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    width: '300px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    width: '300px',
    height: '100px',
  },
  button: {
    padding: '5px 10px',
    marginBottom: '20px',
  },
  iconContainer: {
    display: 'flex',
    gap: '10px',
  },
  icon: {
    cursor: 'pointer',
  },
  noteContent: {
    wordBreak: 'break-word',
    maxWidth: '400px',
  },
  timestamp: {
    fontSize: '12px',
    color: 'gray',
  },
};

export default Notes;
