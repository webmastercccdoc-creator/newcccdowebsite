import { useEffect, useState } from 'react';
import ccdologo from '../../assets/logos/ccdologo.png';

export default function Login() {
    useEffect(() => {
        document.title = "Login - City College of Cagayan de Oro";
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Left Side - Image/Info */}
                <div className="hidden lg:flex bg-gradient-to-br from-green-700 to-green-900 p-12 flex-col justify-between relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Logo */}
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 overflow-hidden shadow-lg">
                            <img src={ccdologo} alt="City College of Cagayan de Oro logo" className="w-full h-full object-contain p-2" />
                        </div>
                        
                        <h2 className="text-3xl font-bold text-white mb-4">Content Management System</h2>
                        <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                            Welcome to the City College of Cagayan de Oro Content Management System. 
                            Manage your content efficiently and effectively.
                        </p>
                    </div>

                    <div className="relative z-10 text-center">
                        <p className="text-white/30 text-xs">
                            &copy; {new Date().getFullYear()} City College of Cagayan de Oro
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                        <p className="text-gray-500 mt-1">Sign in to your account</p>
                    </div>

                    <form className="space-y-5">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-green-700 hover:text-green-800 font-medium transition">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-green-800 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            Login
                        </button>
                    </form>
                </div>

                {/* Mobile - Image/Info (visible on mobile) */}
                <div className="lg:hidden bg-gradient-to-br from-green-700 to-green-900 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-lg">
                        <img src={ccdologo} alt="City College of Cagayan de Oro logo" className="w-full h-full object-contain p-2" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Content Management System</h2>
                    <p className="text-white/70 text-xs">
                        Welcome to the City College of Cagayan de Oro CMS
                    </p>
                </div>
            </div>
        </div>
    );
}