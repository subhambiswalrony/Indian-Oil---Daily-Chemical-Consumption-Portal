import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

function App() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const validEmail = 'biswalsubhamrony@gmail.com';
      const validPassword = '123456789';

      if (email === validEmail && password === validPassword) {
        localStorage.setItem('isAuthenticated', 'true');
        setIsLoading(false);
        navigate('/chemical-form');
      } else {
        setIsLoading(false);
        alert('❌ Wrong email or password');
      }
    }, 1500);
  };


  return (
    <div className="min-h-screen relative bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden">

      {/* 🟠 Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating circles */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-red-200 rounded-full opacity-20"
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-yellow-200 rounded-full opacity-20"
          animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-orange-300 rounded-full opacity-20"
          animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Gradient shapes */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-30 blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-100 to-orange-100 rounded-full opacity-30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M0,200 Q400,100 800,200"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            opacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          />
          <motion.path
            d="M0,400 Q600,300 1200,400"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            opacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 1 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 0.5 }} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#eab308', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <motion.div className="glass-card rounded-2xl overflow-hidden card-hover"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-8 text-center relative">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-3 shadow-lg animate-float">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg"
                  alt="Indian Oil Logo"
                  className="w-12 h-12"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">IOCL Portal</h1>
            <p className="text-orange-100 text-sm">Indian Oil Corporation Limited</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-input pl-10 pr-3 input-focus ${errors.email
                        ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                        : ''
                      }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-input pl-10 pr-10 input-focus ${errors.password
                        ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                        : ''
                      }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-orange-500 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-orange-600 hover:text-orange-500 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to='/'>
                  <button className="text-orange-600 hover:text-orange-500 font-medium transition-colors">
                    Sign Up
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Indian Oil Corporation Limited. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
              Privacy Policy
            </button>
            <span className="text-xs text-gray-300">•</span>
            <button className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
              Terms of Service
            </button>
            <span className="text-xs text-gray-300">•</span>
            <button className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
              Support
            </button>
          </div>
        </div>

        {/* Security Badge */}
        <motion.div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.1 }}>
          <CheckCircle className="w-3 h-3 mr-1" />
          Secure
        </motion.div>
      </div>
    </div>
  );
}

export default App;