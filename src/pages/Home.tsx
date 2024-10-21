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
    <div>
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
  );
};

export default Home;
