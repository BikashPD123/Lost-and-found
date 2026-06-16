const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite client port (or 5174 depending on configuration)
  credentials: true,
}));
app.use(express.json());

// Session-based authentication configuration
app.use(session({
  name: 'admin_session',
  secret: 'super-secure-session-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true in production (requires HTTPS)
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Admin credentials
const MASTER_ADMIN_EMAIL = 'kagestar@gmail.com';
const MASTER_ADMIN_PASSWORD = 'bikash112kumar';

// Middleware to protect admin routes
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'Admin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized access. Please log in as administrator.' });
  }
};

// Admin Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Strictly validate admin credentials
  if (email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase() && password === MASTER_ADMIN_PASSWORD) {
    // Save details in express-session
    req.session.user = {
      email: MASTER_ADMIN_EMAIL,
      role: 'Admin',
      name: 'Administrator'
    };
    return res.json({ message: 'Login successful', user: req.session.user });
  }

  return res.status(401).json({ message: 'Invalid Email or Password' });
});

// Admin Logout endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out session' });
    }
    res.clearCookie('admin_session');
    return res.json({ message: 'Logout successful' });
  });
});

// Protected Admin Data Route
app.get('/api/admin/dashboard-stats', requireAdmin, (req, res) => {
  res.json({
    message: 'Authorized access to dashboard stats granted.',
    stats: {
      totalLost: 1248,
      totalFound: 930,
      pendingClaims: 313,
      resolvedCases: 811
    }
  });
});

// Check Current Session Status
app.get('/api/auth/status', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  }
  return res.json({ isAuthenticated: false });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Secure Admin API Server running on port ${PORT}`);
});
