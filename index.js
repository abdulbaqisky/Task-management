import express from 'express';
import path from 'path';


const __dirname = path.resolve();

const app = express();
const port = 3000;



app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    });