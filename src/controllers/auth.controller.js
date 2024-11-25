import logger from "../logs/logger.js";
import { User } from '../models/users.js';
import { comparar } from '../common/bycript.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!(await comparar(password, user.password))) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }
        const secret = process.env.JWT_SECRET;
        console.log(`esss: ${secret}`);
        const segundos = process.env.JWT_EXPIRES_SECONDS;
        const token = jwt.sign({ userId: user.id }, secret, {
            expiresIn: eval(segundos)
        })
        res.json({ token });
    } catch (error) {
        logger.error(`Error login: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}

export default { login };