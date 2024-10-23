import React, { useState, CSSProperties} from 'react';
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

  // Funkcia na pridanie novej poznámky
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

  // Funkcia na uloženie upravenej poznámky
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
      {/* Hlavička stránky */}
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Poznámky</h2>
      </div>

      {/* Obsah stránky */}
      <div style={styles.contentContainer}>
        {/* Vstupy pre pridanie novej poznámky */}
        <input
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder="Názov poznámky"
          style={styles.input}
        />
        <textarea
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Obsah poznámky"
          style={styles.textarea}
        />
        <button onClick={addNote} style={styles.button}>Pridať poznámku</button>

        {/* Zoznam poznámok */}
        <ul style={styles.list}>
          {notes.map((note) => (
            <li key={note.id} style={styles.listItem}>
              <div style={styles.noteContainer}>
                {editingNoteId === note.id ? (
                  <div>
                    {/* Editovanie poznámky */}
                    <input
                      type="text"
                      value={editingNoteTitle}
                      onChange={(e) => setEditingNoteTitle(e.target.value)}
                      placeholder="Upraviť názov"
                      style={styles.input}
                    />
                    <textarea
                      value={editingNoteContent}
                      onChange={(e) => setEditingNoteContent(e.target.value)}
                      placeholder="Upraviť obsah"
                      style={styles.textarea}
                    />
                    <button onClick={saveEditedNote} style={styles.button}>Uložiť</button>
                  </div>
                ) : (
                  <div>
                    {/* Zobrazenie názvu a obsahu poznámky */}
                    <h3>{note.title}</h3>
                    <p style={styles.noteContent}>{note.content}</p>
                    <p style={styles.timestamp}>Naposledy upravené: {note.timestamp}</p>
                  </div>
                )}

                {/* Ikony pre akcie s poznámkou */}
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
  // Štýly pre hlavný kontajner stránky
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
  },
  // Štýly pre hlavičku stránky
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
  // Štýly pre text hlavičky
  headerText: {
    margin: 0,
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  // Štýly pre hlavný obsah stránky
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    paddingTop: '80px',
    backgroundColor: '#f8f9fa',
    width: '100%',
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
    paddingBottom: '80px',
  },
  // Štýly pre zoznam poznámok
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: '20px 0',
  },
  // Štýly pre jednotlivú položku zoznamu poznámok
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  // Štýly pre kontajner poznámky
  noteContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '400px',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },
  // Štýly pre vstupné pole
  input: {
    padding: '10px',
    marginBottom: '10px',
    width: '300px',
  },
  // Štýly pre textové pole
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    width: '300px',
    height: '100px',
  },
  // Štýly pre tlačidlo
  button: {
    padding: '5px 10px',
    marginBottom: '20px',
  },
  // Štýly pre kontajner s ikonami
  iconContainer: {
    display: 'flex',
    gap: '10px',
  },
  // Štýly pre ikony
  icon: {
    cursor: 'pointer',
  },
  // Štýly pre obsah poznámky
  noteContent: {
    wordBreak: 'break-word',
    maxWidth: '400px',
  },
  // Štýly pre časovú pečiatku poznámky
  timestamp: {
    fontSize: '12px',
    color: 'gray',
  },
};

export default Notes;
