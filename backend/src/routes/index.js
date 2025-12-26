const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const db = require('../config/database');

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
    const [books] = await db.query(
      'SELECT * FROM books ORDER BY read_date DESC, created_at DESC'
    );
    res.json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
});

// ==================== AUTH ROUTES ====================

router.post('/api/admin/login', authController.login);

// ==================== ADMIN ROUTES ====================

router.get('/api/admin/skills', authMiddleware, skillsController.getAllSkills);
router.post('/api/admin/skills', authMiddleware, skillsController.createSkill);

module.exports = router;