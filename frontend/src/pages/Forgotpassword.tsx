import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    Shield,
    Smartphone,
    Lock,
    Eye,
    EyeOff,
} from 'lucide-react';

function ForgotPassword() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [resendTimer, setResendTimer] = useState(60); // ⏳ Resend OTP cooldown

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    // Timer logic for Resend OTP
    useEffect(() => {
        // let interval: NodeJS.Timeout;
        let interval: ReturnType<typeof setInterval>;
        if (currentStep === 2 && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [currentStep, resendTimer]);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${backend_url}/request-reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to send OTP');

            setCurrentStep(2);
            setResendTimer(60);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter complete 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${backend_url}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otpString })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'OTP verification failed');

            setCurrentStep(3);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!newPassword || newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${backend_url}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to reset password');

            setShowSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch(`${backend_url}/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to resend OTP');

            setResendTimer(60);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const SuccessPopup = () => (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center"
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <motion.div className="relative mx-auto w-20 h-20 mb-6"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                        animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                        <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Password Changed!</h3>
                    <p className="text-gray-600 mb-6">Your password has been successfully updated.</p>
                </motion.div>

                <motion.button onClick={() => navigate('/login')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                >
                    Back to Login <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
            </motion.div>
        </motion.div>
    );

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Background Elements */}
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
            </div>

            <div className="relative w-full max-w-md">
                {/* Main Card */}
                <motion.div
                    className="glass-card rounded-2xl overflow-hidden card-hover"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-8 text-center relative">
                        <div className="flex justify-center mb-4">
                            <motion.div
                                className="bg-white rounded-full p-3 shadow-lg"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg"
                                    alt="Indian Oil Logo"
                                    className="w-12 h-12"
                                />
                            </motion.div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {currentStep === 1 && 'Forgot Password'}
                            {currentStep === 2 && 'Verify OTP'}
                            {currentStep === 3 && 'Reset Password'}
                        </h1>
                        <p className="text-orange-100 text-sm">
                            {currentStep === 1 && 'Enter your registered email address'}
                            {currentStep === 2 && 'OTP sent successfully to your registered mobile number'}
                            {currentStep === 3 && 'Create your new password'}
                        </p>
                    </div>

                    {/* Form Content */}
                    <div className="px-8 py-8">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Email Input */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="email-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center mb-6">
                                        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                            <Mail className="w-8 h-8 text-orange-600" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Enter Your Email</h2>
                                        <p className="text-gray-600 text-sm">We'll send an OTP to your registered Email</p>
                                    </div>

                                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`form-input pl-10 pr-3 input-focus ${error ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''}`}
                                                    placeholder="Enter your registered email"
                                                />
                                            </div>
                                            {error && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    {error}
                                                </p>
                                            )}
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Verifying...
                                                </>
                                            ) : (
                                                <>
                                                    Send OTP
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Step 2: OTP Input */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="otp-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center mb-6">
                                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <Smartphone className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Enter OTP</h2>
                                        <p className="text-gray-600 text-sm">Enter the 6-digit code sent to your mobile</p>
                                      {/*  <p className="text-orange-600 text-sm font-medium mt-1">+91 ****-***-789</p>  */}
                                    </div>

                                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 text-center">
                                                6-Digit OTP
                                            </label>
                                            <div className="flex justify-center space-x-2">
                                                {otp.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        id={`otp-${index}`}
                                                        type="text"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                        className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                                    />
                                                ))}
                                            </div>
                                            {error && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center justify-center">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    {error}
                                                </p>
                                            )}
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Verifying...
                                                </>
                                            ) : (
                                                <>
                                                    Verify OTP
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </motion.button>

                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={handleResendOtp}
                                                className={`text-sm font-medium transition-colors ${resendTimer > 0
                                                        ? 'text-gray-400 cursor-not-allowed'
                                                        : 'text-orange-600 hover:text-orange-500'
                                                    }`}
                                                disabled={resendTimer > 0}
                                            >
                                                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* Step 3: Password Reset */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="password-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center mb-6">
                                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                            <Shield className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Create New Password</h2>
                                        <p className="text-gray-600 text-sm">Choose a strong password for your account</p>
                                    </div>

                                    <form onSubmit={handlePasswordReset} className="space-y-6">
                                        {/* New Password */}
                                        <div className="space-y-2">
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="newPassword"
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="form-input pl-10 pr-10 input-focus"
                                                    placeholder="Enter new password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-orange-500 transition-colors"
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="space-y-2">
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="form-input pl-10 pr-10 input-focus"
                                                    placeholder="Confirm new password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-orange-500 transition-colors"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {error && (
                                            <p className="text-red-500 text-xs flex items-center">
                                                <AlertCircle className="w-3 h-3 mr-1" />
                                                {error}
                                            </p>
                                        )}

                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    Update Password
                                                    <CheckCircle className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Back Button */}
                        {currentStep > 1 && (
                            <motion.button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="mt-6 flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </motion.button>
                        )}

                        {/* Back to Login */}
                        {currentStep === 1 && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-sm text-orange-600 hover:text-orange-500 font-medium transition-colors flex items-center justify-center"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back to Login
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Progress Indicator */}
                <div className="mt-6 flex justify-center space-x-2">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${step === currentStep
                                ? 'bg-orange-500 scale-125'
                                : step < currentStep
                                    ? 'bg-green-500'
                                    : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Success Popup */}
            <AnimatePresence>
                {showSuccess && <SuccessPopup />}
            </AnimatePresence>
        </div>
    );
}

export default ForgotPassword;