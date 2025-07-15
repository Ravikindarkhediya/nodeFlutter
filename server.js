const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

const PORT = process.env.PORT || 3500;

connectDB();

app.use('/', authRoutes);

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
