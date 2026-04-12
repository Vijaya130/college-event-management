const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// GET all events
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST add event
app.post('/api/events', (req, res) => {
  const { name, type, date, time, status, venue } = req.body;
  console.log('Received:', req.body);
  db.query(
    'INSERT INTO events (name, type, date, time, status, venue) VALUES (?, ?, ?, ?, ?, ?)',
    [name, type, date, time, status, venue || null],
    (err, result) => {
      if (err) {
        console.log('DB Error:', err);
        return res.status(500).json({ error: err });
      }
      res.json({ id: result.insertId, name, type, date, time, status, venue });
    }
  );
});

// DELETE event
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM events WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Event deleted successfully' });
  });
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});