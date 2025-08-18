const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

const app = express();

// Increase payload size limit (e.g. 10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

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
        console.log(` Server is running on http://localhost:${PORT}`);
    }
});

module.exports = app;