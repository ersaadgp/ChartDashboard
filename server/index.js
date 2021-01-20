const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json();
  }
  next();
});

// API endpoint belongs here
app.use('/data', require('./routes/data.routes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

module.exports = app;
