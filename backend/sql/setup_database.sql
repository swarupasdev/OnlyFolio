-- ============================================
-- Portfolio Database Setup Script (MySQL)
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS portfolio_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Disable foreign key checks during setup
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables (if any)
DROP TABLE IF EXISTS discussion_responses;
DROP TABLE IF EXISTS discussions;
DROP TABLE IF EXISTS project_technologies;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS poems;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS page_views;
DROP TABLE IF EXISTS social_links;
DROP TABLE IF EXISTS users;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- Create Tables
-- ============================================

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Skills Table
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    proficiency_level INT CHECK (proficiency_level >= 0 AND proficiency_level <= 100),
    icon_name VARCHAR(50),
    color_from VARCHAR(20),
    color_to VARCHAR(20),
    display_order INT DEFAULT 0,
    is_featured TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (is_featured),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects Table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    detailed_description TEXT,
    github_url VARCHAR(255),
    live_demo_url VARCHAR(255),
    image_url VARCHAR(255),
    display_order INT DEFAULT 0,
    is_featured TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (is_featured),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Project Technologies Table
CREATE TABLE project_technologies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    technology_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_tech (project_id, technology_name),
    INDEX idx_project (project_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Poems Table
CREATE TABLE poems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    preview_text TEXT,
    full_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_published TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    INDEX idx_published (is_published),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Books Table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    thoughts TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    read_date DATE,
    cover_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_rating (rating),
    INDEX idx_read_date (read_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Discussions Table
CREATE TABLE discussions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(200) NOT NULL,
    question TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    INDEX idx_active (is_active),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Discussion Responses Table
CREATE TABLE discussion_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discussion_id INT NOT NULL,
    response_text TEXT NOT NULL,
    author_name VARCHAR(100),
    author_email VARCHAR(100),
    ip_address VARCHAR(45),
    is_approved TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES discussions(id) ON DELETE CASCADE,
    INDEX idx_discussion (discussion_id),
    INDEX idx_approved (is_approved),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Messages Table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Page Views Table
CREATE TABLE page_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_name VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(255),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_page (page_name),
    INDEX idx_date (viewed_at),
    INDEX idx_ip (ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Social Links Table
CREATE TABLE social_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    INDEX idx_active (is_active),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert Initial Data
-- ============================================

-- Admin User (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Hash generated using: bcrypt.hash('admin123', 10)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'santiswarupnayak1@gmail.com', '$2b$10$rZ7qGXxJ9WKZ0vKkXxHYweP7lHyKkI0yXzH3gKg8ZqKMxYZj8HzEO', 'admin');

-- Social Links
INSERT INTO social_links (platform, url, icon_name, display_order, is_active) VALUES
('linkedin', 'https://linkedin.com/in/santiswarup-nayak', 'Linkedin', 1, 1),
('github', 'https://github.com/swarupasdev', 'Github', 2, 1),
('email', 'mailto:santiswarupnayak1@gmail.com', 'Mail', 3, 1);

-- Skills
INSERT INTO skills (name, category, proficiency_level, icon_name, color_from, color_to, display_order, is_featured) VALUES
('C++', 'programming', 85, 'Terminal', 'cyan-400', 'blue-500', 1, 1),
('Python', 'programming', 90, 'Code', 'blue-400', 'cyan-500', 2, 1),
('AI/ML', 'technology', 80, 'Brain', 'cyan-500', 'blue-600', 3, 1),
('JavaScript', 'programming', 75, 'Code', 'yellow-400', 'orange-500', 4, 0),
('React', 'framework', 80, 'Code', 'blue-400', 'cyan-400', 5, 0);

-- Projects
INSERT INTO projects (title, description, detailed_description, github_url, display_order, is_featured) VALUES
('ML Classification Model', 
 'Advanced machine learning model for data classification', 
 'Built with Python, TensorFlow, and Scikit-learn. Implements various classification algorithms including Random Forest, SVM, and Neural Networks with 95% accuracy.',
 'https://github.com/swarupasdev', 
 1, 1),

('Data Structures Library', 
 'Custom implementation of advanced data structures', 
 'High-performance C++ library featuring template-based implementations of trees, graphs, heaps, and advanced algorithms with comprehensive documentation.',
 'https://github.com/swarupasdev', 
 2, 1),

('Neural Network Framework', 
 'Built from scratch neural network implementation', 
 'Pure Python implementation using NumPy for educational purposes. Includes backpropagation, various activation functions, and optimization algorithms.',
 'https://github.com/swarupasdev', 
 3, 1),

('Algorithm Visualizer', 
 'Interactive tool for visualizing sorting algorithms', 
 'Built with Python and Pygame. Visualizes bubble sort, quick sort, merge sort, and other algorithms with step-by-step animations.',
 'https://github.com/swarupasdev', 
 4, 1);

-- Project Technologies
INSERT INTO project_technologies (project_id, technology_name) VALUES
(1, 'Python'), (1, 'TensorFlow'), (1, 'Scikit-learn'),
(2, 'C++'), (2, 'Templates'),
(3, 'Python'), (3, 'NumPy'),
(4, 'Python'), (4, 'Pygame');

-- Poems
INSERT INTO poems (title, preview_text, full_text, display_order, is_published) VALUES
('Digital Dreams', 
 'In circuits deep and code so bright, Where algorithms dance through night...', 
 'In circuits deep and code so bright,
Where algorithms dance through night,
I find a world of ones and zeros,
Where logic reigns and reason grows.

Through silicon valleys, data streams,
I chase electric, binary dreams.', 
 1, 1),

('The Algorithm of Life', 
 'Each line we write, a path we choose, In loops and functions, win or lose...', 
 'Each line we write, a path we choose,
In loops and functions, win or lose,
Debugging errors, fixing flaws,
Searching for meaning, finding cause.

Life compiles in real-time speed,
Each decision plants a seed.', 
 2, 1),

('Binary Hearts', 
 'Between the ones and zeros flow, Emotions that the machines don''t know...', 
 'Between the ones and zeros flow,
Emotions that machines don''t know,
A heart that beats in analog time,
While code runs through in paradigm.

We are the bridge, human and machine,
Dancing between what''s felt and seen.', 
 3, 1);

-- Books
INSERT INTO books (title, author, thoughts, rating, read_date) VALUES
('The Pragmatic Programmer', 'Hunt & Thomas', 'A masterclass in software craftsmanship and professional development.', 5, '2024-01-15'),
('Clean Code', 'Robert C. Martin', 'Essential reading for anyone who cares about code quality and maintainability.', 5, '2024-02-20'),
('Deep Learning', 'Goodfellow et al.', 'Comprehensive and rigorous treatment of modern AI techniques.', 5, '2024-03-10');

-- Discussions
INSERT INTO discussions (topic, question, display_order, is_active) VALUES
('The Myth of Sisyphus', 
 'Is the eternal struggle of Sisyphus a curse or a blessing? Does meaningless repetition destroy the soul or define it?', 
 1, 1),

('Prometheus Unbound', 
 'Did Prometheus commit hubris by stealing fire, or was it the ultimate act of compassion? Who truly suffered more - the punished or the punisher?', 
 2, 1),

('The Ship of Theseus', 
 'If all parts are replaced, is it still the same ship? At what point does identity cease and transformation begin?', 
 3, 1);

-- ============================================
-- Success Message
-- ============================================

SELECT '✅ Database setup completed successfully!' AS status;
SELECT '📊 All tables created and sample data inserted' AS message;
SELECT '🔐 Default admin credentials:' AS note;
SELECT '   Email: santiswarupnayak1@gmail.com' AS admin_email;
SELECT '   Password: admin123 (CHANGE THIS!)' AS admin_password;