const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create Express Server

const app = express();

// Database

dbConnection();

// CORS

app.use(cors());

// Public

app.use(express.static('public'));

// Body Parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Listen requests

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});