import { useEffect, useState } from 'react';
import { router, Link } from '@inertiajs/react';
import ccdologo from '../../assets/logos/ccdoclogo.png';

export default function ForgotPassword() {
    useEffect(() => {
        document.title = "Forgot Password - City College of Cagayan de Oro";
    }, []);

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess(false);
        setLoading(true);

        try {
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    email: email,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setSuccess(true);
                setEmail('');
            } else {
                if (response.status === 419) {
                    setErrors({ general: 'Session expired. Please refresh the page and try again.' });
                } else if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setErrors({ general: data.message || 'Something went wrong. Please try again.' });
                }
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Wave Background */}
            <div className="absolute inset-0 z-0">
                <svg
                    className="absolute bottom-0 left-0 w-full"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    style={{ height: '60%' }}
                >
                    <path
                        fill="#22c55e"
                        fillOpacity="0.15"
                        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                    <path
                        fill="#22c55e"
                        fillOpacity="0.10"
                        d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,218.7C672,213,768,203,864,197.3C960,192,1056,192,1152,197.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                    <path
                        fill="#22c55e"
                        fillOpacity="0.07"
                        d="M0,288L48,282.7C96,277,192,267,288,261.3C384,256,480,256,576,256C672,256,768,256,864,256C960,256,1056,256,1152,256C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </div>

            {/* Header with Content Management System Text */}
            <div className="absolute top-0 left-0 right-0 z-10 text-center pt-8">
                <h1 className="text-2xl md:text-3xl font-bold text-green-700">
                    Content Management System
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    City College of Cagayan de Oro
                </p>
            </div>

            {/* Forgot Password Form Card */}
            <div className="relative z-10 w-full max-w-md mt-16">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="p-8 md:p-10">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                                <img src={ccdologo} alt="City College of Cagayan de Oro logo" className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
                            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                            </p>
                        </div>

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                                Password reset link has been sent to your email address.
                            </div>
                        )}

                        {errors.general && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition ${
                                        errors.email ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                    placeholder="Enter your email"
                                    disabled={loading || success}
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-green-800 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                disabled={loading || success}
                            >
                                {loading ? 'Sending...' : 'Email Password Reset Link'}
                            </button>

                            <div className="text-center mt-4">
                                <Link
                                    href="/login"
                                    className="text-sm text-green-700 hover:text-green-800 font-medium transition inline-flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Login
                                </Link>
                            </div>
                        </form>
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