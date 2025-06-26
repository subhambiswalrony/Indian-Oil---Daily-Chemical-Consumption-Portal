const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();
const supabase = require('./supabase');
const { v4: uuidv4 } = require('uuid');
const sendOtpEmail = require('./mailer');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// ✅ Serve static React build files
const frontendPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));

app.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const { data: user, error } = await supabase.from('users').select('email').eq('email', email).single();
  if (error || !user) return res.status(404).json({ message: 'Email not registered' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const { error: insertError } = await supabase.from('otp_tokens').insert([{ email, otp, expires_at: expiresAt }]);
  if (insertError) return res.status(500).json({ message: 'Failed to store OTP' });

  try {
    await sendOtpEmail(email, otp);
    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Email sending error:', err.message);
    return res.status(500).json({ message: 'Failed to send OTP email' });
  }
});

app.post('/resend-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const { data: user, error } = await supabase.from('users').select('email').eq('email', email).single();
  if (error || !user) return res.status(404).json({ message: 'Email not registered' });

  const { data: existingOtp } = await supabase.from('otp_tokens').select('*').eq('email', email).order('created_at', { ascending: false }).limit(1).maybeSingle();
  const now = new Date();

  if (existingOtp && new Date(existingOtp.expires_at) > now && now - new Date(existingOtp.created_at) < 60000) {
    return res.status(429).json({ message: 'Please wait before resending OTP' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const token = uuidv4();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

  const { error: insertError } = await supabase.from('otp_tokens').insert([{ email, otp, token, expires_at: expiresAt }]);
  if (insertError) return res.status(500).json({ message: 'Failed to generate new OTP' });

  try {
    await sendOtpEmail(email, otp);
    res.json({ message: 'New OTP sent to your email', token });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });

  const { data: tokenData, error } = await supabase.from('otp_tokens').select('*').eq('email', email).order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (error || !tokenData) return res.status(404).json({ message: 'OTP not found' });

  const now = Date.now();
  const otpExpiry = new Date(tokenData.expires_at).getTime();
  if (tokenData.otp !== otp) return res.status(400).json({ message: 'Incorrect OTP' });
  if (otpExpiry < now) return res.status(400).json({ message: 'OTP expired' });

  return res.status(200).json({ message: 'OTP verified' });
});

app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ message: 'Email and new password required' });

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  const { error } = await supabase.from('users').update({ password: hashedPassword, plain_password: newPassword }).eq('email', email);
  if (error) return res.status(500).json({ message: 'Password update failed' });

  res.json({ message: 'Password updated successfully' });
});

app.get('/user/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { data, error } = await supabase.from('users').select('first_name').eq('id', userId).single();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'User not found' });

  res.json({ firstName: data.first_name });
});

app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const { data: existingUsers } = await supabase.from('users').select('id').eq('email', email).maybeSingle();
  if (existingUsers) return res.status(400).json({ error: 'Email already registered' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const { data, error } = await supabase.from('users').insert([{
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    password: hashedPassword,
    plain_password: password,
  }]).select('id, first_name, email').single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: 'Signup successful', userId: data.id, firstName: data.first_name, email: data.email });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data: users, error } = await supabase.from('users').select('*').eq('email', email).limit(1);
  if (error || !users || users.length === 0) return res.status(401).json({ error: 'User not found', status: 'unregistered' });

  const user = users[0];
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

  res.status(200).json({ message: 'Login successful', userId: user.id });
});

app.post('/chemical_forms', async (req, res) => {
  const data = req.body;
  if (!data.user_id) return res.status(400).json({ error: 'user_id is required' });

  const { data: insertData, error } = await supabase.from('chemical_form').insert([data]).select('*').single();
  if (error) return res.status(500).json({ error: error.message });

  res.json(insertData);
});

app.get('/chemical_forms', async (req, res) => {
  const { data, error } = await supabase.from('chemical_form').select('*');
  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

app.get('/chemical_forms/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase.from('chemical_form').select('*').eq('user_id', userId);
  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

app.get('/units/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase.from('chemical_form').select('unit').eq('user_id', userId);
  if (error) return res.status(500).json({ error: error.message });

  const uniqueUnits = [...new Set(data.map(row => row.unit))];
  res.json({ units: uniqueUnits });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
