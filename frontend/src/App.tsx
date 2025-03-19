import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import { Task } from './types/Task';
import './styles/App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (taskData: { title: string; description: string }) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed } : task
      ));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <TaskForm onSubmit={handleCreateTask} />
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onDelete={handleDeleteTask} 
            onToggleComplete={handleToggleComplete} 
          />
        )}
      </main>
    </div>
  );
};

export default App;