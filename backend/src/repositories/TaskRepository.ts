import Task from '../models/Task';

export class TaskRepository {
  async findAll(): Promise<Task[]> {
    return await Task.findAll({ order: [['createdAt', 'DESC']] });
  }

  async findById(id: number): Promise<Task | null> {
    return await Task.findByPk(id);
  }

  async create(taskData: { title: string; description?: string }): Promise<Task> {
    return await Task.create({
      title: taskData.title,
      description: taskData.description,
    });
  }

  async update(id: number, taskData: Partial<Task>): Promise<[number, Task[]]> {
    const [affectedCount, affectedRows] = await Task.update(taskData, {
      where: { id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: number): Promise<number> {
    return await Task.destroy({ where: { id } });
  }
}