const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/todos', require('./routes/todoRoutes')); // Todo routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        console.error('❌ Server failed to start:', err);
    } else {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
    }
});

module.exports = app;