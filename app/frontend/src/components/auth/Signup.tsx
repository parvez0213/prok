import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validate = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      setError('Invalid email address.');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return false;
    }
    if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[^A-Za-z0-9]/.test(formData.password)) {
      setError('Password must contain uppercase, lowercase, number, and special character.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      if (res.status === 201) {
        setSuccess('Signup successful! You can now log in.');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <>
      <AnimatedBackground />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="mb-4 w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="mb-4 w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="mb-4 w-full p-2 border rounded"
        />
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="mb-4 w-full p-2 border rounded"
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {error && <div className="mt-2 text-red-600">{error}</div>}
        {success && <div className="mt-2 text-green-600">{success}</div>}
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </form>
    </>
  );
};

export default Signup; 