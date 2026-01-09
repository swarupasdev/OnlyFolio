import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddProjectModal({ isOpen, onClose, onAdd, token }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github_url: '',
    technologies: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const techArray = formData.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t);

      const response = await fetch('http://localhost:5000/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          github_url: formData.github_url,
          technologies: techArray,
          is_featured: 1,
          display_order: 0
        })
      });

      const data = await response.json();

      if (data.success) {
        onAdd();
        onClose();
        setFormData({ title: '', description: '', github_url: '', technologies: '' });
      } else {
        setError(data.message || 'Failed to add project');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border-2 border-cyan-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cyan-400">Add New Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cyan-400 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/70 transition-colors"
              placeholder="e.g., Machine Learning Classifier"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-400 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/70 transition-colors h-24"
              placeholder="Brief description of your project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-400 mb-2">
              GitHub Repository URL *
            </label>
            <input
              type="url"
              required
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/70 transition-colors"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-400 mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/70 transition-colors"
              placeholder="Python, TensorFlow, React"
            />
            <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}