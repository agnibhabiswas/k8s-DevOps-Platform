const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// ✅ Health check (for frontend)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ API routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Fallback to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;