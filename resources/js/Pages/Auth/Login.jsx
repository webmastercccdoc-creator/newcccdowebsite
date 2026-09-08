import { useEffect, useState } from 'react';
import { router, Link } from '@inertiajs/react';
import ccdologo from '../../assets/logos/ccdoclogo.png';

export default function Login() {
    useEffect(() => {
        document.title = "Login - City College of Cagayan de Oro";
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpStep, setOtpStep] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Timer states for login OTP
    const [otpTimer, setOtpTimer] = useState(300); // 5 minutes in seconds
    const [otpTimerActive, setOtpTimerActive] = useState(false);
    const [canResendOtp, setCanResendOtp] = useState(false);

    // Forgot Password States
    const [forgotPasswordStep, setForgotPasswordStep] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetOtp, setResetOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetStep, setResetStep] = useState('email'); // 'email', 'otp', 'password'
    const [resetSuccess, setResetSuccess] = useState(false);

    // Timer states for reset OTP
    const [resetOtpTimer, setResetOtpTimer] = useState(600); // 10 minutes in seconds
    const [resetOtpTimerActive, setResetOtpTimerActive] = useState(false);
    const [canResendResetOtp, setCanResendResetOtp] = useState(false);

    // Password strength meter
    const [passwordStrength, setPasswordStrength] = useState(0);

    const errorMessage = (error) => Array.isArray(error) ? error[0] : error;

    const csrfToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const postJson = async (url, body = {}) => fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': csrfToken(),
        },
        credentials: 'same-origin',
        body: JSON.stringify(body),
    });

    // Timer effect for login OTP
    useEffect(() => {
        let interval = null;
        if (otpTimerActive && otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        } else if (otpTimer === 0) {
            setOtpTimerActive(false);
            setCanResendOtp(true);
        }
        return () => clearInterval(interval);
    }, [otpTimerActive, otpTimer]);

    // Timer effect for reset OTP
    useEffect(() => {
        let interval = null;
        if (resetOtpTimerActive && resetOtpTimer > 0) {
            interval = setInterval(() => {
                setResetOtpTimer((prev) => prev - 1);
            }, 1000);
        } else if (resetOtpTimer === 0) {
            setResetOtpTimerActive(false);
            setCanResendResetOtp(true);
        }
        return () => clearInterval(interval);
    }, [resetOtpTimerActive, resetOtpTimer]);

    // Format time helper
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Password strength checker
    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;
        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const response = await postJson('/login', {
                email: email,
                password: password,
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setOtpStep(true);
                setOtpTimer(300);
                setOtpTimerActive(true);
                setCanResendOtp(false);
                setPassword('');
            } else {
                if (response.status === 419) {
                    setErrors({ general: 'Session expired. Please refresh the page and try again.' });
                } else if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setErrors({ general: data.message || 'Login failed. Please try again.' });
                }

                if (data.errors?.email === 'Your account is inactive. Please contact the administrator.') {
                    setErrors({ email: 'Your account is inactive. Please contact the administrator.' });
                }
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const response = await postJson('/login/verify-otp', { otp });
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setOtpTimerActive(false);
                router.visit(data.redirect || '/admin');
            } else {
                setErrors(response.status === 419
                    ? { general: 'Session expired. Please refresh the page and try again.' }
                    : (data.errors || { general: data.message || 'Verification failed. Please try again.' }));
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setErrors({});
        setLoading(true);

        try {
            const response = await postJson('/login/resend-otp');
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setOtpTimer(300);
                setOtpTimerActive(true);
                setCanResendOtp(false);
                setErrors({});
            } else {
                setErrors(data.errors || { general: data.message || 'Unable to send a new code.' });
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // Forgot Password Handlers
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const response = await postJson('/forgot-password', { email: resetEmail });
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setResetStep('otp');
                setResetOtpTimer(600);
                setResetOtpTimerActive(true);
                setCanResendResetOtp(false);
                setErrors({});
            } else {
                setErrors(data.errors || { general: data.message || 'Unable to process request.' });
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetOtpSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const response = await postJson('/reset-password/verify-otp', { 
                email: resetEmail,
                otp: resetOtp 
            });
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setResetStep('password');
                setResetOtpTimerActive(false);
                setErrors({});
            } else {
                setErrors(data.errors || { general: data.message || 'Invalid verification code.' });
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match.' });
            setLoading(false);
            return;
        }

        try {
            const response = await postJson('/reset-password', {
                email: resetEmail,
                password: newPassword,
                password_confirmation: confirmPassword,
            });
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setResetSuccess(true);
                setTimeout(() => {
                    setForgotPasswordStep(false);
                    setResetStep('email');
                    setResetEmail('');
                    setResetOtp('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setResetSuccess(false);
                    setResetOtpTimerActive(false);
                }, 3000);
            } else {
                setErrors(data.errors || { general: data.message || 'Unable to reset password.' });
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleResendResetOtp = async () => {
        setErrors({});
        setLoading(true);

        try {
            const response = await postJson('/reset-password/resend-otp', { email: resetEmail });
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setResetOtpTimer(600);
                setResetOtpTimerActive(true);
                setCanResendResetOtp(false);
                setErrors({});
            } else {
                setErrors(data.errors || { general: data.message || 'Unable to send a new code.' });
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // Function to mask email
    const maskEmail = (email) => {
        if (!email) return '';
        const [localPart, domain] = email.split('@');
        if (localPart.length <= 2) return email;
        const firstChar = localPart[0];
        const lastChar = localPart[localPart.length - 1];
        const masked = firstChar + '*'.repeat(Math.min(localPart.length - 2, 20)) + lastChar;
        return masked + '@' + domain;
    };

    // Reset Forgot Password State
    const handleBackToLogin = () => {
        setForgotPasswordStep(false);
        setResetStep('email');
        setResetEmail('');
        setResetOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({});
        setResetSuccess(false);
        setResetOtpTimerActive(false);
        setOtpTimerActive(false);
    };

    // Get password strength color
    const getStrengthColor = () => {
        if (passwordStrength <= 1) return 'bg-red-500';
        if (passwordStrength === 2) return 'bg-orange-500';
        if (passwordStrength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStrengthText = () => {
        if (passwordStrength <= 1) return 'Weak';
        if (passwordStrength === 2) return 'Fair';
        if (passwordStrength === 3) return 'Good';
        return 'Strong';
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            {/* Login Form Card */}
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Header with Green Wave at Bottom */}
                    <div className="relative bg-white overflow-hidden">
                        {/* Green Wave SVG Background */}
                        <div className="absolute bottom-0 left-0 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                                <path fill="#059669" fillOpacity="0.15" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full -mt-1" style={{ transform: 'scaleY(-1)' }}>
                                <path fill="#059669" fillOpacity="0.10" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                        
                        {/* Decorative circles */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-100/30 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-100/30 rounded-full blur-3xl"></div>

                        {/* Content */}
                        <div className="relative z-10 p-8 md:p-10">
                            {/* Logo */}
                            <div className="flex justify-center mb-4">
                                <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                                    <img 
                                        src={ccdologo} 
                                        alt="City College of Cagayan de Oro logo" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            {/* Header Text - Below Logo */}
                            <div className="text-center">
                                <h1 className="text-xl md:text-2xl font-extrabold text-green-700 whitespace-nowrap font-sans tracking-wide">
                                    Content Management System
                                </h1>
                                <p className="text-gray-500 text-xs md:text-sm mt-1">
                                    City College of Cagayan de Oro
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 md:p-10">
                        {errors.general && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {errors.general}
                            </div>
                        )}

                        {resetSuccess && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm text-center">
                                Password reset successful! Redirecting to login...
                            </div>
                        )}

                        {/* Forgot Password Flow */}
                        {forgotPasswordStep ? (
                            <>
                                {resetStep === 'email' && (
                                    <form onSubmit={handleForgotPassword} className="space-y-5">
                                        <div className="text-center">
                                            <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Enter your email address and we'll send you a verification code.
                                            </p>
                                        </div>

                                        <div>
                                            <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="resetEmail"
                                                value={resetEmail}
                                                onChange={(e) => setResetEmail(e.target.value)}
                                                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition ${
                                                    errors.email ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                                placeholder="Enter your email address"
                                                disabled={loading}
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-green-800 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            disabled={loading || !resetEmail}
                                        >
                                            {loading ? 'Sending...' : 'Send Verification Code'}
                                        </button>

                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={handleBackToLogin}
                                                className="text-sm text-green-700 hover:text-green-800 font-medium transition"
                                                disabled={loading}
                                            >
                                                Back to Login
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {resetStep === 'otp' && (
                                    <form onSubmit={handleResetOtpSubmit} className="space-y-6">
                                        <div className="text-center">
                                            <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
                                            <p className="mt-2 text-sm text-gray-500">
                                                We've sent a 6-digit verification code to
                                            </p>
                                            <p className="text-sm text-gray-700 font-medium mt-1">
                                                {maskEmail(resetEmail)}
                                            </p>
                                        </div>

                                        <div>
                                            <label htmlFor="resetOtp" className="block text-sm font-medium text-gray-700 mb-2">
                                                Verification Code
                                            </label>
                                            <input
                                                type="text"
                                                id="resetOtp"
                                                inputMode="numeric"
                                                autoComplete="one-time-code"
                                                maxLength={6}
                                                value={resetOtp}
                                                onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ''))}
                                                placeholder="000000"
                                                className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-800 text-center text-2xl tracking-[0.5em] focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition ${
                                                    errors.otp ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                                disabled={loading}
                                            />
                                            {errors.otp && <p className="mt-2 text-sm text-red-600">{errorMessage(errors.otp)}</p>}
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs text-gray-400">
                                                    Enter the 6-digit code sent to your email.
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className={`text-sm font-medium ${resetOtpTimer <= 60 ? 'text-red-600' : 'text-gray-600'}`}>
                                                        {formatTime(resetOtpTimer)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-green-800 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            disabled={loading || resetOtp.length !== 6 || resetOtpTimer === 0}
                                        >
                                            {loading ? 'Verifying...' : 'Verify Code'}
                                        </button>

                                        <div className="flex items-center justify-center gap-6 pt-2">
                                            <button
                                                type="button"
                                                onClick={handleResendResetOtp}
                                                className={`text-sm font-medium transition ${
                                                    canResendResetOtp && !loading
                                                        ? 'text-green-700 hover:text-green-800'
                                                        : 'text-gray-400 cursor-not-allowed'
                                                }`}
                                                disabled={loading || !canResendResetOtp}
                                            >
                                                Resend Code {!canResendResetOtp && `(${formatTime(resetOtpTimer)})`}
                                            </button>
                                            <span className="text-gray-300">|</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setResetStep('email');
                                                    setResetOtp('');
                                                    setErrors({});
                                                    setResetOtpTimerActive(false);
                                                }}
                                                className="text-sm text-gray-500 hover:text-gray-700 font-medium transition"
                                                disabled={loading}
                                            >
                                                Change Email
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {resetStep === 'password' && (
                                    <form onSubmit={handleResetPassword} className="space-y-5">
                                        <div className="text-center">
                                            <h2 className="text-2xl font-bold text-gray-800">Create New Password</h2>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Enter your new password below.
                                            </p>
                                        </div>

                                        <div>
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showResetPassword ? "text" : "password"}
                                                    id="newPassword"
                                                    value={newPassword}
                                                    onChange={(e) => {
                                                        setNewPassword(e.target.value);
                                                        checkPasswordStrength(e.target.value);
                                                    }}
                                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition ${
                                                        errors.password ? 'border-red-500' : 'border-gray-200'
                                                    }`}
                                                    placeholder="Enter new password"
                                                    disabled={loading}
                                                    required
                                                    minLength={8}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowResetPassword(!showResetPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                    disabled={loading}
                                                >
                                                    {showResetPassword ? (
                                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            {newPassword && (
                                                <div className="mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                            <div 
                                                                className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                                                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-600">{getStrengthText()}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Password must be at least 8 characters with uppercase, lowercase, number and special character.
                                                    </p>
                                                </div>
                                            )}
                                            {errors.password && (
                                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    id="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition ${
                                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                                                    }`}
                                                    placeholder="Confirm new password"
                                                    disabled={loading}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                    disabled={loading}
                                                >
                                                    {showConfirmPassword ? (
                                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-green-800 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            disabled={loading || !newPassword || !confirmPassword || newPassword.length < 8 || passwordStrength < 3}
                                        >
                                            {loading ? 'Resetting...' : 'Reset Password'}
                                        </button>

                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={handleBackToLogin}
                                                className="text-sm text-green-700 hover:text-green-800 font-medium transition"
                                                disabled={loading}
                                            >
                                                Back to Login
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        ) : otpStep ? (
                            // Login OTP Verification
                            <form onSubmit={handleOtpSubmit} className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        We've sent a 6-digit verification code to
                                    </p>
                                    <p className="text-sm text-gray-700 font-medium mt-1">
                                        {maskEmail(email)}
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        id="otp"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        placeholder="000000"
                                        className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-800 text-center text-2xl tracking-[0.5em] focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition ${
                                            errors.otp ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                        disabled={loading}
                                    />
                                    {errors.otp && <p className="mt-2 text-sm text-red-600">{errorMessage(errors.otp)}</p>}
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-xs text-gray-400">
                                            Enter the 6-digit code sent to your email.
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className={`text-sm font-medium ${otpTimer <= 60 ? 'text-red-600' : 'text-gray-600'}`}>
                                                {formatTime(otpTimer)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-green-800 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    disabled={loading || otp.length !== 6 || otpTimer === 0}
                                >
                                    {loading ? 'Verifying...' : 'Verify'}
                                </button>

                                <div className="flex items-center justify-center gap-6 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className={`text-sm font-medium transition ${
                                            canResendOtp && !loading
                                                ? 'text-green-700 hover:text-green-800'
                                                : 'text-gray-400 cursor-not-allowed'
                                        }`}
                                        disabled={loading || !canResendOtp}
                                    >
                                        Resend Code {!canResendOtp && `(${formatTime(otpTimer)})`}
                                    </button>
                                    <span className="text-gray-300">|</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOtpStep(false);
                                            setOtp('');
                                            setErrors({});
                                            setOtpTimerActive(false);
                                        }}
                                        className="text-sm text-gray-500 hover:text-gray-700 font-medium transition"
                                        disabled={loading}
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // Login Form
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email or Username
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition ${
                                            errors.email ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                        placeholder="Enter your email or username"
                                        disabled={loading}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition ${
                                                errors.password ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                            placeholder="Enter your password"
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            disabled={loading}
                                        >
                                            {showPassword ? (
                                                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            disabled={loading}
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForgotPasswordStep(true);
                                            setResetStep('email');
                                            setErrors({});
                                        }}
                                        className="text-sm text-green-700 hover:text-green-800 font-medium transition"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-green-800 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center text-gray-400 text-xs mt-6">
                    &copy; {new Date().getFullYear()} City College of Cagayan de Oro. All rights reserved.
                </p>
            </div>
        </div>
    );
}