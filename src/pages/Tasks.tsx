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
    <div>
      <h2>Tasks</h2>
      <TaskList tasks={tasks} pinTask={pinTask} updateTasks={updateTasks} />
    </div>
  );
};

export default Tasks;
