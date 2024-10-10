const express = require('express');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();  // For environment variables

const app = express();

app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // For parsing JSON
app.use('/api/auth', authRoutes);  // Define routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

