import React from 'react';
import { Task } from '../types/Task';
import '../styles/TaskItem.css';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete }) => {
  const handleToggle = () => {
    onToggleComplete(task.id, !task.completed);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
        />
        <div className="task-text">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <small>{new Date(task.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
      <button className="delete-button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
};

export default TaskItem;