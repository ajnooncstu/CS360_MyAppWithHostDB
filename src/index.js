const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost', // Change 'localhost' to your DB Server IP if needed
  user: 'your_user_name',
  password: 'your_password',
  database: 'my_database'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database!');
});

// Route to fetch all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Query failed:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    res.json(results);
  });
});

// Route to fetch a user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Query failed:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
