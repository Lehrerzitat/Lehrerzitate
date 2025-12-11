const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// CORS Konfiguration - Erlaubt Anfragen von GitHub Pages
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:5173',
    'https://github.com',
    'https://*.github.io',
    process.env.FRONTEND_URL || '*'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// Quotes Routes
const quotesRouter = require('../routes/quotes');
app.use('/api/quotes', quotesRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend ist online' });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route nicht gefunden', 
    path: req.path 
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const status = err.status || 500;
  const message = err.message || 'Ein Fehler ist aufgetreten';
  
  res.status(status).json({ 
    error: message,
    status: status
  });
});

module.exports = app;