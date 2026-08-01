import { useState, useEffect, useRef } from 'react';
import logoSrc from '../../assets/logos/cccdoclogo.png';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const hoverTimeoutRef = useRef(null);
    const dropdownRef = useRef(null);
    const menuItemRefs = useRef({});

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Check if click is on any menu item
                let isOnMenuItem = false;
                Object.values(menuItemRefs.current).forEach(ref => {
                    if (ref && ref.contains(event.target)) {
                        isOnMenuItem = true;
                    }
                });
                if (!isOnMenuItem) {
                    setOpenDropdown(null);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => document.removeEventListener('resize', handleResize);
    }, []);

    // Close dropdown on Escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setOpenDropdown(null);
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    const handleMouseEnter = (menu) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setOpenDropdown(menu);
    };

    const handleMouseLeave = (event) => {
        // Check if mouse is moving to dropdown
        const relatedTarget = event.relatedTarget;
        if (dropdownRef.current && dropdownRef.current.contains(relatedTarget)) {
            return;
        }
        
        // Check if mouse is moving to another menu item
        let isOnMenuItem = false;
        Object.values(menuItemRefs.current).forEach(ref => {
            if (ref && ref.contains(relatedTarget)) {
                isOnMenuItem = true;
            }
        });
        
        if (!isOnMenuItem) {
            hoverTimeoutRef.current = setTimeout(() => {
                setOpenDropdown(null);
            }, 200);
        }
    };

    const handleDropdownMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    };

    const handleDropdownMouseLeave = (event) => {
        const relatedTarget = event.relatedTarget;
        // Check if mouse is moving to any menu item
        let isOnMenuItem = false;
        Object.values(menuItemRefs.current).forEach(ref => {
            if (ref && ref.contains(relatedTarget)) {
                isOnMenuItem = true;
            }
        });
        
        if (!isOnMenuItem) {
            hoverTimeoutRef.current = setTimeout(() => {
                setOpenDropdown(null);
            }, 200);
        }
    };

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const navigationItems = [
        { name: 'Home', href: '/' },
        { 
            name: 'About', 
            href: '/about',
            dropdown: [
                { name: 'History', href: '/about/history', description: 'Our journey through the years' },
                { name: 'Mission & Vision', href: '/about/mission', description: 'Our guiding principles' },
                { name: 'Administration', href: '/about/administration', description: 'Meet our leadership team' },
                { name: 'Accreditation', href: '/about/accreditation', description: 'Quality assured education' },
            ]
        },
        { 
            name: 'Programs', 
            href: '/programs',
            dropdown: [
                { name: 'Undergraduate Programs', href: '/programs/undergraduate', description: 'Bachelor degree offerings' },
                { name: 'Graduate Programs', href: '/programs/graduate', description: 'Master and doctoral degrees' },
                { name: 'Continuing Education', href: '/programs/continuing', description: 'Lifelong learning opportunities' },
                { name: 'Certificate Courses', href: '/programs/certificate', description: 'Specialized short-term programs' },
                { name: 'Academic Calendar', href: '/programs/calendar', description: 'Important dates and schedules' },
            ]
        },
        { 
            name: 'News', 
            href: '/news',
            dropdown: [
                { name: 'Latest News', href: '/news/latest', description: 'Recent updates and stories' },
                { name: 'Upcoming Events', href: '/news/events', description: 'Calendar of activities' },
                { name: 'Announcements', href: '/news/announcements', description: 'Official college notices' },
                { name: 'Press Releases', href: '/news/press', description: 'Media and public statements' },
            ]
        },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav 
            className="bg-green-800 shadow-lg sticky top-0 z-50 border-b border-green-700" 
            role="navigation" 
            aria-label="Main navigation"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                                <a 
                                    href="/" 
                                    className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200"
                                >
                                    <div className="h-14 w-40 flex items-center justify-center overflow-hidden">
                                        <img src={logoSrc} alt="College Logo" className="h-full w-full object-cover" />
                                    </div>
                                </a>
                            </div>
                    {/* Desktop Navigation */}
                    <div className="hidden xl:block">
                        <ul className="flex items-center space-x-1">
                            {navigationItems.map((item) => (
                                <li 
                                    key={item.name} 
                                    className="relative"
                                    ref={(el) => {
                                        if (el) {
                                            menuItemRefs.current[item.name] = el;
                                        }
                                    }}
                                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.dropdown ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(item.name)}
                                                className={`
                                                    flex items-center justify-center gap-1 rounded-lg px-5 py-2.5 text-sm font-medium 
                                                    transition-all duration-200 
                                                    text-white hover:bg-white/10 hover:text-green-300
                                                    min-w-[80px] text-center
                                                    ${openDropdown === item.name ? 'bg-white/10 text-green-300' : ''}
                                                `}
                                                aria-expanded={openDropdown === item.name}
                                                aria-haspopup="true"
                                            >
                                                {item.name}
                                                <svg 
                                                    className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {/* Landscape/Horizontal Dropdown - White Background, No Border Radius */}
                                            {openDropdown === item.name && (
                                                <div 
                                                    ref={dropdownRef}
                                                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-auto min-w-[720px] max-w-[900px] origin-top bg-white shadow-2xl ring-1 ring-green-100 transition-all duration-200 ease-out"
                                                    role="menu"
                                                    style={{
                                                        animation: 'slideDown 0.25s ease-out'
                                                    }}
                                                    onMouseEnter={handleDropdownMouseEnter}
                                                    onMouseLeave={handleDropdownMouseLeave}
                                                >
                                                    <div className="p-6">
                                                        {/* Dropdown Header */}
                                                        <div className="mb-4 pb-4 border-b border-green-100">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h3 className="text-lg font-bold text-green-800">
                                                                        {item.name}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-500 mt-0.5">
                                                                        {item.name === 'About' && 'Learn about our institution'}
                                                                        {item.name === 'Programs' && 'Explore our academic offerings'}
                                                                        {item.name === 'News' && 'Stay updated with latest news'}
                                                                    </p>
                                                                </div>
                                                                <div className="h-8 w-1 bg-gradient-to-b from-green-400 to-green-600"></div>
                                                            </div>
                                                        </div>

                                                        {/* Horizontal Grid Items with Descriptions - Grey Description */}
                                                        <div className="grid grid-cols-3 gap-3">
                                                            {item.dropdown.map((subItem) => (
                                                                <a
                                                                    key={subItem.name}
                                                                    href={subItem.href}
                                                                    className="group relative px-4 py-4 text-left transition-all duration-200 hover:bg-green-50 hover:text-green-800 border-2 border-transparent hover:border-green-200"
                                                                    role="menuitem"
                                                                    onClick={() => setOpenDropdown(null)}
                                                                >
                                                                    <div className="font-medium text-green-800 group-hover:font-semibold">
                                                                        {subItem.name}
                                                                    </div>
                                                                    {subItem.description && (
                                                                        <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-700">
                                                                            {subItem.description}
                                                                        </div>
                                                                    )}
                                                                    <div className="mt-2 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Dropdown Footer */}
                                                    <div className="border-t border-green-100 bg-green-50 p-4">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-green-700 font-medium">
                                                                Explore all {item.name}
                                                            </span>
                                                            <a 
                                                                href={item.href}
                                                                className="group flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                                                                onClick={() => setOpenDropdown(null)}
                                                            >
                                                                View All
                                                                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 hover:text-green-300 min-w-[80px] text-center"
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Side - White CTA Button */}
                    <div className="hidden xl:block">
                        <a
                            href="/apply"
                            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-green-700 transition-all duration-200 hover:bg-green-50 hover:shadow-lg hover:scale-105"
                        >
                            Apply Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="rounded-lg p-2 text-white hover:bg-white/10 hover:text-green-300 transition-colors xl:hidden"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu - Portrait for mobile only */}
                <div 
                    id="mobile-menu"
                    className={`
                        xl:hidden overflow-hidden transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    <div className="space-y-1 pb-4 pt-2">
                        {navigationItems.map((item) => (
                            <div key={item.name}>
                                {item.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className={`
                                                flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium
                                                transition-colors text-white hover:bg-white/10 hover:text-green-300
                                                ${openDropdown === item.name ? 'bg-white/10 text-green-300' : ''}
                                            `}
                                            aria-expanded={openDropdown === item.name}
                                        >
                                            {item.name}
                                            <svg 
                                                className={`h-5 w-5 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Mobile Sub-menu - White background for mobile */}
                                        <div className={`
                                            ml-4 space-y-1 overflow-hidden transition-all duration-200 bg-white shadow-md mt-1
                                            ${openDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                        `}>
                                            {item.dropdown.map((subItem) => (
                                                <a
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-4 py-2.5 text-sm text-green-700 transition-colors hover:bg-green-50 hover:text-green-800"
                                                    onClick={() => {
                                                        setOpenDropdown(null);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                >
                                                    <div className="font-medium">{subItem.name}</div>
                                                    {subItem.description && (
                                                        <div className="text-xs text-gray-500 mt-0.5">{subItem.description}</div>
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="block rounded-lg px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/10 hover:text-green-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                )}
                            </div>
                        ))}
                        
                        {/* Mobile CTA Button - White */}
                        <div className="pt-4">
                            <a
                                href="/apply"
                                className="block w-full rounded-full bg-white px-4 py-3 text-center font-semibold text-green-700 transition-all hover:bg-green-50 hover:shadow-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Apply Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-12px) scale(0.97) translateX(-50%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1) translateX(-50%);
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;