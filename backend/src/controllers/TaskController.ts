import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const task = await this.taskService.getTaskById(id);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task', error });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      if (!title) {
        res.status(400).json({ message: 'Title is required' });
        return;
      }
      const task = await this.taskService.createTask({ title, description });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const task = await this.taskService.updateTask(id, req.body);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.taskService.deleteTask(id);
      if (success) {
        res.status(200).json({ message: 'Task deleted successfully' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }
}