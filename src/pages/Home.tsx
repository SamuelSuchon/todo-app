import React from 'react';
import { Task, Note } from '../App'; // Import Task and Note interfaces
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

interface HomeProps {
  pinnedTasks: Task[];
  pinnedNotes: Note[];
  unpinTask: (task: Task) => void;
  unpinNote: (note: Note) => void;
}

const Home: React.FC<HomeProps> = ({ pinnedTasks, pinnedNotes, unpinTask, unpinNote }) => {
  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Home</h2>
      </div>

      {/* Welcome Message */}
      <div style={styles.welcomeContainer}>
        <h2 style={styles.welcomeText}>Welcome to Your Personal Organizer</h2>
      </div>

      {/* Content */}
      <div style={styles.contentContainer}>
        {/* App Explanation */}
        <div style={styles.introContainer}>
          <h3 style={styles.introText}>
            Organize your life effortlessly by managing your tasks and notes. Pin your important tasks and notes to keep them at the top!
          </h3>
        </div>

        {/* Pinned Tasks Section */}
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Pinned Tasks</h2>
          {pinnedTasks.length === 0 ? (
            <p style={styles.emptyMessage}>No tasks pinned. Pin important tasks to keep them at the top!</p>
          ) : (
            <div style={styles.cardsContainer}>
              {pinnedTasks.map(task => (
                <div key={task.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{task.title}</h3>
                  <button style={styles.pinButton} onClick={() => unpinTask(task)}>
                    <FontAwesomeIcon icon={faThumbtack} /> Unpin
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pinned Notes Section */}
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Pinned Notes</h2>
          {pinnedNotes.length === 0 ? (
            <p style={styles.emptyMessage}>No notes pinned. Pin important notes to keep them at the top!</p>
          ) : (
            <div style={styles.cardsContainer}>
              {pinnedNotes.map(note => (
                <div key={note.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{note.title}</h3>
                  <p style={styles.cardContent}>{note.content}</p>
                  <button style={styles.pinButton} onClick={() => unpinNote(note)}>
                    <FontAwesomeIcon icon={faThumbtack} /> Unpin
                  </button>
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
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: '100%',
    minHeight: '100vh', // Ensure the page takes the full height
    backgroundColor: '#f8f9fa', // Lighter background for a cleaner look
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a', // Background color for the header
    padding: '20px 0',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 10, // Ensure the header stays on top
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
  headerText: {
    margin: 0,
    color: '#fff', // White text color for the header
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  welcomeContainer: {
    marginTop: '100px', // Offset to position below the header
    textAlign: 'center' as const,
  },
  welcomeText: {
    fontSize: '28px',
    fontWeight: 'bold' as const,
    color: '#01234a',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const, // Align content to the top
    padding: '20px 20px',
    backgroundColor: '#f8f9fa', // Matching background color for the content area
    width: '100%',
    marginTop: '10px', // To space content properly
  },
  introContainer: {
    maxWidth: '800px',
    marginBottom: '40px',
    textAlign: 'center' as const,
  },
  introText: {
    fontSize: '18px',
    color: '#333',
  },
  sectionContainer: {
    width: '100%',
    maxWidth: '800px',
    marginBottom: '40px',
    textAlign: 'center' as const,
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold' as const,
    color: '#01234a',
    marginBottom: '20px',
  },
  emptyMessage: {
    fontSize: '16px',
    color: '#777',
    textAlign: 'center' as const,
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    gap: '20px', // Add some spacing between cards
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px', // Limit card width to make it look better
    marginBottom: '20px',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
  cardTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#01234a',
  },
  cardContent: {
    fontSize: '14px',
    color: '#555',
  },
  pinButton: {
    backgroundColor: '#ff6f61',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Home;
