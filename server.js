import express from 'express';
import path from 'path';
import connectDB from './db.js';
import Task from './models/taskModel.js';

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
console.log('Hello World');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            status: req.body.status,
            priority: req.body.priority,
            completed: false,
            created: new Date().toISOString()
        });
        console.log(newTask);
        await newTask.save();
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
    