import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';
import '../styles/TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete }) => {
  if (tasks.length === 0) {
    return <div className="empty-list">No tasks yet. Add a new one!</div>;
  }

  return (
    <div className="task-list">
      <h2>My Tasks</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;