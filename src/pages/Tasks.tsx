import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../App'; // Assuming the Task interface is defined in App.tsx

interface TasksProps {
  tasks: Task[];
  pinTask: (task: Task) => void;
  updateTasks: (updatedTasks: Task[]) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, pinTask, updateTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState<string>('');

  // Add a new task
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

  // Save the edited task
  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, title: editingTaskTitle } : task
    );
    updateTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  // Handle "Enter" key press to add or save a task
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (editingTaskId !== null) {
        saveEditedTask();
      } else {
        addTask();
      }
    }
  };

  // Mark task as completed
  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Tasks</h2>
      </div>
      <div style={styles.contentContainer}>
        {/* Input field to add new task */}
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress} // Trigger adding task on "Enter" key press
          placeholder="Enter a new task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>Add Task</button>

        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.listItem}>
              <div style={styles.taskContainer}>
                {/* Checkbox for task completion */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  style={styles.checkbox}
                />

                {/* Task title with strikethrough if completed */}
                {editingTaskId === task.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingTaskTitle}
                      onChange={(e) => setEditingTaskTitle(e.target.value)}
                      onKeyPress={handleKeyPress} // Trigger save on "Enter" key press
                      placeholder="Edit Task Title"
                      style={styles.input}
                    />
                    <button onClick={saveEditedTask} style={styles.button}>Save</button>
                  </div>
                ) : (
                  <span style={task.completed ? styles.completedTask : styles.taskTitle}>
                    {task.title}
                  </span>
                )}

                {/* Action icons (pin, edit, delete) */}
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
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: '100%',
    minHeight: '100vh',
  },
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
  headerText: {
    margin: 0,
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
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
    paddingBottom: '80px', // Add padding to the bottom to avoid overlap with the navbar
  },
  list: {
    listStyleType: 'none' as const,
    padding: 0,
    margin: '20px 0',
    width: '100%',
    maxWidth: '600px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  taskContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '400px',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    width: '300px',
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
  checkbox: {
    marginRight: '10px',
  },
  completedTask: {
    textDecoration: 'line-through',
    color: '#888',
  },
  taskTitle: {
    fontSize: '16px',
    fontWeight: 'bold' as const,
  },
};

export default Tasks;
