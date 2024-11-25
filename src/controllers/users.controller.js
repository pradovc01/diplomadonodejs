import { User } from '../models/users.js';
import { Task } from '../models/tasks.js';
import logger from '../logs/logger.js';

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'],
            order: [['id', 'DESC']],

        });
        return res.json(users);
    } catch (error) {
        logger.error(`Error getUsers:${error}`);
        res.status(500).json({ message: 'Server error' })
    }
}

async function getUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['username', 'status']
        }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        logger.error(`Error getUser:${error}`);
        res.status(500).json({ message: 'Server error' })
    }

}

async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username: username, password: password });
        return res.json(user);
    } catch (error) {
        logger.error(`Error createUser:${error}`);
        res.status(500).json({ message: 'Server error' })
    }
}

async function updateUser(req, res) {
    const { id } = req.params.id;
    const { username, password } = req.body;
    try {
        if (!username || !password)
            return res
                .status(400)
                .json({ message: 'Username and password are required' });
        const user = await User.update(
            {
                username,
                password
            },
            {
                where: { id },
            }
        );
        return res.json(user);


    } catch (error) {
        logger.error(`Error updateUser:${error.message}`);
        res.status(500).json({ message: 'Server error' })
    }
}
async function activateInactivate(req, res) {
    const { id } = req.params
    const { status } = req.body;
    try {
        if (!status)
            return res
                .status(400)
                .json({ message: 'Status is required' });
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.status === status) {
            return res.status(400).json({ message: 'User is already in that status' });
        }
        user.status = status
        await user.save();
        res.json(user)
    } catch (err) {
        logger.error(`Error activateUser:${err.message}`);
        res.status(500).json({ message: 'Server error' })
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({ message: 'User id is required' });
        }
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        logger.error(`Error deleteUser:${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getTasks(req, res) {
    const { id } = req.params
    try {
        const user = await User.findOne({
            attributes: ["username"],
            include: [{
                model: Task,
                attributes: ['name', 'done'],

            }],
            where: { id },
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (err) {
        logger.error(`Error getTasks:${err.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}


export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    activateInactivate,
    deleteUser,
    getTasks,

};
