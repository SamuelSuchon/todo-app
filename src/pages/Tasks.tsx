import React from 'react';
import TaskList from '../components/Tasks/TaskList'; // Adjust the path
import { Task } from '../App'; // Adjust if Task interface is defined in App.tsx

interface TasksProps {
  tasks: Task[];
  pinTask: (task: Task) => void;
  updateTasks: (updatedTasks: Task[]) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, pinTask, updateTasks }) => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Tasks</h2>
      </div>
      <TaskList tasks={tasks} pinTask={pinTask} updateTasks={updateTasks} />
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
    color: '#fff', // Text color (white)
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
};

export default Tasks;
