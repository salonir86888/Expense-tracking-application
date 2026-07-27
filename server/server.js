const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expense', require('./routes/expense'));
app.use('/api/budget', require('./routes/budget'));

// Test Route
app.get('/', (req, res) => {
    res.send('Aureum Expense Tracker Server is Running!');
});

// Server Start (Listens locally, exports module for Vercel Serverless)
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
}

module.exports = app;