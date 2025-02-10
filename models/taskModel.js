import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    deadline: {
        type: Date,
        required: true,
    },
    status: { 
        type: String, enum: ['todo', 'in-progress', 'done'],
        default: 'todo' },
    priority: {
        type: String, enum: ['low', 'medium', 'high'],
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

const Task = mongoose.model("Task", taskSchema);

export default Task;

