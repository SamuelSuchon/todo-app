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
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Buy groceries', completed: false, pinned: false },
    { id: 2, title: 'Read a book', completed: false, pinned: false },
  ]);

  const [notes, setNotes] = useState<Note[]>([]);

  // Toggle pinning a task
  const handlePinTask = (taskToPin: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskToPin.id ? { ...task, pinned: !task.pinned } : task
    );
    setTasks(updatedTasks);
  };

  // Complete a task
  const completeTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Toggle pinning a note
  const handlePinNote = (noteToPin: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteToPin.id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
  };

  // Delete a note
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
                  deleteNote={handleDeleteNote}  // Proper comment removed
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <Tasks tasks={tasks} pinTask={handlePinTask} updateTasks={setTasks} />
              }
            />
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
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
