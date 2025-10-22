import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(credentials);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-white opacity-60">
            Sign in to continue your VHS journey
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl p-8 border border-white border-opacity-20 backdrop-blur-sm space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-sm text-white opacity-80 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-40" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:border-opacity-50 transition-all duration-300"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-white opacity-80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-40" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:border-opacity-50 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl bg-white text-black font-medium hover:bg-opacity-90 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Login
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center pt-4 border-t border-white border-opacity-10">
            <p className="text-white opacity-60 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register"
                className="text-white font-medium hover:opacity-80 transition-opacity duration-300"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;