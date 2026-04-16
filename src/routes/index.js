const express = require('express');
const path = require('path');

const app = express();

// ✅ Serve static frontend
app.use(express.static(path.join(__dirname, '../public')));

// Optional API route
app.get('/api', (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

// ✅ Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});