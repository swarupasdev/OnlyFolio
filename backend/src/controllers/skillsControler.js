const db = require('../config/database');

// Get all featured skills (Public)
exports.getFeaturedSkills = async (req, res, next) => {
  try {
    const [skills] = await db.query(
      `SELECT id, name, category, proficiency_level, icon_name, 
              color_from, color_to, display_order 
       FROM skills 
       WHERE is_featured = 1 
       ORDER BY display_order ASC, name ASC`
    );

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

// Get all skills (Admin)
exports.getAllSkills = async (req, res, next) => {
  try {
    const [skills] = await db.query(
      `SELECT * FROM skills ORDER BY display_order ASC, name ASC`
    );

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

// Create skill (Admin)
exports.createSkill = async (req, res, next) => {
  try {
    const {
      name,
      category,
      proficiency_level,
      icon_name,
      color_from,
      color_to,
      display_order = 0,
      is_featured = 0
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Skill name is required'
      });
    }

    const [result] = await db.query(
      `INSERT INTO skills 
       (name, category, proficiency_level, icon_name, color_from, color_to, display_order, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, category, proficiency_level, icon_name, color_from, color_to, display_order, is_featured]
    );

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    next(error);
  }
};

// Update skill (Admin)
exports.updateSkill = async (req, res, next) => {
  try {
    const {
      name,
      category,
      proficiency_level,
      icon_name,
      color_from,
      color_to,
      display_order,
      is_featured
    } = req.body;

    const [result] = await db.query(
      `UPDATE skills 
       SET name = COALESCE(?, name),
           category = COALESCE(?, category),
           proficiency_level = COALESCE(?, proficiency_level),
           icon_name = COALESCE(?, icon_name),
           color_from = COALESCE(?, color_from),
           color_to = COALESCE(?, color_to),
           display_order = COALESCE(?, display_order),
           is_featured = COALESCE(?, is_featured)
       WHERE id = ?`,
      [name, category, proficiency_level, icon_name, color_from, color_to, display_order, is_featured, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete skill (Admin)
exports.deleteSkill = async (req, res, next) => {
  try {
    const [result] = await db.query('DELETE FROM skills WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};