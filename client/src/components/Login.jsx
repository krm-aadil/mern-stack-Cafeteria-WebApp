import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      // Log the response data to see what's coming back
      console.log('Login response:', data);

      if (response.ok) {
        // Save the token to localStorage
        localStorage.setItem('token', data.token);

        // Log token and user role to verify correct saving
        console.log('Token saved:', localStorage.getItem('token')); // Check if token is saved
        console.log('User role:', data.user?.role); // Log user role

        // Check user role and redirect accordingly
        if (data.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/order');
        }
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
