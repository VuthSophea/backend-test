require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Use Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
};

startServer();