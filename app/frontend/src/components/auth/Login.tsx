import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Login successful!');
        localStorage.setItem('token', data.token);
        // Navigate to dashboard/feed
        navigate('/feed');
      } else {
        setError(data.message || 'Login failed');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username or Email"
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
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="mt-2 text-red-600">{error}</div>}
        {success && <div className="mt-2 text-green-600">{success}</div>}
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </div>
      </form>
    </>
  );
};

export default Login; 