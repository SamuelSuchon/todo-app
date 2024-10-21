import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  pinned: boolean;
}

interface TaskListProps {
  tasks: Task[];
  pinTask: (task: Task) => void;
  updateTasks: (updatedTasks: Task[]) => void; // Function to update task list globally
}

const TaskList: React.FC<TaskListProps> = ({ tasks, pinTask, updateTasks }) => {
  const [newTask, setNewTask] = React.useState<string>('');
  const [editingTaskId, setEditingTaskId] = React.useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = React.useState<string>('');

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj: Task = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
        pinned: false,
      };
      updateTasks([...tasks, newTaskObj]);
      setNewTask(''); // Clear the input field after adding
    }
  };

  // Delete a task
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    updateTasks(updatedTasks);
  };

  // Edit a task
  const editTask = (id: number, title: string) => {
    setEditingTaskId(id);
    setEditingTaskTitle(title);
  };

  // Save the edited task
  const saveEditedTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTaskId ? { ...task, title: editingTaskTitle } : task
    );
    updateTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  // Handle enter key press when editing task
  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditedTask();
    }
  };

  // Handle enter key press to add task
  const handleAddKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Toggle task completion (checkbox)
  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <h2>To-Do List</h2>

      {/* Input field to add a new task */}
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        onKeyPress={handleAddKeyPress} // Add task on Enter key press
        style={styles.input}
      />
      <button onClick={addTask} style={styles.button}>Add Task</button>

      <ul style={styles.list}>
        {tasks.map(task => (
          <li key={task.id} style={styles.listItem}>
            <div style={styles.taskContainer}>
              {/* Checkbox for completing the task */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                style={styles.checkbox}
              />

              {/* Show strikethrough for completed tasks */}
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingTaskTitle}
                  onChange={e => setEditingTaskTitle(e.target.value)}
                  onKeyPress={handleEditKeyPress} // Save on Enter key press
                  style={styles.input}
                />
              ) : (
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
              )}

              {/* Pin icon */}
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => pinTask(task)} // Use the global pinTask function
                style={{
                  cursor: 'pointer',
                  color: task.pinned ? 'gold' : 'gray',
                  marginLeft: '10px',
                }}
              />

              {/* Edit and delete buttons */}
              <div style={styles.buttonContainer}>
                {editingTaskId === task.id ? (
                  <button onClick={saveEditedTask} style={styles.button}>Save</button>
                ) : (
                  <>
                    <button onClick={() => editTask(task.id, task.title)} style={styles.button}>Edit</button>
                    <button onClick={() => deleteTask(task.id)} style={styles.button}>Delete</button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '20px',
  },
  list: {
    listStyleType: 'none' as const,
    padding: 0,
    margin: '20px 0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  taskContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '400px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    padding: '5px',
    marginRight: '10px',
    width: '200px',
  },
  button: {
    padding: '5px 10px',
  },
  checkbox: {
    marginRight: '10px',
  },
};

export default TaskList;
