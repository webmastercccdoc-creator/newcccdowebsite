import { Link } from '@inertiajs/react';
import logoSrc from '../../assets/logos/cccdoclogo.png';
import cdoLogoSrc from '../../assets/logos/cdoc-logo.png';
import npcDpoSrc from '../../assets/logos/npc_dpo_2026_1.png';
import tstiLogoSrc from '../../assets/logos/tsti-logo.png'; // Add this import

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="mt-auto w-full bg-gradient-to-r from-green-800 via-green-700 to-green-800" role="contentinfo">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-12 py-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Column 1: College Info */}
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <div className="h-24 w-48 flex items-center justify-center pl-2 -mt-1">
                                <img src={logoSrc} alt="College Logo" className="h-full w-full object-contain brightness-110 drop-shadow-lg" />
                            </div>
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed max-w-xs font-medium">
                            Aim higher, where students soar to achieve greater heights in learning, nurturing their potential and aspirations.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-bold text-white mb-6 flex items-center text-lg">
                            <span className="w-1.5 h-7 bg-gradient-to-b from-green-400 to-green-600 rounded-full mr-3"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/about" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/admissions" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Admissions
                                </Link>
                            </li>
                            <li>
                                <Link href="/campus-life" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Campus Life
                                </Link>
                            </li>
                            <li>
                                <Link href="/library" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Library
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources - First 4 items */}
                    <div className="lg:mr-[-40px] xl:mr-[-50px]">
                        <h3 className="font-bold text-white mb-6 flex items-center text-lg">
                            <span className="w-1.5 h-7 bg-gradient-to-b from-green-400 to-green-600 rounded-full mr-3"></span>
                            Resources
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/student-portal" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Student Portal
                                </Link>
                            </li>
                            <li>
                                <Link href="/faculty-staff" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Faculty & Staff
                                </Link>
                            </li>
                            <li>
                                <Link href="/alumni" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Alumni
                                </Link>
                            </li>
                            <li>
                                <Link href="/url-shortener" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> URL Shortener
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Resources Continued (no header) */}
                    <div className="lg:ml-[-40px] xl:ml-[-50px]">
                        <ul className="space-y-3 text-sm pt-14">
                            <li>
                                <Link href="/incident-report" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Incident Report
                                </Link>
                            </li>
                            <li>
                                <Link href="/downloadable-forms" className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Downloadable Forms
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 5: Government Links & Logos */}
                    <div>
                        <h3 className="font-bold text-white mb-6 flex items-center text-lg">
                            <span className="w-1.5 h-7 bg-gradient-to-b from-green-400 to-green-600 rounded-full mr-3"></span>
                            Government Links
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a 
                                    href="http://www.ched.gov.ph/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group"
                                >
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> Commission on Higher Education
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://www.cagayandeoro.gov.ph/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white/85 hover:text-green-300 transition-all duration-300 hover:translate-x-2 inline-block font-medium group"
                                >
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> City Government of Cagayan de Oro
                                </a>
                            </li>
                            <li className="pt-4 mt-2 border-t border-green-600/30">
                                <div className="flex flex-row items-center justify-start space-x-4 pt-2">
                                    <div className="h-16 w-auto flex items-center justify-center">
                                        <img src={cdoLogoSrc} alt="Cagayan de Oro City Logo" className="h-full w-auto object-contain brightness-110 drop-shadow-md" />
                                    </div>
                                    <div className="h-20 w-auto flex items-center justify-center">
                                        <img 
                                            src={npcDpoSrc} 
                                            alt="NPC DPO 2026" 
                                            className="h-full w-auto object-contain brightness-110 drop-shadow-md" 
                                        />
                                    </div>
                                    {/* Add TSTI Logo here */}
                                    <div className="h-20 w-auto flex items-center justify-center">
                                        <img 
                                            src={tstiLogoSrc} 
                                            alt="TSTI Logo" 
                                            className="h-full w-auto object-contain brightness-110 drop-shadow-md" 
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Decorative Divider */}
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-green-600/40"></div>
                    </div>
                </div>

                {/* Bottom Bar - Light Green Design */}
                <div className="w-full bg-white border-t border-green-200 py-4 px-6 md:flex md:items-center md:justify-between rounded-t-xl mt-6">
                    <p className="text-sm text-slate-700 text-center md:text-left font-medium tracking-wide">
                        &copy; {currentYear} City College of Cagayan de Oro. All rights reserved.
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-6 md:mt-0 md:justify-end">
                        <Link href="/privacy" className="text-sm text-slate-700 hover:text-green-700 transition-all duration-300 font-medium hover:underline">
                            Privacy Policy
                        </Link>
                        <span className="text-green-300">|</span>
                        <Link href="/terms" className="text-sm text-slate-700 hover:text-green-700 transition-all duration-300 font-medium hover:underline">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;