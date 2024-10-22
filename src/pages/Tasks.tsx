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
      <div style={styles.contentContainer}>
        <TaskList tasks={tasks} pinTask={pinTask} updateTasks={updateTasks} />
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
    minHeight: '100vh', // Make sure the page takes full height
    backgroundColor: '#cdcccd', // Use the updated background color for the entire page
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a', // Header background color
    padding: '20px 0',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 10, // Ensure header stays on top
  },
  headerText: {
    margin: 0,
    color: '#fff', // White text for the header
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start' as const, // Align content to the top
    alignItems: 'center' as const,
    padding: '20px',
    backgroundColor: '#efeeef', // Use the correct gray background color
    width: '100%',
    minHeight: 'calc(100vh - 80px)', // Ensure full height minus the header
    marginTop: '50px', // To prevent overlap with the fixed header
  },
};

export default Tasks;
