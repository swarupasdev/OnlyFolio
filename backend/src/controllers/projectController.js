const db = require('../config/database');

// Get all featured projects (Public)
exports.getFeaturedProjects = async (req, res, next) => {
  try {
    const [projects] = await db.query(
      `SELECT id, title, description, github_url, live_demo_url, 
              image_url, display_order 
       FROM projects 
       WHERE is_featured = 1 
       ORDER BY display_order ASC, created_at DESC`
    );

    // Get technologies for each project
    for (let project of projects) {
      const [technologies] = await db.query(
        'SELECT technology_name FROM project_technologies WHERE project_id = ?',
        [project.id]
      );
      project.technologies = technologies.map(t => t.technology_name);
    }

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// Get single project (Public)
exports.getProjectById = async (req, res, next) => {
  try {
    const [projects] = await db.query(
      'SELECT * FROM projects WHERE id = ? AND is_featured = 1',
      [req.params.id]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = projects[0];

    // Get technologies
    const [technologies] = await db.query(
      'SELECT technology_name FROM project_technologies WHERE project_id = ?',
      [project.id]
    );
    project.technologies = technologies.map(t => t.technology_name);

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Get all projects (Admin)
exports.getAllProjects = async (req, res, next) => {
  try {
    const [projects] = await db.query(
      'SELECT * FROM projects ORDER BY display_order ASC, created_at DESC'
    );

    // Get technologies for each project
    for (let project of projects) {
      const [technologies] = await db.query(
        'SELECT technology_name FROM project_technologies WHERE project_id = ?',
        [project.id]
      );
      project.technologies = technologies.map(t => t.technology_name);
    }

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// Create project (Admin)
exports.createProject = async (req, res, next) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      title,
      description,
      detailed_description,
      github_url,
      live_demo_url,
      image_url,
      display_order = 0,
      is_featured = 0,
      technologies = []
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Project title is required'
      });
    }

    // Insert project
    const [result] = await connection.query(
      `INSERT INTO projects 
       (title, description, detailed_description, github_url, live_demo_url, 
        image_url, display_order, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, detailed_description, github_url, live_demo_url, 
       image_url, display_order, is_featured]
    );

    const projectId = result.insertId;

    // Insert technologies
    if (technologies && technologies.length > 0) {
      const techValues = technologies.map(tech => [projectId, tech]);
      await connection.query(
        'INSERT INTO project_technologies (project_id, technology_name) VALUES ?',
        [techValues]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { id: projectId }
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// Update project (Admin)
exports.updateProject = async (req, res, next) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      title,
      description,
      detailed_description,
      github_url,
      live_demo_url,
      image_url,
      display_order,
      is_featured,
      technologies
    } = req.body;

    // Check if project exists
    const [existing] = await connection.query(
      'SELECT id FROM projects WHERE id = ?',
      [req.params.id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Update project
    await connection.query(
      `UPDATE projects 
       SET title = COALESCE(?, title),
           description = COALESCE(?, description),
           detailed_description = COALESCE(?, detailed_description),
           github_url = COALESCE(?, github_url),
           live_demo_url = COALESCE(?, live_demo_url),
           image_url = COALESCE(?, image_url),
           display_order = COALESCE(?, display_order),
           is_featured = COALESCE(?, is_featured)
       WHERE id = ?`,
      [title, description, detailed_description, github_url, live_demo_url, 
       image_url, display_order, is_featured, req.params.id]
    );

    // Update technologies if provided
    if (technologies) {
      await connection.query(
        'DELETE FROM project_technologies WHERE project_id = ?',
        [req.params.id]
      );

      if (technologies.length > 0) {
        const techValues = technologies.map(tech => [req.params.id, tech]);
        await connection.query(
          'INSERT INTO project_technologies (project_id, technology_name) VALUES ?',
          [techValues]
        );
      }
    }

    await connection.commit();

    res.json({
      success: true,
      message: 'Project updated successfully'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// Delete project (Admin)
exports.deleteProject = async (req, res, next) => {
  try {
    const [result] = await db.query(
      'DELETE FROM projects WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};