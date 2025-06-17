const express = require('express');
const mysql = require('mysql');
// const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // SQL username
  password: 'Rony@0911',    // SQL password
  database: 'iocl_chemical_form'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Route: Signup - Register new user

app.post('/signup', (req, res) => {
  console.log('Signup request received:', req.body); // ✅ place inside the function

  const { firstName, lastName, email, phone, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (first_name, last_name, email, phone, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [firstName, lastName, email, phone, hashedPassword], (err, result) => {
    if (err) {
      console.error('MySQL error during signup:', err); // 👈 log full error
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email already registered' });
      }
      return res.status(500).json({ error: 'Database error', details: err.message });
    }


    res.status(201).json({ message: 'Signup successful', userId: result.insertId });
  });
});

// Route: Login - Validate user credentials
app.post('/login', (req, res) => {
  console.log("Login hit:", req.body); // ✅ add this
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('DB error:', err); // ✅ print full error
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    console.log('DB query results:', results); // ✅ see what you get

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found', status: 'unregistered' });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
});

// Example endpoint to get all chemical_form entries
app.get('/chemical_forms', (req, res) => {
  db.query('SELECT * FROM chemical_form', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Example endpoint to insert a new chemical_form entry
app.post('/chemical_forms', (req, res) => {
  const data = req.body;
  db.query('INSERT INTO chemical_form SET ?', data, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: results.insertId, ...data });
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
