import express from 'express';
import path from 'path';
import connectDB from './db.js';



const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    });