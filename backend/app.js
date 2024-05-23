// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error connecting to the database', err));

module.exports = app;
