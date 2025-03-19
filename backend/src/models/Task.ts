import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'completed' | 'createdAt' | 'updatedAt'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public completed!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
  }
);

export default Task;
