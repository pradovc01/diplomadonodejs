import { Router } from "express";
import taskController from '../controllers/tasks.controllers.js'
const router = Router();

router.route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);
router
    .route('/:id')
    .get(taskController.getTask)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);
export default router