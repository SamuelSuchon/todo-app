// src/pages/Tasks.tsx
import React from 'react';
import TaskList from '../components/Tasks/TaskList';

const Tasks: React.FC = () => {
  return (
    <div>
      <h2>Tasks</h2>
      <TaskList />
    </div>
  );
};

export default Tasks;
