import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../App'; // Predpokladáme, že rozhranie Task je definované v súbore App.tsx

interface TasksProps {
  tasks: Task[];
  pinTask: (task: Task) => void;
  updateTasks: (updatedTasks: Task[]) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, pinTask, updateTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState<string>('');

  // Pridanie novej úlohy
  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTaskTitle,
        completed: false,
        pinned: false,
      };
      updateTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  // Uloženie upravenej úlohy
  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, title: editingTaskTitle } : task
    );
    updateTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  // Spracovanie stlačenia klávesy "Enter" na pridanie alebo uloženie úlohy
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (editingTaskId !== null) {
        saveEditedTask();
      } else {
        addTask();
      }
    }
  };

  // Označenie úlohy ako dokončenej
  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Hlavička stránky */}
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Úlohy</h2>
      </div>
      {/* Obsah stránky */}
      <div style={styles.contentContainer}>
        {/* Vstup pre pridanie novej úlohy */}
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress} // Pridanie úlohy po stlačení "Enter"
          placeholder="Zadajte novú úlohu"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>Pridať úlohu</button>

        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.listItem}>
              <div style={styles.taskContainer}>
                {/* Zaškrtávacie pole pre dokončenie úlohy */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  style={styles.checkbox}
                />

                {/* Preškrtnutie názvu úlohy, ak je dokončená */}
                {editingTaskId === task.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingTaskTitle}
                      onChange={(e) => setEditingTaskTitle(e.target.value)}
                      onKeyPress={handleKeyPress} // uloženie po stlačení "Enter"
                      placeholder="Upraviť názov úlohy"
                      style={styles.input}
                    />
                    <button onClick={saveEditedTask} style={styles.button}>Uložiť</button>
                  </div>
                ) : (
                  <span style={task.completed ? styles.completedTask : styles.taskTitle}>
                    {task.title}
                  </span>
                )}

                {/* Akčné ikony (pripnutie, úprava, vymazanie) */}
                <div style={styles.iconContainer}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditingTaskTitle(task.title);
                    }}
                    style={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => updateTasks(tasks.filter((t) => t.id !== task.id))}
                    style={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={() => pinTask(task)}
                    style={{
                      cursor: 'pointer',
                      color: task.pinned ? 'gold' : 'gray',
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

const styles = {
  // hlavný kontajner stránky
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: '100%',
    minHeight: '100vh',
  },
  // hlavička stránky
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a',
    padding: '20px 0',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 10,
  },
  // text hlavičky
  headerText: {
    margin: 0,
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  // hlavný obsah stránky
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start' as const,
    alignItems: 'center' as const,
    padding: '20px',
    backgroundColor: '#f8f9fa',
    width: '100%',
    minHeight: 'calc(100vh - 80px)',
    marginTop: '68px',
    paddingBottom: '80px', // Pridanie paddingu dole, aby sa zabránilo prekrývaniu s navigačnou lištou
  },
  // zoznam úloh
  list: {
    listStyleType: 'none' as const,
    padding: 0,
    margin: '20px 0',
    width: '100%',
    maxWidth: '600px',
  },
  // Štýly pre jednotlivú položku zoznamu úloh
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  // kontajner úlohy
  taskContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '400px',
  },
  // vstupné pole
  input: {
    padding: '10px',
    marginBottom: '10px',
    width: '300px',
  },
  // Štýly pre tlačidlo
  button: {
    padding: '5px 10px',
    marginBottom: '20px',
  },
  // Štýly pre ikony
  iconContainer: {
    display: 'flex',
    gap: '10px',
  },
  // Štýly pre ikony
  icon: {
    cursor: 'pointer',
  },
  // zaškrtávacie pole
  checkbox: {
    marginRight: '10px',
  },
  // dokončená úlohá (preškrtnutá)
  completedTask: {
    textDecoration: 'line-through',
    color: '#888',
  },
  // názov úlohy
  taskTitle: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
  },
};

export default Tasks;
