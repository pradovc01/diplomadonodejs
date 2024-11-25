import { Task } from '../models/tasks.js';
import logger from "../logs/logger.js";

async function getTasks(req, res,) {
    const { userId } = req.user;
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where: {
                userId: userId
            },
        });
        console.log(`es task: ${tasks}`);
        res.json(tasks);
    } catch (err) {
        logger.error(`Error getTasks: ${err.message}`);
        res.status(500).json({ message: 'Server error' });
    }

}

async function createTask(req, res) {
    const { userId } = req.user;
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const task = await Task.create({
            name,
            userId
        });
        console.log(`Task created ${task}`);
        res.json(task);
    } catch (err) {
        logger.error(`Error createTask: ${err.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
        const task = await Task.findOne({
            attributes: ['name', 'done'],
            where: {
                id,
                userId
            }
        });
        console.log(`es task: ${task}`);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);

    } catch (error) {
        logger.error(`Error getTask: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateTask(req, res) {
    const { userId } = req.user;
    const id = req.params.id;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    try {
        const task = await task.update({ name }, { where: { id, userId } });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task[0] == 0) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        logger.error(`Error updateTask: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

async function taskDone(req, res) {
    const { userId } = req.user;
    const id = req.params.id;
    try {
        const task = await Task.update({ done }, { where: { id, userId } });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task[0] == 0) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        logger.error(`Error taskDone: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteTask(req, res) {
    const { userId } = req.user;
    const id = req.params.id;
    try {
        const task = await Task.destroy({ where: { id, userId } });
        if (task == 0) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        logger.error(`Error deleteTask: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask,
}