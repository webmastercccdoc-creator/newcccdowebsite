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
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                router.visit('/admin');
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
                                    <img src={ccdologo} alt="City College of Cagayan de Oro logo" className="w-full h-full object-contain" />
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
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-green-700 hover:text-green-800 font-medium transition"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-green-800 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
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