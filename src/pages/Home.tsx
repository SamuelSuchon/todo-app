import React from 'react';
import { Task, Note } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

interface HomeProps {
  pinnedTasks: Task[];
  pinnedNotes: Note[];
  unpinTask: (task: Task) => void;
  completeTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  unpinNote: (note: Note) => void;
  deleteNote: (noteId: number) => void;
}

const Home: React.FC<HomeProps> = ({
  pinnedTasks,
  pinnedNotes,
  unpinTask,
  completeTask,
  deleteTask,
  unpinNote,
  deleteNote
}) => {
  return (
    <div style={styles.pageContainer}>
      {/* Hlavička */}
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Domov</h2>
      </div>

      {/* Vitajúcia správa */}
      <div style={styles.welcomeContainer}>
        <h2 style={styles.welcomeText}>Vitajte vo Vašom Osobnom Organizéri</h2>
      </div>

      {/* Obsah */}
      <div style={styles.contentContainer}>
        {/* Vysvetlenie aplikácie */}
        <div style={styles.introContainer}>
          <h3 style={styles.introText}>
            Organizujte svoj život jednoducho správou svojich úloh a poznámok. Pripnite si dôležité úlohy a poznámky, aby ste ich mali na domovskej stránke!
          </h3>
        </div>

        {/* Sekcia pripnutých úloh */}
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Pripnuté úlohy</h2>
          {pinnedTasks.length === 0 ? (
            <p style={styles.emptyMessage}>Žiadne úlohy nie sú pripnuté. Pripnite dôležité úlohy, aby ste ich mali na domovskej stránke!</p>
          ) : (
            <div style={styles.cardsContainer}>
              {pinnedTasks.map(task => (
                <div
                  key={task.id}
                  style={styles.card}
                >
                  {/* Názov úlohy, preškrtnutie */}
                  <h3
                    style={{
                      ...styles.cardTitle,
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  >
                    {task.title}
                  </h3>
                  {/* Tlačidlá pre akcie s úlohou */}
                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.pinButton}
                      onClick={() => completeTask(task.id)}
                    >
                      <FontAwesomeIcon icon={faCheck} /> Dokončiť
                    </button>
                    <button
                      style={styles.pinButton}
                      onClick={() => unpinTask(task)}
                    >
                      <FontAwesomeIcon icon={faThumbtack} /> Odopnúť
                    </button>
                    <button
                      style={styles.pinButton}
                      onClick={() => deleteTask(task.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Vymazať
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sekcia pripnutých poznámok */}
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Pripnuté poznámky</h2>
          {pinnedNotes.length === 0 ? (
            <p style={styles.emptyMessage}>Žiadne poznámky nie sú pripnuté. Pripnite dôležité poznámky, aby ste ich mali na domovskej stránke!</p>
          ) : (
            <div style={styles.cardsContainer}>
              {pinnedNotes.map(note => (
                <div key={note.id} style={styles.card}>
                  {/* Názov poznámky a obsah */}
                  <h3 style={styles.cardTitle}>{note.title}</h3>
                  <p style={styles.cardContent}>{note.content}</p>
                  <p style={styles.timestamp}>Pripnuté o: {note.timestamp}</p>
                  {/* Tlačidlá pre akcie s poznámkou */}
                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.pinButton}
                      onClick={() => unpinNote(note)}
                    >
                      <FontAwesomeIcon icon={faThumbtack} /> Odopnúť
                    </button>
                    <button
                      style={styles.pinButton}
                      onClick={() => deleteNote(note.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Vymazať
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  // hlavný kontajner stránky
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  // Štýly pre hlavičku
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a',
    padding: '20px 0',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 10,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
  // text hlavičky
  headerText: {
    margin: 0,
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },

  welcomeContainer: {
    marginTop: '100px',
    textAlign: 'center' as const,
  },

  welcomeText: {
    fontSize: '28px',
    fontWeight: 'bold' as const,
    color: '#01234a',
  },
  // hlavný kontajner obsahu
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    padding: '20px',
    backgroundColor: '#f8f9fa',
    width: '100%',
  },
  // kontajner s vysvetlením aplikácie
  introContainer: {
    maxWidth: '800px',
    marginBottom: '40px',
    textAlign: 'center' as const,
  },
  // vysvetľovací text
  introText: {
    fontSize: '18px',
    color: '#333',
  },
  // Štýly pre sekcie (pripnuté úlohy a poznámky)
  sectionContainer: {
    width: '100%',
    maxWidth: '800px',
    marginBottom: '40px',
    textAlign: 'center' as const,
  },
  // názvy sekcií
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold' as const,
    color: '#01234a',
    marginBottom: '20px',
  },
  // prázdne správy, keď nie sú pripnuté úlohy alebo poznámky
  emptyMessage: {
    fontSize: '16px',
    color: '#777',
    textAlign: 'center' as const,
  },
  // kontajner s kartami (zobrazenie úloh a poznámok)
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    gap: '20px',
  },
  // jednotlivé karty
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '20px',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    textAlign: 'center' as const,
    wordWrap: 'break-word' as const,  // Zabezpečiť zalomenie textu v karte
  },
  // názov karty
  cardTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#01234a',
  },
  // obsah karty
  cardContent: {
    fontSize: '14px',
    color: '#555',
    wordBreak: 'break-word' as const,  // Oprava pretekania dlhých slov
    maxWidth: '100%',  // Zabezpečiť, aby nepresahovalo šírku karty
  },
  // časovú pečiatku pripnutých poznámok
  timestamp: {
    fontSize: '12px',
    color: '#777',
  },
  // tlačidlá (pripnutie, dokončenie, vymazanie)
  pinButton: {
    backgroundColor: '#ff6f61',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '100px',
    textAlign: 'center' as 'center',
  },
  // kontajner s tlačidlami
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    marginTop: '10px',
  },
};

export default Home;
