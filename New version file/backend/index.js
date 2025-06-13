const express = require('express');
const mysql = require('mysql');
// const mysql = require('mysql2');
const cors = require('cors');

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
