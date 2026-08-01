import { Link } from '@inertiajs/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="mt-auto bg-green-700 border-t border-green-600" role="contentinfo">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: College Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md">
                                <span className="text-green-700 text-sm font-bold">CC</span>
                            </div>
                            <h2 className="text-xl font-bold text-white">City College of Cagayan de Oro</h2>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed">
                            Empowering minds, shaping futures since 1990. 
                            Committed to excellence in education and research.
                        </p>
                        <div className="flex space-x-3">
                            <a 
                                href="#" 
                                className="text-white/60 hover:text-green-200 transition-colors hover:scale-110 transform duration-200"
                                aria-label="Facebook"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a 
                                href="#" 
                                className="text-white/60 hover:text-green-200 transition-colors hover:scale-110 transform duration-200"
                                aria-label="Twitter"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.273-4.659 13.876 13.876 0 001.984-7.14c0-.262-.006-.524-.018-.785A9.93 9.93 0 0024 4.557z"/>
                                </svg>
                            </a>
                            <a 
                                href="#" 
                                className="text-white/60 hover:text-green-200 transition-colors hover:scale-110 transform duration-200"
                                aria-label="LinkedIn"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a 
                                href="#" 
                                className="text-white/60 hover:text-green-200 transition-colors hover:scale-110 transform duration-200"
                                aria-label="YouTube"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a 
                                href="#" 
                                className="text-white/60 hover:text-green-200 transition-colors hover:scale-110 transform duration-200"
                                aria-label="Instagram"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-semibold text-green-200 mb-4 flex items-center">
                            <span className="w-1 h-6 bg-green-400 rounded-full mr-2"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/about" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/academics" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Academics
                                </Link>
                            </li>
                            <li>
                                <Link href="/admissions" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Admissions
                                </Link>
                            </li>
                            <li>
                                <Link href="/campus-life" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Campus Life
                                </Link>
                            </li>
                            <li>
                                <Link href="/library" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Library
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h3 className="font-semibold text-green-200 mb-4 flex items-center">
                            <span className="w-1 h-6 bg-green-400 rounded-full mr-2"></span>
                            Resources
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/student-portal" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Student Portal
                                </Link>
                            </li>
                            <li>
                                <Link href="/faculty-staff" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Faculty & Staff
                                </Link>
                            </li>
                            <li>
                                <Link href="/alumni" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Alumni
                                </Link>
                            </li>
                            <li>
                                <Link href="/career-services" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Career Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="text-white/80 hover:text-green-200 transition-colors hover:pl-1 duration-200">
                                    Events Calendar
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h3 className="font-semibold text-green-200 mb-4 flex items-center">
                            <span className="w-1 h-6 bg-green-400 rounded-full mr-2"></span>
                            Get in Touch
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <svg className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-white/80">
                                    123 Education Drive<br />
                                    Campus City, ST 12345
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="h-5 w-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@college.edu" className="text-white/80 hover:text-green-200 transition-colors">
                                    info@college.edu
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="h-5 w-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+1234567890" className="text-white/80 hover:text-green-200 transition-colors">
                                    (123) 456-7890
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="h-5 w-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-white/80">Mon-Fri: 8:00 AM - 5:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-green-600 py-6 md:flex md:items-center md:justify-between">
                    <p className="text-sm text-white/60 text-center md:text-left">
                        &copy; {currentYear} City College of Cagayan de Oro. All rights reserved.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-4 md:mt-0 md:justify-end">
                        <Link href="/privacy" className="text-sm text-white/60 hover:text-green-200 transition-colors hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm text-white/60 hover:text-green-200 transition-colors hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="/accessibility" className="text-sm text-white/60 hover:text-green-200 transition-colors hover:underline">
                            Accessibility
                        </Link>
                        <Link href="/sitemap" className="text-sm text-white/60 hover:text-green-200 transition-colors hover:underline">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;