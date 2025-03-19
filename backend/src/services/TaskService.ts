import { TaskRepository } from '../repositories/TaskRepository';
import Task from '../models/Task';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findById(id);
  }

  async createTask(taskData: { title: string; description?: string }): Promise<Task> {
    return await this.taskRepository.create(taskData);
  }

  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const [affectedCount, affectedRows] = await this.taskRepository.update(id, taskData);
    return affectedCount > 0 ? affectedRows[0] : null;
  }

  async deleteTask(id: number): Promise<boolean> {
    const deletedCount = await this.taskRepository.delete(id);
    return deletedCount > 0;
  }
}