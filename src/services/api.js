const API_BASE_URL = 'http://localhost:5000';

export const portfolioAPI = {
  // Get all skills
  getSkills: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/skills`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  },

  // Get all projects
  getProjects: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  // Get all poems
  getPoems: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/poems`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching poems:', error);
      return [];
    }
  },

  // Get all books
  getBooks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  },

  // Submit contact form
  submitContact: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting contact:', error);
      return { success: false, message: 'Failed to send message' };
    }
  },

  // Track page view
  trackPageView: async (pageName) => {
    try {
      await fetch(`${API_BASE_URL}/api/analytics/pageview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_name: pageName })
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }
};