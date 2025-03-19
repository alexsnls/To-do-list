import React, { useState } from 'react';
import '../styles/TaskForm.css';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="submit-button">Add Task</button>
    </form>
  );
};

export default TaskForm;