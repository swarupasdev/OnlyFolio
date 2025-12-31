import React, { useState, useEffect } from 'react';
import { LogOut, BarChart3, Code, FileText, BookOpen, MessageSquare, PlusCircle, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [skillsRes, projectsRes, analyticsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/skills', { headers }),
        fetch('http://localhost:5000/api/admin/projects', { headers }),
        fetch('http://localhost:5000/api/admin/analytics/overview', { headers })
      ]);

      const skillsData = await skillsRes.json();
      const projectsData = await projectsRes.json();
      const analyticsData = await analyticsRes.json();

      if (skillsData.success) setSkills(skillsData.data);
      if (projectsData.success) setProjects(projectsData.data);
      if (analyticsData.success) setStats(analyticsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setSkills(skills.filter(s => s.id !== id));
        alert('Skill deleted successfully!');
      }
    } catch (error) {
      alert('Error deleting skill');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setProjects(projects.filter(p => p.id !== id));
        alert('Project deleted successfully!');
      }
    } catch (error) {
      alert('Error deleting project');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <nav className="bg-black/50 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'skills', label: 'Skills', icon: Code },
            { id: 'projects', label: 'Projects', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-cyan-400 text-xl animate-pulse">Loading...</div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/50 backdrop-blur-xl border-2 border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <BarChart3 className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats.total_views || 0}</h3>
                    <p className="text-gray-400">Total Views</p>
                  </div>

                  <div className="bg-black/50 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <BarChart3 className="w-10 h-10 text-blue-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats.unique_visitors || 0}</h3>
                    <p className="text-gray-400">Unique Visitors</p>
                  </div>

                  <div className="bg-black/50 backdrop-blur-xl border-2 border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <BarChart3 className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{stats.today_views || 0}</h3>
                    <p className="text-gray-400">Today's Views</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/50 backdrop-blur-xl border-2 border-cyan-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-300">
                        <span>Total Skills</span>
                        <span className="font-bold">{skills.length}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Total Projects</span>
                        <span className="font-bold">{projects.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-xl border-2 border-blue-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Recent Activity</h3>
                    <p className="text-gray-400">Dashboard is live and working!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Manage Skills</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all">
                    <PlusCircle className="w-5 h-5" />
                    Add Skill
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map(skill => (
                    <div key={skill.id} className="bg-black/50 backdrop-blur-xl border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/70 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-cyan-300">{skill.name}</h3>
                          <p className="text-sm text-gray-400">{skill.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all">
                            <Edit className="w-4 h-4 text-blue-400" />
                          </button>
                          <button 
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                          style={{ width: `${skill.proficiency_level}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400">Level: {skill.proficiency_level}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all">
                    <PlusCircle className="w-5 h-5" />
                    Add Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map(project => (
                    <div key={project.id} className="bg-black/50 backdrop-blur-xl border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/70 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-cyan-300">{project.title}</h3>
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all">
                            <Edit className="w-4 h-4 text-blue-400" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies && project.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}