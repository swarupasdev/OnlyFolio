const db = require('../config/database');

exports.getFeaturedSkills = async (req, res, next) => {
  try {
    const [skills] = await db.query(
      'SELECT id, name, category, proficiency_level, icon_name, color_from, color_to, display_order FROM skills WHERE is_featured = 1 ORDER BY display_order ASC'
    );
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

exports.getAllSkills = async (req, res, next) => {
  try {
    const [skills] = await db.query('SELECT * FROM skills ORDER BY display_order ASC');
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency_level, icon_name, color_from, color_to, display_order = 0, is_featured = 0 } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, message: 'Skill name is required' });
    }

    const [result] = await db.query(
      'INSERT INTO skills (name, category, proficiency_level, icon_name, color_from, color_to, display_order, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, proficiency_level, icon_name, color_from, color_to, display_order, is_featured]
    );

    res.status(201).json({ success: true, message: 'Skill created', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
};