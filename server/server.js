import express from 'express';
import cors from 'cors'
import 'dotenv/config.js';
import db from './config/db.js'
import AuthRoutes from './routes/auth.js'
import fileRoutes from './routes/files.js'
const app = express();

const port = 5000;
app.use(cors());

const connectToMongoDB = (req, res, next) => {
    req.db = db;
    console.log('using the db middleware', db.host);
    next();
}
app.use(express.json());
app.use(connectToMongoDB);

app.use('/api/upload', fileRoutes);

app.use('/api/auth', AuthRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

