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
const supabase = require('./supabase');

app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password: hashedPassword,
        plain_password: password,
      },
    ])
    .select('id, first_name, email')
    .single();

  if (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: 'Signup successful',
    userId: data.id,
    firstName: data.first_name,
    email: data.email,
  });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const supabase = require('./supabase');

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .limit(1);

  if (error || !users || users.length === 0) {
    return res.status(401).json({ error: 'User not found', status: 'unregistered' });
  }

  const user = users[0];
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  res.status(200).json({ message: 'Login successful', userId: user.id });
});

// Submit new chemical form (with user_id)
app.post('/chemical_forms', async (req, res) => {
  const data = req.body;
  if (!data.user_id) return res.status(400).json({ error: 'user_id is required' });

  const { data: insertData, error } = await supabase
    .from('chemical_form')
    .insert([data])
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json(insertData);
});


// Fetch all chemical form entries (all users — mostly for admin/debug)
app.get('/chemical_forms', (req, res) => {
  db.query('SELECT * FROM chemical_form', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get chemical form entries by userId
app.get('/chemical_forms/:userId', async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('chemical_form')
    .select('*')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
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