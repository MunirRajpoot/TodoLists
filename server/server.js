const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

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
app.use('/api', require('./routes/authRoutes'));

// Start the server
const PORT = process.env.PORT || 5001
app.listen(PORT, (err) => {
    if (err) {
        console.error('❌ Server failed to start:', err);
    } else {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
    }
});

module.exports = app; // Export the app for testing purposes
