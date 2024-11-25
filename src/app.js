import express from 'express';
import morgan from 'morgan';
//Routes
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import { authenticateToken } from './middlewares/authenticate.middleware.js';

const app = express();

//Middleware

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/login', authRoutes)
app.use('/api/users', usersRoutes);
app.use('/api/tasks', authenticateToken, tasksRoutes);

export default app;