import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
  const { url } = usePage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Determine active item based on current URL
  const getActiveItem = () => {
    if (url.startsWith('/admin/articles')) return '/admin/articles';
    if (url.startsWith('/admin/approve-articles')) return '/admin/approve-articles';
    if (url.startsWith('/admin/promotions')) return '/admin/promotions';
    if (url.startsWith('/admin/events')) return '/admin/events';
    if (url.startsWith('/admin/users')) return '/admin/users';
    if (url.startsWith('/admin/settings')) return '/admin/settings';
    if (url.startsWith('/dashboard') || url === '/admin') return '/dashboard';
    return url;
  };

  const activeItem = getActiveItem();

  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      name: 'Articles', 
      href: '/admin/articles', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    { 
      name: 'Approve Articles', 
      href: '/admin/approve-articles', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: 'Promotions', 
      href: '/admin/promotions', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    { 
      name: 'Events', 
      href: '/admin/events', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'User Management', 
      href: '/admin/users', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <aside 
      className={`
        ${isCollapsed ? 'w-16' : 'w-56'} 
        min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300
      `}
      aria-label="CMS sidebar"
    >
      {/* Logo/Header with Collapse Button */}
      <div className={`
        flex items-center gap-2 px-4 py-5 border-b border-gray-200
        ${isCollapsed ? 'justify-center' : ''}
      `}>
        {!isCollapsed && (
          <>
            <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              C
            </div>
            <div className="flex-1 overflow-hidden whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-800">CMS</span>
              <p className="text-xs text-gray-500">Content Management System</p>
            </div>
          </>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            C
          </div>
        )}
        {/* Collapse Button - Hamburger Icon */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            flex items-center justify-center p-1.5 rounded-lg transition-all duration-200
            text-gray-400 hover:bg-gray-100 hover:text-gray-700
            ${isCollapsed ? 'mx-auto' : 'ml-auto'}
          `}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg 
            className="w-5 h-5 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4" aria-label="Main navigation">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm
                  ${activeItem === item.href    
                    ? 'bg-gray-800 text-white font-medium shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  } 
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                aria-current={activeItem === item.href ? 'page' : undefined}
                title={isCollapsed ? item.name : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}