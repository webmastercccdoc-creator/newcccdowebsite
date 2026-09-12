import { useState, useEffect, useRef } from 'react';
import logoSrc from '../../assets/logos/cccdoclogo2.png';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const hoverTimeoutRef = useRef(null);
    const dropdownRef = useRef(null);
    const menuItemRefs = useRef({});
    const mobileMenuRef = useRef(null);

    // Detect scroll for shadow and height effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
        return () => window.removeEventListener('resize', handleResize);
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

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleMouseEnter = (menu) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setOpenDropdown(menu);
    };

    const handleMouseLeave = (event) => {
        const relatedTarget = event.relatedTarget;
        if (dropdownRef.current && dropdownRef.current.contains(relatedTarget)) {
            return;
        }

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
            name: 'About Us',
            href: '/about',
            dropdown: [
                { name: 'Cagayan De Oro City', href: '/about/cagayan-de-oro-city', description: 'Discover the city of golden friendship' },
                { name: 'Message of the Mayor', href: '/about/mayors-message', description: 'A message from our city mayor' },
                { name: 'Mission & Vision', href: '/about/mission-vision', description: 'Our guiding principles and aspirations' },
                { name: 'Goals & Core Values', href: '/about/goals-core-values', description: 'The values that drive our institution' },
                // { name: 'Graduate Attributes', href: '/about/graduate-attributes', description: 'Characteristics expected of our graduates' },
                { name: 'Governing Board', href: '/about/governing-board', description: 'Meet our board of directors' },
                { name: 'Organizational Chart', href: '/about/organizational-chart', description: 'View our organizational structure' },
            ]
        },
        {
            name: 'Clusters',
            href: '/Offices',
            dropdown: [
                { name: 'Office of the President', href: '/offices/president', description: 'Executive leadership and overall institutional direction' },
                { name: 'Office of the Vice President for Academic Affairs', href: '/offices/vp-academic-affairs', description: 'Oversight of academic programs, curriculum, and faculty development' },
                { name: 'Office of the Vice President for Administration and Finance', href: '/offices/vp-administration-finance', description: 'Management of administrative services, budget, and financial resources' },
                { name: 'Office of the Vice President for Research and Extension', href: '/offices/vp-research-extension', description: 'Research initiatives, innovation, extension services, and scholarly activities' },
            ]
        },
        {
            name: 'Academic Programs',
            href: '/Programs',
            dropdown: [
                { name: 'College of Education', href: '/programs/college-of-education', description: 'Teacher education and development programs' },
                { name: 'College of Arts and Sciences', href: '/programs/college-of-arts-and-sciences', description: 'Liberal arts, sciences, and humanities' },
                { name: 'College of Business and Management', href: '/programs/college-of-business-and-management', description: 'Business administration and management' },
                { name: 'Technical Skill & Technology Institute', href: '/programs/technical-skill-technology', description: 'Technical and vocational education' },
            ]
        },
        {
            name: 'Research',
            href: 'https://sites.google.com/view/ritts-cccdo/home',
        },
        {
            name: 'Extension',
            href: '/extension',
            dropdown: [
                { name: 'Community Extension', href: '/extension/community', description: 'Community extension programs' },
                { name: 'Outreach and Volunteerism', href: '/extension/outreach', description: 'Outreach and volunteer opportunities' },
                { name: 'Advocacy-Based Centers', href: '/extension/advocacy', description: 'Advocacy and community-based initiatives' },
            ]
        },
        {
            name: 'SDG & Internationalization',
            href: '/internationalization',
            dropdown: [
                { name: 'Sustainable Development Goals', href: '/internationalization/sdg', description: 'Contributing to global sustainability goals' },
                { name: 'Times Higher Education', href: '/internationalization/the', description: 'World university rankings and impact' },
                { name: 'World Universities with Real Impact', href: '/internationalization/wuri', description: 'Innovative and impactful university initiatives' },
                { name: 'UI GreenMetric', href: '/internationalization/ui-greenmetric', description: 'World university sustainability rankings and green campus initiatives' }
            ]
        },
        {
            name: 'News & Events',
            href: '/news',
            dropdown: [
                { name: 'Latest News', href: '/news/latest', description: 'Recent updates and stories' },
                { name: 'Upcoming Events', href: '/news/events', description: 'Calendar of activities' },
                { name: 'Newsletters', href: '/news/news-letters', description: 'Official college notices' }
            ]
        },
        { name: 'Contact Us', href: '/contact-us' },
    ];

    // Social media links
    const socialLinks = [
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/cccdofficial',
            icon: (className) => (
                <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            hoverColor: 'hover:text-[#1877F2]'
        },
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/cccdofficial',
            icon: (className) => (
                <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
            ),
            hoverColor: 'hover:text-[#E4405F]'
        },
        {
            name: 'TikTok',
            href: 'https://www.tiktok.com/@cccdofficial',
            icon: (className) => (
                <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
            ),
            hoverColor: 'hover:text-[#000000]'
        },
    ];

    return (
        <div className="sticky top-0 z-50">
            {/* TOP NAVBAR - Green Background */}
            <div
                className="w-full font-sans"
                style={{
                    backgroundColor: '#157D3C',
                    height: '36px',
                    borderBottom: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                <div className="w-full px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex h-full items-center justify-between">
                        {/* Left side - Contact info - Hidden on mobile, shown on md+ */}
                        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
                            <a
                                href="tel:+63888572333"
                                className="flex items-center gap-1.5 text-xs text-white hover:text-green-100 transition-colors duration-200"
                            >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +63 917 777 2946
                            </a>
                            <span className="text-white/30">|</span>
                            <a
                                href="mailto:info@cccdoc.edu.ph"
                                className="flex items-center gap-1.5 text-xs text-white hover:text-green-100 transition-colors duration-200"
                            >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                ict.citycollege.cdo@gmail.com
                            </a>
                            <span className="text-white/30 hidden lg:inline">|</span>
                            <span className="flex items-center gap-1.5 text-xs text-white hidden lg:flex">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Zone 2, Agusan, Cagayan de Oro, Philippines, 9000
                            </span>
                        </div>

                        {/* Mobile: Only show phone and email */}
                        <div className="flex md:hidden items-center space-x-3">
                            <a
                                href="tel:+63888572333"
                                className="flex items-center gap-1 text-xs text-white hover:text-green-100 transition-colors duration-200"
                                aria-label="Call us"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-[10px]">+63 917 777 2946</span>
                            </a>
                            <span className="text-white/30">|</span>
                            <a
                                href="mailto:info@cccdoc.edu.ph"
                                className="flex items-center gap-1 text-xs text-white hover:text-green-100 transition-colors duration-200"
                                aria-label="Email us"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[10px]">ict.citycollege.cdo@gmail.com</span>
                            </a>
                        </div>

                        {/* Right side - Social Icons and Enroll Now Button */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Social Media Icons - Always visible */}
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center text-white/90 ${social.hoverColor} transition-colors duration-200`}
                                    aria-label={social.name}
                                >
                                    {social.icon('h-3.5 w-3.5 sm:h-4 sm:w-4')}
                                </a>
                            ))}

                            {/* Separator - Hidden on mobile, shown on sm+ */}
                            <span className="text-white/30 hidden sm:inline">|</span>

                            {/* Enroll Now Button - Hidden on mobile, shown on sm+ */}
                            <a
                                href="/apply"
                                className="hidden sm:flex items-center gap-1.5 rounded-full bg-white px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold text-green-700 transition-all duration-300 hover:bg-green-50 hover:shadow-md hover:scale-105"
                            >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Enroll Now
                            </a>

                            {/* Mobile only: Small Enroll Now text link */}
                            <a
                                href="/apply"
                                className="sm:hidden text-[10px] font-semibold text-white hover:text-green-100 transition-colors duration-200"
                            >
                                Enroll
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN NAVBAR - White Background */}
            <nav
                className={`
                    w-full flex-shrink-0 font-sans
                    transition-all duration-300 ease-in-out
                    ${isScrolled
                        ? 'shadow-2xl bg-white/95 backdrop-blur-sm'
                        : 'shadow-xl bg-white'
                    }
                `}
                style={{
                    backgroundColor: '#ffffff',
                    height: '80px',
                }}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="w-full px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex h-full items-center justify-between w-full">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a
                                href="/"
                                className="flex items-center hover:opacity-90 transition-opacity duration-200"
                            >
                                <div className={`
                                    flex items-center justify-center overflow-hidden
                                    transition-all duration-300
                                    ${isScrolled ? 'h-10 w-36' : 'h-14 w-44'}
                                `}>
                                    <img src={logoSrc} alt="College Logo" className="h-full w-full object-cover" />
                                </div>
                            </a>
                        </div>

                        {/* Desktop Navigation - Maximized Space */}
                        <div className="hidden xl:flex xl:items-center xl:justify-between flex-1 ml-8">
                            <ul className="flex items-center space-x-1 lg:space-x-2 xl:space-x-2">
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
                                                        flex items-center justify-center gap-1 rounded-xl px-3 lg:px-4 xl:px-4 
                                                        transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                                                        text-black hover:bg-green-50 hover:text-black hover:shadow-lg
                                                        whitespace-nowrap font-sans
                                                        ${isScrolled ? 'text-sm py-2' : 'text-sm font-semibold py-2.5'}
                                                        ${openDropdown === item.name ? 'bg-green-50 text-black shadow-lg' : ''}
                                                    `}
                                                    aria-expanded={openDropdown === item.name}
                                                    aria-haspopup="true"
                                                >
                                                    {item.name}
                                                    <svg
                                                        className={`h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {/* Landscape/Horizontal Dropdown */}
                                                {openDropdown === item.name && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-auto min-w-[720px] max-w-[950px] origin-top bg-white/95 backdrop-blur-lg shadow-2xl ring-1 ring-gray-200 transition-all duration-300 ease-out rounded-xl font-sans"
                                                        role="menu"
                                                        style={{
                                                            animation: 'slideDown 0.25s ease-out'
                                                        }}
                                                        onMouseEnter={handleDropdownMouseEnter}
                                                        onMouseLeave={handleDropdownMouseLeave}
                                                    >
                                                        <div className="p-6">
                                                            {/* Dropdown Header */}
                                                            <div className="mb-5 pb-5 border-b border-green-200/60">
                                                                <div className="flex items-center justify-between">
                                                                    <div>
                                                                        <h3 className="text-xl font-bold text-green-800 tracking-tight font-sans">
                                                                            {item.name}
                                                                        </h3>
                                                                        <p className="text-sm text-gray-600 mt-1.5 font-medium font-sans">
                                                                            {item.name === 'About Us' && 'Learn about our institution'}
                                                                            {item.name === 'Programs' && 'Explore our academic offerings'}
                                                                            {item.name === 'Research' && 'Discover our research initiatives'}
                                                                            {item.name === 'Extension' && 'Community engagement and outreach'}
                                                                            {item.name === 'News' && 'Stay updated with latest news'}
                                                                        </p>
                                                                    </div>
                                                                    <div className="h-12 w-1.5 bg-gradient-to-b from-green-400 via-green-500 to-green-600 rounded-full shadow-lg"></div>
                                                                </div>
                                                            </div>

                                                            {/* Dynamic Grid Items based on dropdown count */}
                                                            <div
                                                                className="grid gap-4"
                                                                style={{ gridTemplateColumns: `repeat(${Math.min(item.dropdown.length, 3)}, minmax(0, 1fr))` }}
                                                            >
                                                                {item.dropdown.map((subItem) => (
                                                                    <a
                                                                        key={subItem.name}
                                                                        href={subItem.href}
                                                                        className="group relative px-5 py-4 text-left transition-all duration-300 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 hover:text-black border-2 border-transparent hover:border-green-300/60 rounded-xl hover:shadow-md font-sans"
                                                                        role="menuitem"
                                                                        onClick={() => setOpenDropdown(null)}
                                                                    >
                                                                        <div className="font-semibold text-black group-hover:text-black font-sans">
                                                                            {subItem.name}
                                                                        </div>
                                                                        {subItem.description && (
                                                                            <div className="text-xs text-gray-600 mt-2 group-hover:text-gray-800 leading-relaxed font-sans">
                                                                                {subItem.description}
                                                                            </div>
                                                                        )}
                                                                        <div className="mt-3 h-1 w-0 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 group-hover:w-full rounded-full"></div>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Dropdown Footer */}
                                                        <div className="border-t border-green-200/60 bg-gradient-to-r from-green-50/80 to-green-100/50 backdrop-blur-sm p-5">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm text-green-700 font-semibold tracking-wide font-sans">
                                                                    Browse all {item.name} →
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className={`
                                                    flex items-center justify-center rounded-xl px-3 lg:px-4 xl:px-4 
                                                    text-black transition-all duration-300 hover:bg-green-50 hover:text-black hover:shadow-lg 
                                                    whitespace-nowrap font-sans
                                                    ${isScrolled ? 'text-sm py-2' : 'text-sm font-semibold py-2.5'}
                                                `}
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Right Side - Empty */}
                            <div className="flex-shrink-0 ml-4">
                                {/* Enroll Now removed from here */}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="rounded-lg p-2 text-black hover:bg-green-50 hover:text-black transition-colors xl:hidden"
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

                    {/* Mobile Menu */}
                    <div
                        id="mobile-menu"
                        ref={mobileMenuRef}
                        className={`
                            xl:hidden overflow-hidden transition-all duration-300 ease-in-out
                            ${isMobileMenuOpen ? 'max-h-[calc(100vh-80px)] opacity-100' : 'max-h-0 opacity-0'}
                        `}
                    >
                        <div className="bg-white rounded-b-2xl shadow-2xl mt-2 pb-4 pt-2 overflow-y-auto max-h-[calc(100vh-100px)]">
                            {navigationItems.map((item) => (
                                <div key={item.name} className="px-3">
                                    {item.dropdown ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(item.name)}
                                                className={`
                                                    flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium
                                                    transition-colors text-black hover:bg-green-50 hover:text-black font-sans
                                                    ${openDropdown === item.name ? 'bg-green-50 text-black' : ''}
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

                                            {/* Mobile Sub-menu */}
                                            <div className={`
                                                ml-2 space-y-1 overflow-y-auto transition-all duration-200 bg-white shadow-inner rounded-lg
                                                ${openDropdown === item.name ? 'max-h-[400px] opacity-100 p-2' : 'max-h-0 opacity-0 p-0'}
                                            `}>
                                                {item.dropdown.map((subItem) => (
                                                    <a
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-4 py-3 text-sm text-black transition-colors hover:bg-green-50 hover:text-black rounded-lg font-sans border-b border-gray-100 last:border-b-0"
                                                        onClick={() => {
                                                            setOpenDropdown(null);
                                                            setIsMobileMenuOpen(false);
                                                        }}
                                                    >
                                                        <div className="font-medium font-sans">{subItem.name}</div>
                                                        {subItem.description && (
                                                            <div className="text-xs text-gray-500 mt-0.5 font-sans">{subItem.description}</div>
                                                        )}
                                                    </a>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith('http') ? '_blank' : undefined}
                                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="block rounded-lg px-4 py-3 text-base font-medium text-black transition-colors hover:bg-green-50 hover:text-black font-sans"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </div>
                            ))}

                            {/* Mobile CTA Button */}
                            <div className="px-3 pt-4 pb-2">
                                <a
                                    href="/apply"
                                    className="block w-full rounded-full bg-green-700 px-4 py-3 text-center font-semibold text-white transition-all hover:bg-green-800 hover:shadow-lg font-sans"
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
                    
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    .overflow-y-auto::-webkit-scrollbar {
                        width: 4px;
                    }
                    
                    .overflow-y-auto::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 4px;
                    }
                    
                    .overflow-y-auto::-webkit-scrollbar-thumb {
                        background: #157D3C;
                        border-radius: 4px;
                    }
                    
                    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                        background: #0f5f2e;
                    }
                `}</style>
            </nav>
        </div>
    );
};

export default Navbar;