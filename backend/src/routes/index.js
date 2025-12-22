const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Controllers
const authController = require('../controllers/authController');
const skillsController = require('../controllers/skillsController');
const projectsController = require('../controllers/projectsController');

// ==================== PUBLIC ROUTES ====================

// Skills
router.get('/api/skills', skillsController.getFeaturedSkills);

// Projects
router.get('/api/projects', projectsController.getFeaturedProjects);
router.get('/api/projects/:id', projectsController.getProjectById);

// Poems
router.get('/api/poems', async (req, res, next) => {
  try {
    const db = require('../config/database');
    const [poems] = await db.query(
      'SELECT id, title, preview_text, full_text FROM poems WHERE is_published = 1 ORDER BY display_order ASC'
    );
    res.json({ success: true, data: poems });
  } catch (error) {
    next(error);
  }
});

// Books
router.get('/api/books', async (req, res, next) => {
  try {
    const db = require('../config/database');
    const [books] = await db.query(
      'SELECT * FROM books ORDER BY read_date DESC, created_at DESC'
    );
    res.json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
});

// Discussions
router.get('/api/discussions', async (req, res, next) => {
  try {
    const db = require('../config/database');
    const [discussions] = await db.query(
      'SELECT id, topic, question FROM discussions WHERE is_active = 1 ORDER BY display_order ASC'
    );
    res.json({ success: true, data: discussions });
  } catch (error) {
    next(error);
  }
});

// Analytics - Track page view
router.post('/api/analytics/pageview', async (req, res, next) => {
  try {
    const { page_name } = req.body;
    const db = require('../config/database');
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.headers['user-agent'];

    await db.query(
      'INSERT INTO page_views (page_name, ip_address, user_agent) VALUES (?, ?, ?)',
      [page_name, ip_address, user_agent]
    );

    res.json({ success: true, message: 'Page view tracked' });
  } catch (error) {
    next(error);
  }
});

// Contact form
router.post('/api/contact', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const db = require('../config/database');
    const ip_address = req.ip || req.connection.remoteAddress;

    await db.query(
      'INSERT INTO contact_messages (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject, message, ip_address]
    );

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
});

// ==================== AUTH ROUTES ====================

router.post('/api/admin/login', authController.login);

// ==================== ADMIN ROUTES (Protected) ====================

// Auth
router.get('/api/admin/me', authMiddleware, authController.getCurrentUser);
router.post('/api/admin/change-password', authMiddleware, authController.changePassword);

// Skills Management
router.get('/api/admin/skills', authMiddleware, skillsController.getAllSkills);
router.post('/api/admin/skills', authMiddleware, skillsController.createSkill);
router.put('/api/admin/skills/:id', authMiddleware, skillsController.updateSkill);
router.delete('/api/admin/skills/:id', authMiddleware, skillsController.deleteSkill);

// Projects Management
router.get('/api/admin/projects', authMiddleware, projectsController.getAllProjects);
router.post('/api/admin/projects', authMiddleware, projectsController.createProject);
router.put('/api/admin/projects/:id', authMiddleware, projectsController.updateProject);
router.delete('/api/admin/projects/:id', authMiddleware, projectsController.deleteProject);

// Analytics Dashboard
router.get('/api/admin/analytics/overview', authMiddleware, async (req, res, next) => {
  try {
    const db = require('../config/database');
    
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
    next(error);
  }
});

module.exports = router;