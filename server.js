import express from 'express';
import path from 'path';
import connectDB from './db.js';
import Task from './models/taskModel.js';

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

app.post('/', async (req, res) => {
    const { title, description, deadline, status, priority, completed, created } = req.body;
    
    try {
        console.log(req.body);
        const newTask = await Task.create(req.body);
        console.log(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to add task" });
    } 
    }                   
);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    });
    