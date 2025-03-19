import { Task } from '../types/Task';

const API_URL = 'http://localhost:5000/api/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (task: { title: string; description?: string }): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  const text = await response.text();
  console.log('Response:', text); 

  if (!response.ok) {
    throw new Error(`Failed to create task: ${text}`);
  }

  return JSON.parse(text);
};


export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};