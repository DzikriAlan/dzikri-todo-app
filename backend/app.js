// app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/api', authRoutes);
app.use(errorHandler);

module.exports = app;
