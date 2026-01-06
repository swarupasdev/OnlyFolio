const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Import controllers and middleware
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

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

// ==================== AUTH ROUTES ====================

router.post('/api/admin/login', authController.login);

// ==================== ADMIN ROUTES (Protected) ====================

// Get all skills (Admin)
router.get('/api/admin/skills', authMiddleware, async (req, res) => {
  try {
    const [skills] = await db.query('SELECT * FROM skills ORDER BY display_order ASC');
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete skill (Admin)
router.delete('/api/admin/skills/:id', authMiddleware, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM skills WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all projects (Admin)
router.get('/api/admin/projects', authMiddleware, async (req, res) => {
  try {
    const [projects] = await db.query('SELECT * FROM projects ORDER BY display_order ASC');
    
    // Get technologies for each project
    for (let project of projects) {
      const [techs] = await db.query(
        'SELECT technology_name FROM project_technologies WHERE project_id = ?',
        [project.id]
      );
      project.technologies = techs.map(t => t.technology_name);
    }
    
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete project (Admin)
router.delete('/api/admin/projects/:id', authMiddleware, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get analytics overview (Admin)
router.get('/api/admin/analytics/overview', authMiddleware, async (req, res) => {
  try {
    const [totalViews] = await db.query('SELECT COUNT(*) as count FROM page_views');
    const [uniqueVisitors] = await db.query('SELECT COUNT(DISTINCT ip_address) as count FROM page_views');
    const [todayViews] = await db.query('SELECT COUNT(*) as count FROM page_views WHERE DATE(viewed_at) = CURDATE()');
    
    res.json({
      success: true,
      data: {
        total_views: totalViews[0].count,
        unique_visitors: uniqueVisitors[0].count,
        today_views: todayViews[0].count
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;