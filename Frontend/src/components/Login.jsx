import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({setlog}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3000/users/login', { username, password });
      if (response.status === 200) {
        alert('Login successful!');
        setlog(true)
        navigate('/profile', { state: { user: response.data.user } });
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      setErrorMessage('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {errorMessage && (
          <div className="bg-red-500 text-white text-center p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg ${loading ? 'bg-blue-300' : 'bg-blue-500'} text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <button
          onClick={() => navigate('/signup')}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Don’t have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
