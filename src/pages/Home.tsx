import React from 'react';
import { Task, Note } from '../App'; // Import Task and Note interfaces

interface HomeProps {
  pinnedTasks: Task[];
  pinnedNotes: Note[];
  unpinTask: (task: Task) => void;
  unpinNote: (note: Note) => void;
}

const Home: React.FC<HomeProps> = ({ pinnedTasks, pinnedNotes, unpinTask, unpinNote }) => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Home</h2>
      </div>
      <div style={styles.container}>
        <h2>Pinned Tasks</h2>
        <ul>
          {pinnedTasks.map(task => (
            <li key={task.id}>
              {task.title}
              <button onClick={() => unpinTask(task)}>Unpin</button>
            </li>
          ))}
        </ul>

        <h2>Pinned Notes</h2>
        <ul>
          {pinnedNotes.map(note => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => unpinNote(note)}>Unpin</button>
            </li>
          ))}
        </ul>
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
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a', // Background color for the header
    padding: '20px 0',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
  },
  headerText: {
    margin: 0,
    color: '#fff', // White text color
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '20px',
    marginTop: '80px', // Ensure content is below the fixed header
  },
};

export default Home;
