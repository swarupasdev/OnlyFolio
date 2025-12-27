const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ==================== PUBLIC ROUTES ====================

// Health check
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Backend is working!' });
});

// Get skills
router.get('/api/skills', async (req, res) => {
  try {
    const [skills] = await db.query(
      'SELECT * FROM skills WHERE is_featured = 1 ORDER BY display_order ASC'
    );
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get projects
router.get('/api/projects', async (req, res) => {
  try {
    const [projects] = await db.query(
      'SELECT * FROM projects WHERE is_featured = 1 ORDER BY display_order ASC'
    );
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get poems
router.get('/api/poems', async (req, res) => {
  try {
    const [poems] = await db.query(
      'SELECT * FROM poems WHERE is_published = 1 ORDER BY display_order ASC'
    );
    res.json({ success: true, data: poems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get books
router.get('/api/books', async (req, res) => {
  try {
    const [books] = await db.query(
      'SELECT * FROM books ORDER BY read_date DESC'
    );
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Contact form
router.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    await db.query(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;