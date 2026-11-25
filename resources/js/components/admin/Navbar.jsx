import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
  const { auth } = usePage().props;
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const accountMenuRef = useRef(null);

  useEffect(() => {
    if (!isAccountMenuOpen) return undefined;

    const handleClickOutside = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccountMenuOpen]);

  const handleLogout = async () => {
    setLogoutError('');
    setIsLoggingOut(true);

    try {
      await axios.post('/logout');
      window.location.href = '/login-page';
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutError('Unable to log out. Please try again.');
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="mb-6 bg-white px-6 py-4 border-x-0 border-t-0 border-b border-gray-200 shadow-sm h-20 relative z-10">
      <div className="flex items-center justify-between h-full max-w-[1600px] mx-auto">
        {/* Left side - Brand Text */}
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 text-xl tracking-wide leading-tight">
            Content Management
          </span>
          <span className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">
            System Dashboard
          </span>
        </div>

        {/* Right side - Actions & User */}
        <div className="flex items-center gap-4">
          {/* User Profile */}
          <div className="relative" ref={accountMenuRef}>
            <button
              type="button"
              onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
              className="flex items-center gap-3 pl-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-lg"
              aria-label="Open account menu"
              aria-haspopup="menu"
              aria-expanded={isAccountMenuOpen}
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 group-hover:border-gray-400 transition-colors duration-200">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hidden xl:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                  {auth?.user?.name || 'Admin User'}
                </span>
                <span className="text-xs text-gray-500">
                  {auth?.user?.email || ''}
                </span>
              </div>
              <svg className="hidden xl:block w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isAccountMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                role="menu"
                aria-label="Account options"
              >
                {logoutError && (
                  <p className="px-4 py-2 text-sm text-red-600" role="alert">
                    {logoutError}
                  </p>
                )}
                <Link
                  href="/admin/settings"
                  onClick={() => setIsAccountMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  role="menuitem"
                >
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none disabled:cursor-wait disabled:opacity-60"
                  role="menuitem"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {isLoggingOut ? 'Signing out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}