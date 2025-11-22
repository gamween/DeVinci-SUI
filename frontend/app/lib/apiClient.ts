// API Client: appels vers le backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = {
  async getLives() {
    const response = await fetch(`${API_BASE_URL}/api/lives`);
    return response.json();
  },

  async getLive(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/lives/${id}`);
    return response.json();
  },

  async getUserProfile(address: string) {
    const response = await fetch(`${API_BASE_URL}/api/users/${address}`);
    return response.json();
  },

  async getCreatorProfile(address: string) {
    const response = await fetch(`${API_BASE_URL}/api/users/${address}/creator`);
    return response.json();
  }
};
