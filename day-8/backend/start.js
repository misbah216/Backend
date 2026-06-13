// Suppress MongoDB connection errors
process.on('unhandledRejection', (reason, promise) => {
    // Silently handle MongoDB connection errors
    if (reason && reason.code === 'ECONNREFUSED') {
        return;
    }
    console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
    if (error.code === 'ECONNREFUSED') {
        return;
    }
    console.error('Uncaught Exception:', error);
});

// Setup middleware and routes before loading server
require("dotenv").config();
const express = require('express');
const app = require('./src/app');
const connectToDb = require('./src/config/database');

// Add JSON middleware
app.use(express.json());

// Add routes
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!', status: 'ok' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', port: 3000 });
});

// Connect to database
connectToDb();

// Start listening
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
