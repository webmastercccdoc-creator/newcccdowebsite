import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, router, usePage } from '@inertiajs/react';

// Create a singleton cache outside the component
let cachedMenus = null;
let isMenusFetching = false;
let menusFetchPromise = null;

export default function Sidebar() {
  const { url } = usePage();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menus, setMenus] = useState(cachedMenus || []);
  const [articleCounts, setArticleCounts] = useState({ pending: 0, rejected: 0 });
  const [urlCounts, setUrlCounts] = useState({ pending: 0, rejected: 0 });
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(!cachedMenus);

  const effectivePendingCount = Number(articleCounts.pending || 0);
  const hasPendingArticles = effectivePendingCount > 0;
  const effectivePendingUrlCount = Number(urlCounts.pending || 0);
  const hasPendingUrls = effectivePendingUrlCount > 0;

  // Fetch user permissions and menus - using cached data
  useEffect(() => {
    if (cachedMenus) {
      setMenus(cachedMenus);
      setIsLoading(false);
      return;
    }

    if (menusFetchPromise) {
      menusFetchPromise.then(data => {
        if (data) {
          cachedMenus = data;
          setMenus(data);
          setIsLoading(false);
        }
      });
      return;
    }

    isMenusFetching = true;
    menusFetchPromise = (async () => {
      try {
        const response = await axios.get('/user/permissions');
        if (response.data.authenticated) {
          const menuData = response.data.menus || [];
          cachedMenus = menuData;
          setMenus(menuData);
          setIsLoading(false);
          return menuData;
        }
      } catch (error) {
        console.error('Failed to fetch user permissions:', error);
        const fallbackMenus = [
          { id: 'dashboard', name: 'Dashboard', route: '/dashboard' },
          { id: 'articles', name: 'Articles', route: '/admin/articles' }
        ];
        cachedMenus = fallbackMenus;
        setMenus(fallbackMenus);
        setIsLoading(false);
        return fallbackMenus;
      } finally {
        isMenusFetching = false;
        menusFetchPromise = null;
      }
    })();
  }, []);

  // Fetch article counts for pending articles
  useEffect(() => {
    if (!menus.length) return;

    const hasApprovePermission = menus.some(menu => menu.id === 'approve_articles');
    const hasShortenUrlPermission = menus.some(menu => menu.id === 'shorten_url');

    if (hasApprovePermission) {
      const fetchArticleCounts = async () => {
        try {
          const response = await axios.get('/admin/articles/status-counts');
          const counts = response?.data?.counts || { pending: 0, rejected: 0 };
          setArticleCounts({
            pending: Number(counts.pending || 0),
            rejected: Number(counts.rejected || 0),
          });
        } catch (error) {
          console.error('Failed to load article counts:', error);
          setArticleCounts({ pending: 0, rejected: 0 });
        }
      };

      fetchArticleCounts();
    }

    if (hasShortenUrlPermission) {
      const fetchUrlCounts = async () => {
        try {
          const response = await axios.get('/admin/shorten-url/status-counts');
          const counts = response?.data?.counts || { pending: 0, rejected: 0 };
          setUrlCounts({
            pending: Number(counts.pending || 0),
            rejected: Number(counts.rejected || 0),
          });
        } catch (error) {
          console.error('Failed to load shortened URL counts:', error);
          setUrlCounts({ pending: 0, rejected: 0 });
        }
      };

      fetchUrlCounts();
    }
  }, [menus]);

  // Shake animation every 2 seconds (only if there are pending articles)
  useEffect(() => {
    if (hasPendingArticles) {
      const interval = setInterval(() => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [hasPendingArticles]);

  // Determine active item based on current URL
  const getActiveItem = () => {
    if (url.startsWith('/admin/articles')) return '/admin/articles';
    if (url.startsWith('/admin/approve-articles')) return '/admin/approve-articles';
    if (url.startsWith('/admin/shorten-url')) return '/admin/shorten-url';
    if (url.startsWith('/admin/promotions')) return '/admin/promotions';
    if (url.startsWith('/admin/events')) return '/admin/events';
    if (url.startsWith('/admin/research')) return '/admin/research';
    if (url.startsWith('/admin/content')) return '/admin/content';
    if (url.startsWith('/admin/users')) return '/admin/usersmanagement';
    if (url.startsWith('/admin/settings')) return '/admin/settings';
    if (url.startsWith('/dashboard') || url === '/admin') return '/dashboard';
     if (url.startsWith('/account-settings') || url === '/admin') return '/dashboard';
    return url;
  };

  const activeItem = getActiveItem();

  // Map menu IDs to icons and routes
  const menuConfig = {
    dashboard: {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    articles: {
      name: 'Articles',
      href: '/admin/articles',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    approve_articles: {
      name: 'Approve Articles',
      href: '/admin/approve-articles',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    shorten_url: {
      name: 'Shorten URL',
      href: '/admin/shorten-url',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    promotions: {
      name: 'Promotions',
      href: '/admin/promotions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    events: {
      name: 'Events',
      href: '/admin/events',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    research: {
      name: 'Research',
      href: '/admin/research',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    content: {
      name: 'Content',
      href: '/admin/content',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    account_settings: {
      name: 'Account Settings',
      href: '/admin/account-settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    user_management: {
      name: 'User Management',
      href: '/admin/usersmanagement',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    settings: {
      name: 'Settings',
      href: '/admin/settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  };

  // Group menu IDs into sections
  const menuGroups = [
    {
      id: 'overview',
      title: 'Overview',
      items: ['dashboard']
    },
    {
      id: 'content',
      title: 'Content Management',
      items: ['articles', 'approve_articles', 'shorten_url', 'promotions', 'events', 'research', 'content']
    },
    {
      id: 'admin',
      title: 'Administration',
      items: ['user_management', 'settings', 'account_settings']
    }
  ];

  // Build grouped nav items from menus
  const groupedNavItems = menuGroups.map(group => {
    const items = group.items
      .map(id => {
        const menu = menus.find(m => m.id === id);
        if (!menu) return null;
        const config = menuConfig[id];
        if (!config) return null;
        return {
          name: config.name,
          href: config.href,
          icon: config.icon,
          id: id
        };
      })
      .filter(Boolean);

    return {
      ...group,
      items
    };
  }).filter(group => group.items.length > 0);

  return (
    <aside
      className={`
        hidden lg:flex
        bg-white border-r border-gray-200 shadow-xl
        h-screen flex-col
        transition-[width] duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
      aria-label="CMS sidebar"
    >
      {/* Header - Admin Panel */}
      <div className={`
        flex items-center px-4 py-5
        ${isCollapsed ? 'justify-center' : 'justify-between'}
        bg-white border-b border-gray-200 flex-shrink-0
        transition-all duration-300 ease-in-out
      `}>
        <span
          className={`
            text-lg font-semibold text-gray-800 whitespace-nowrap flex-1 text-center
            transition-all duration-300 ease-in-out origin-left
            ${isCollapsed
              ? 'opacity-0 max-w-0 -translate-x-4 pointer-events-none overflow-hidden'
              : 'opacity-100 max-w-[200px] translate-x-0'
            }
          `}
        >
          Admin Panel
        </span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            hidden md:flex items-center justify-center p-2 rounded-lg
            text-gray-600 hover:bg-gray-100 hover:text-gray-900
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'mx-auto' : ''}
          `}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`
              w-6 h-6 flex-shrink-0
              transition-transform duration-300 ease-in-out
            `}
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

      {/* Navigation - Grouped */}
      <nav className={`flex-1 px-3 py-4 ${isCollapsed ? 'overflow-hidden' : 'overflow-y-auto'} transition-all duration-300`} aria-label="Main navigation">
        <div className="space-y-6">
          {groupedNavItems.map((group) => (
            <div key={group.id}>
              {/* Group Title */}
              <div className={`
                px-3 mb-2
                transition-all duration-300 ease-in-out
                ${isCollapsed
                  ? 'opacity-0 max-h-0 overflow-hidden mb-0'
                  : 'opacity-100 max-h-10'
                }
              `}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>

              {/* Collapsed mode divider */}
              {isCollapsed && (
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-px bg-gray-200" />
                </div>
              )}

              {/* Group Items */}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id} className="relative">
                    {(() => {
                      const NavItem = Link;

                      return <NavItem
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        router.visit(item.href, {
                          preserveScroll: true,
                          preserveState: true,
                          replace: false,
                        });
                      }}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium group
                        ${activeItem === item.href
                          ? 'bg-green-800 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                        }
                        ${isCollapsed ? 'justify-center gap-0' : 'justify-start'}
                        transition-all duration-300 ease-in-out
                        relative
                      `}
                      aria-current={activeItem === item.href ? 'page' : undefined}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <span className={`
                        flex-shrink-0 flex items-center justify-center w-6 h-6
                        transition-all duration-300 ease-in-out
                        ${activeItem === item.href
                          ? 'text-white'
                          : 'text-gray-500 group-hover:text-gray-900'
                        }
                      `}>
                        {item.icon}
                      </span>
                      <span className={`
                        font-medium whitespace-nowrap overflow-hidden
                        transition-all duration-300 ease-in-out origin-left
                        ${isCollapsed
                          ? 'opacity-0 max-w-0 -translate-x-2 pointer-events-none'
                          : 'opacity-100 max-w-[160px] translate-x-0'
                        }
                        ${activeItem === item.href
                          ? 'text-white'
                          : 'text-gray-700 group-hover:text-gray-900'
                        }
                      `}>
                        {item.name}
                      </span>

                      {/* Bell Icon for Approve Articles with count badge */}
                      {item.id === 'approve_articles' && hasPendingArticles && (
                        <>
                          {/* Expanded mode: bell + count on the right */}
                          <div className={`
                            ml-auto flex items-center gap-1.5
                            transition-all duration-300 ease-in-out
                            ${isCollapsed
                              ? 'opacity-0 w-0 overflow-hidden pointer-events-none'
                              : 'opacity-100 w-auto'
                            }
                          `}>
                            <svg
                              className={`w-5 h-5 text-amber-500 flex-shrink-0 ${shake ? 'animate-shake' : 'animate-pulse'}`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
                            </svg>
                            <span className={`
                              inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold shadow-lg
                              ${shake ? 'animate-shake' : ''}
                            `}>
                              {effectivePendingCount > 99 ? '99+' : effectivePendingCount}
                            </span>
                          </div>

                          {/* Collapsed mode: floating badge on top-right */}
                          <span className={`
                            absolute -right-0.5 -top-0.5 inline-flex h-5 w-5 items-center justify-center
                            rounded-full bg-red-500 text-[9px] text-white font-bold shadow-lg ring-2 ring-white
                            transition-all duration-300 ease-in-out
                            ${isCollapsed
                              ? 'opacity-100 scale-100 pointer-events-auto'
                              : 'opacity-0 scale-0 pointer-events-none'
                            }
                            ${shake ? 'animate-shake' : ''}
                          `}>
                            {effectivePendingCount > 99 ? '99+' : effectivePendingCount}
                          </span>
                        </>
                      )}

                      {/* Bell Icon for pending shortened URLs with count badge */}
                      {item.id === 'shorten_url' && hasPendingUrls && (
                        <>
                          {/* Expanded mode: bell + count on the right */}
                          <div className={`
                            ml-auto flex items-center gap-1.5
                            transition-all duration-300 ease-in-out
                            ${isCollapsed
                              ? 'opacity-0 w-0 overflow-hidden pointer-events-none'
                              : 'opacity-100 w-auto'
                            }
                          `}>
                            <svg
                              className={`w-5 h-5 text-amber-500 flex-shrink-0 ${shake ? 'animate-shake' : 'animate-pulse'}`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
                            </svg>
                            <span className={`
                              inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold shadow-lg
                              ${shake ? 'animate-shake' : ''}
                            `}>
                              {effectivePendingUrlCount > 99 ? '99+' : effectivePendingUrlCount}
                            </span>
                          </div>

                          {/* Collapsed mode: floating badge on top-right */}
                          <span className={`
                            absolute -right-0.5 -top-0.5 inline-flex h-5 w-5 items-center justify-center
                            rounded-full bg-red-500 text-[9px] text-white font-bold shadow-lg ring-2 ring-white
                            transition-all duration-300 ease-in-out
                            ${isCollapsed
                              ? 'opacity-100 scale-100 pointer-events-auto'
                              : 'opacity-0 scale-0 pointer-events-none'
                            }
                            ${shake ? 'animate-shake' : ''}
                          `}>
                            {effectivePendingUrlCount > 99 ? '99+' : effectivePendingUrlCount}
                          </span>
                        </>
                      )}
                    </NavItem>;
                    })()}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(5deg); }
          60% { transform: rotate(-5deg); }
          70% { transform: rotate(2deg); }
          80% { transform: rotate(-2deg); }
          90% { transform: rotate(1deg); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </aside>
  );
}