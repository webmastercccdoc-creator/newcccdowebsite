import { Link } from "@inertiajs/react";
import logoSrc from "../../assets/logos/cccdoclogo.png";
import cdoLogoSrc from "../../assets/logos/cdoc-logo.png";
import npcDpoSrc from "../../assets/logos/npc_dpo_2026_1.png";
import tstiLogoSrc from "../../assets/logos/tsti-logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="mt-auto w-full bg-gradient-to-r from-green-800 via-green-700 to-green-800 font-sans"
            role="contentinfo"
        >
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-12 py-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: College Info */}
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <div className="h-24 w-48 flex items-center justify-center pl-2 -mt-1">
                                <img
                                    src={logoSrc}
                                    alt="College Logo"
                                    className="h-full w-full object-contain brightness-110 drop-shadow-lg"
                                />
                            </div>
                        </div>
                        <p className="text-sm text-white leading-relaxed max-w-xs font-medium">
                            Aim higher, where students soar to achieve greater
                            heights in learning, nurturing their potential and
                            aspirations.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-sans font-bold text-white mb-4 text-lg border-b border-white/40 pb-2">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/about"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/apply"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Admissions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/campus-life"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Campus Life
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/library"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Library
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h3 className="font-sans font-bold text-white mb-4 text-lg border-b border-white/40 pb-2">
                            Resources
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="https://aims.citycollegecdo.edu.ph/login-student"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Student Portal
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="/faculty-staff" className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300">
                                    Faculty & Staff
                                </Link>
                            </li> */}
                            {/* <li>
                                <Link
                                    href="/alumni"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Alumni
                                </Link>
                            </li> */}
                            <li>
                                <Link
                                    href="/url-shortener"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    URL Shortener
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/incident-report"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Incident Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/downloadable-forms"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Downloadable Forms
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Government Links & Logos */}
                    <div>
                        <h3 className="font-sans font-bold text-white mb-4 text-lg border-b border-white/40 pb-2">
                            Government Links
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="http://www.ched.gov.ph/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Commission on Higher Education
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.cagayandeoro.gov.ph/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    City Government of Cagayan de Oro
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tesda.gov.ph/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Technical Education and Skills Development Authority (TESDA)
                                </a>
                            </li>
                            <li className="pt-4 mt-2 border-t border-green-600/30">
                                <div className="flex flex-row items-center justify-start space-x-4 pt-2">
                                    <div className="h-20 w-auto flex items-center justify-center">
                                        <img
                                            src={cdoLogoSrc}
                                            alt="Cagayan de Oro City Logo"
                                            className="h-full w-auto object-contain brightness-110 drop-shadow-md"
                                        />
                                    </div>
                                    <div className="h-20 w-auto flex items-center justify-center">
                                        <img
                                            src={npcDpoSrc}
                                            alt="NPC DPO 2026"
                                            className="h-full w-auto object-contain brightness-110 drop-shadow-md"
                                        />
                                    </div>
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
                <div className="w-full bg-white border-t border-green-200 py-4 px-6 flex items-center justify-center rounded-t-xl mt-6">
                    <p className="font-sans text-sm text-slate-700 text-center font-medium tracking-wide">
                        &copy; {currentYear} City College of Cagayan de Oro. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
