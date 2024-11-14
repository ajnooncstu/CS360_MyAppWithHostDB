const express = require('express');
const mysql = require('mysql');
const faker = require('faker');

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'host.docker.internal', // Use this for Docker on Windows/Mac
  user: 'my_user',
  password: 'my_password',
  database: 'my_database'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database!');
  seedDatabase();
});

// Function to seed the database with random users
function seedDatabase() {
  for (let i = 0; i < 10; i++) {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const age = Math.floor(Math.random() * 50) + 18;

    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    db.query(query, [name, email, age], (err) => {
      if (err) {
        console.error('Error inserting data:', err);
      }
    });
  }
  console.log('Database seeded with random users.');
}

// Route to fetch all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
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
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Query failed:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    res.json(results[0] || { message: 'User not found' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
