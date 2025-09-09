import type { User } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Get user profile data
export const getProfile = async (): Promise<User> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token');
  }

  const response = await fetch(`${API_URL}/api/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch profile');
  }

  return response.json();
};

// Update user profile data
export const updateProfile = async (profileData: Partial<User>): Promise<User> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token');
  }

  const response = await fetch(`${API_URL}/api/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update profile');
  }

  return response.json();
};

// Upload profile image
export const uploadProfileImage = async (file: File): Promise<{ avatar_url: string; thumbnail_url: string }> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/api/profile/image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to upload image');
  }

  return response.json();
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}; 