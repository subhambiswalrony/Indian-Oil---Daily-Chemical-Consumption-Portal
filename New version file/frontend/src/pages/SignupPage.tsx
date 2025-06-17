import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run client-side validation first
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'Email already registered') {
          setShowDuplicateWarning(true); // ✅ triggers inline warning
        } else {
          alert(result.error || 'Signup failed');
        }
      } else {
        setIsSuccess(true); // ✅ shows success message
      }
    } catch (err) {
      alert('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-red-200 rounded-full opacity-20"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-yellow-200 rounded-full opacity-20"
          animate={{
            y: [0, -12, 0],
            x: [0, 6, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-orange-300 rounded-full opacity-20"
          animate={{
            y: [0, 18, 0],
            x: [0, -12, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        {/* Gradient shapes */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-100 to-orange-100 rounded-full opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
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
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M0,400 Q600,300 1200,400"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            opacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 1
            }}
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

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <div className="glass-card glass-morphism card-hover rounded-2xl p-8 md:p-12">
              {/* IOCL Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4"
                >
                  <motion.div
                    className="relative animate-float"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg"
                      alt="Indian Oil Corporation Limited"
                      className="h-16 w-16 object-contain"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl opacity-10 blur-sm"
                    />
                  </motion.div>
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                    >
                      Indian Oil
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm text-gray-600 font-medium"
                    >
                      Corporation Limited
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </h2>
                {showDuplicateWarning && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg shadow-sm relative"
                  >
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 mr-3" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-amber-800 mb-1">
                          Email Already Registered
                        </h3>
                        <p className="text-sm text-amber-700 mb-3">
                          This email address is already associated with an account. Please use a different email or sign in to your existing account.
                        </p>
                        <motion.button
                          onClick={handleLoginRedirect}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-medium rounded-md transition"
                        >
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Sign In Instead
                        </motion.button>
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={() => setShowDuplicateWarning(false)}
                        className="absolute top-2 right-2 text-amber-400 hover:text-amber-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                <p className="text-gray-600">
                  Join the IOCL family and access our comprehensive services
                </p>
              </motion.div>

              {/* Form Content */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  </motion.div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    Registration Successful!
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600"
                  >
                    Welcome to IOCL! Please check your email for verification.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`form-input input-focus pl-10 ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                            }`}
                          placeholder="Enter your first name"
                        />
                      </div>
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.firstName}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`form-input input-focus pl-10 ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                            }`}
                          placeholder="Enter your last name"
                        />
                      </div>
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.lastName}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input input-focus pl-10 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                          }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input input-focus pl-10 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                          }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`form-input input-focus pl-10 pr-12 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                            }`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.password}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`form-input input-focus pl-10 pr-12 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                            }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600 flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  {/* Terms Checkbox */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-start"
                  >
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label className="ml-3 text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-orange-600 hover:text-orange-500 underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-orange-600 hover:text-orange-500 underline">
                        Privacy Policy
                      </a>
                    </label>
                  </motion.div>
                  {errors.acceptTerms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.acceptTerms}
                    </motion.p>
                  )}

                  {/* Submit Button */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-200 relative overflow-hidden"
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="ml-2"
                          >
                            Creating
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              ...
                            </motion.span>
                          </motion.span>
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </motion.div>
                        </>
                      )}

                      {/* Animated background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </motion.div>

                  {/* Sign In Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                  >
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <a href="/login" className="text-orange-600 hover:text-orange-500 font-medium underline">
                        Sign in here
                      </a>
                    </p>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 py-6 text-center"
        >
          <p className="text-sm text-gray-600">
            © 2025 Indian Oil Corporation Limited. All rights reserved.
          </p>
        </motion.footer>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-10 left-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-40"
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-20 right-1/3 w-1 h-1 bg-red-400 rounded-full opacity-60"
          animate={{
            y: [0, 8, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-3 h-3 bg-yellow-400 rounded-full opacity-30"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  );
}

export default App;