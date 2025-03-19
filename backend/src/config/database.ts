import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todo_app', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;