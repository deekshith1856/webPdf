import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import db from './config/db.js';
import AuthRoutes from './routes/auth.js';
import fileRoutes from './routes/files.js';

const app = express();
const port = 5000;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Middleware to connect to the MongoDB database
const connectToMongoDB = (req, res, next) => {
    req.db = db;
    console.log('Using the DB middleware', db.host);
    next();
};

// Parse JSON request bodies
app.use(express.json());

// Use the connectToMongoDB middleware
app.use(connectToMongoDB);

// Routes for file uploads
app.use('/api/upload', fileRoutes);

// Routes for authentication
app.use('/api/auth', AuthRoutes);

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
