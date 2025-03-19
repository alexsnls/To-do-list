import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import taskRoutes from './routes/taskRoutes';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/tasks', taskRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });

export default app;