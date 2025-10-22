import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserCircle, AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(formData);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Join Us
          </h1>
          <p className="text-white opacity-60">
            Create your account and start renting classics
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl p-8 border border-white border-opacity-20 backdrop-blur-sm space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500 bg-opacity-20 border border-green-400 border-opacity-30 text-green-300">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Registration successful! Redirecting to login...</span>
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
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:border-opacity-50 transition-all duration-300"
                  placeholder="Choose a username"
                  required
                  minLength={3}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-white opacity-80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:border-opacity-50 transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Full Name Field */}
            <div>
              <label className="block text-sm text-white opacity-80 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white opacity-40" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:border-opacity-50 transition-all duration-300"
                  placeholder="Enter your full name"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:border-opacity-50 transition-all duration-300"
                  placeholder="Create a password (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl bg-white text-black font-medium hover:bg-opacity-90 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Register
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center pt-4 border-t border-white border-opacity-10">
            <p className="text-white opacity-60 text-sm">
              Already have an account?{' '}
              <Link 
                to="/login"
                className="text-white font-medium hover:opacity-80 transition-opacity duration-300"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;