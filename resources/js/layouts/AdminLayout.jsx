import { useState, useEffect } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';

export default function AdminLayout({ title, children, activePage }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile on mount and resize
    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };
        
        checkScreen();
        window.addEventListener('resize', checkScreen);
        
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    // Close sidebar when resizing to desktop
    useEffect(() => {
        if (!isMobile && sidebarOpen) {
            setSidebarOpen(false);
        }
    }, [isMobile, sidebarOpen]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar - Fixed position */}
            <div className="hidden lg:block flex-shrink-0">
                <Sidebar activePage={activePage} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`
                fixed left-0 top-0 h-screen w-64 z-50 lg:hidden transition-transform duration-300 transform
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar activePage={activePage} />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 w-full overflow-hidden">
                {/* Top Navigation */}
                <Navbar />

                {/* Mobile Menu Button */}
                <div className="lg:hidden px-4 pt-4 pb-2">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Main Content */}
                <main className="flex-1 px-3 md:px-5 py-4 overflow-auto">
                    <div className="w-full h-full">
                        <h1 className="mb-4 text-2xl md:text-3xl font-bold text-gray-900">
                            {title}
                        </h1>
                        <div className="w-full h-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}