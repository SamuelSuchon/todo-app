import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import Navbar from './components/Navbar';
import Settings from './pages/Settings';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  pinned: boolean;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  timestamp: string;
}

const App: React.FC = () => {
  // Definícia počiatočných úloh
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Kúpiť potraviny', completed: false, pinned: false },
    { id: 2, title: 'Prečítať knihu', completed: false, pinned: false },
  ]);

  // Definícia počiatočných poznámok
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Welcome!',
      content: 'Začnite pridávaním vlastných poznámok a pripnite ich, aby zostali na vrchu.',
      pinned: false,
      timestamp: new Date().toLocaleString(),
    },
  ]);

  // Funkcia na pripnutie alebo odopnutie úlohy
  const handlePinTask = (taskToPin: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskToPin.id ? { ...task, pinned: !task.pinned } : task
    );
    setTasks(updatedTasks);
  };

  // Funkcia na dokončenie úlohy
  const completeTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Funkcia na vymazanie úlohy
  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Funkcia na pripnutie alebo odopnutie poznámky
  const handlePinNote = (noteToPin: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteToPin.id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
  };

  // Funkcia na vymazanie poznámky
  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* Domovská stránka */}
            <Route
              path="/"
              element={
                <Home
                  pinnedTasks={tasks.filter((task) => task.pinned)}
                  pinnedNotes={notes.filter((note) => note.pinned)}
                  unpinTask={handlePinTask}
                  unpinNote={handlePinNote}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                  deleteNote={handleDeleteNote}  // Vymazanie poznámky
                />
              }
            />
            {/* Stránka pre úlohy */}
            <Route
              path="/tasks"
              element={
                <Tasks tasks={tasks} pinTask={handlePinTask} updateTasks={setTasks} />
              }
            />
            {/* Stránka pre poznámky */}
            <Route
              path="/notes"
              element={
                <Notes
                  notes={notes}
                  pinNote={handlePinNote}
                  updateNotes={setNotes}
                  deleteNote={handleDeleteNote}
                />
              }
            />
            {/* Stránka pre nastavenia */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
