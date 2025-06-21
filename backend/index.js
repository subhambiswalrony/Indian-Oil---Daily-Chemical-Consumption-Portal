const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Get user first name
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT first_name FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ firstName: results[0].first_name });
  });
});

// Signup route
app.post('/signup', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO users (first_name, last_name, email, phone, password, plain_password)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [firstName, lastName, email, phone, hashedPassword, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email already registered' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Signup successful',
      userId: result.insertId,
      firstName,
      email
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const green = '\x1b[32m';
  const reset = '\x1b[0m';

  // Log login request
  console.log(`Login hit: { email: ${green}'${email}'${reset}, password: ${green}'${password}'${reset} }`);

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    console.log('DB query results:');

    if (results.length > 0) {
      const user = results[0];
      const createdAt = new Date(user.created_at).toString();

      console.log(`  RowDataPacket {`);
      console.log(`    id: ${green}${user.id}${reset},`);
      console.log(`    first_name: ${green}'${user.first_name}'${reset},`);
      console.log(`    last_name: ${green}'${user.last_name}'${reset},`);
      console.log(`    email: ${green}'${user.email}'${reset},`);
      console.log(`    phone: ${green}'${user.phone}'${reset},`);
      console.log(`    password: ${green}'${user.password}'${reset},`);
      console.log(`    created_at: ${green}'${createdAt}'${reset},`);
      console.log(`    plain_password: ${green}'${password}'${reset}`);
      console.log(`  }`);
    } else {
      console.log('  No user found');
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found', status: 'unregistered' });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
});
// Submit new chemical form (with user_id)
app.post('/chemical_forms', (req, res) => {
  const data = req.body;
  if (!data.user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  const green = '\x1b[32m';
  const reset = '\x1b[0m';

  console.log('Received chemical form submission: {');
  const keys = Object.keys(data);
  keys.forEach((key, index) => {
    const value = data[key];
    const comma = index < keys.length - 1 ? ',' : '';
    console.log(`${key}: ${green}'${value}'${reset}${comma}`);
  });
  console.log('}');

  db.query('INSERT INTO chemical_form SET ?', data, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    console.log(`Chemical form inserted with ID: ${green}${results.insertId}${reset}`);
    res.json({ id: results.insertId, ...data });
  });
});


// Fetch all chemical form entries (all users — mostly for admin/debug)
app.get('/chemical_forms', (req, res) => {
  db.query('SELECT * FROM chemical_form', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get chemical form entries by userId
app.get('/chemical_forms/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM chemical_form WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get unique units for a user
app.get('/units/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT DISTINCT unit FROM chemical_form WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const units = results.map(r => r.unit);
    res.json({ units });
  });
});

app.get('/', (req, res) => {
  res.send('🎉 Backend is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});