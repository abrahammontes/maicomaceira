const API_URL = 'http://localhost:5000/api';

export const apiService = {
  async login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
    }
    return data;
  },

  logout() {
    localStorage.removeItem('adminToken');
  },

  getToken() {
    return localStorage.getItem('adminToken');
  },

  async getImages() {
    const response = await fetch(`${API_URL}/images`);
    return await response.json();
  },

  async uploadImage(formData) {
    const token = this.getToken();
    const response = await fetch(`${API_URL}/images/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });
    return await response.json();
  },

  async deleteImage(id) {
    const token = this.getToken();
    const response = await fetch(`${API_URL}/images/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    return await response.json();
  }
};
