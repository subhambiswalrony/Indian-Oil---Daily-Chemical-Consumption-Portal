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

// Add the new route here
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT first_name FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ firstName: results[0].first_name });
  });
});

// Route: Signup - Register new user
app.post('/signup', (req, res) => {
  console.log('Signup request received:', req.body);

  const { firstName, lastName, email, phone, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (first_name, last_name, email, phone, password, plain_password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [firstName, lastName, email, phone, hashedPassword, password], (err, result) => {
    if (err) {
      console.error('MySQL error during signup:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email already registered' });
      }
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    res.status(201).json({
      message: 'Signup successful',
      userId: result.insertId,
      firstName: firstName,
      email: email
    });
  });
});

// Route: Login - Validate user credentials
// Route: Login - Validate user credentials
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Log the login request
  console.log(`Login hit: { email: '${email}', password: '${password}' }`);

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    console.log(`DB query results:`);
    if (results.length > 0) {
      results.forEach((result) => {
        // Format and colorize the output after ":" in green
        console.log(`  RowDataPacket {`);
        console.log(`    id: \x1b[32m${result.id}\x1b[0m,`);
        console.log(`    first_name: \x1b[32m'${result.first_name}'\x1b[0m,`);
        console.log(`    last_name: \x1b[32m'${result.last_name}'\x1b[0m,`);
        console.log(`    email: \x1b[32m'${result.email}'\x1b[0m,`);
        console.log(`    phone: \x1b[32m'${result.phone}'\x1b[0m,`);
        console.log(`    password: \x1b[32m'${result.password}'\x1b[0m,`);
        console.log(`    created_at: \x1b[32m${result.created_at}\x1b[0m,`);
        console.log(`    plain_password: \x1b[32m'${password}'\x1b[0m`);
        console.log(`  }`);
      });
    } else {
      console.log("  No user found");
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

// Example endpoint to get all chemical_form entries
app.get('/chemical_forms', (req, res) => {
  console.log("Form Submitted :", req.body);
  db.query('SELECT * FROM chemical_form', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Example endpoint to insert a new chemical_form entry
app.post('/chemical_forms', (req, res) => {
  const data = req.body;

  console.log('Received chemical form submission:', data);

  db.query('INSERT INTO chemical_form SET ?', data, (err, results) => {
    if (err) {
      console.error('MySQL error while inserting chemical form:', err);
      return res.status(500).json({ error: err });
    }

    console.log('Chemical form inserted at row no. :', results.insertId);

    res.json({ id: results.insertId, ...data });
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
