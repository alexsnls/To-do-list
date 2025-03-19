import express from 'express';
import { TaskController } from '../controllers/TaskController';

const router = express.Router();
const taskController = new TaskController();

router.get('/', (req, res) => taskController.getAllTasks(req, res));
router.get('/:id', (req, res) => taskController.getTaskById(req, res));
router.post('/', (req, res) => taskController.createTask(req, res));
router.put('/:id', (req, res) => taskController.updateTask(req, res));
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

export default router;