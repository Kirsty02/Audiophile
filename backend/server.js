const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'audiophile_db',
  password: 'Iona12345',
  port: 5432,
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'frontend/dist')));
app.use(express.json());

// API Endpoint to retrieve Headphones category
app.get('/headphones', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Product WHERE category = 'headphones'");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// The "catchall" handler: send back index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend/dist/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});