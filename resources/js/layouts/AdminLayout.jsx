import { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';
import Footer from '../components/admin/Footer';

export default function AdminLayout({ title, children, activePage }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar - Hidden on mobile, visible on lg and up */}
            <div className="hidden lg:block">
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
                fixed left-0 top-0 h-screen w-56 bg-gray-700 z-50 lg:hidden transition-transform duration-300 transform
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar activePage={activePage} />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col w-full p-4 md:p-6">
                {/* Mobile Menu Button - Only visible on mobile */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <Navbar />
                
                {/* Content Box - Responsive sizing */}
                <div className="flex-1 rounded-lg md:rounded-3xl bg-white p-4 md:p-6 shadow-sm mt-4 overflow-x-auto">
                    <h1 className="mb-4 text-xl md:text-2xl font-semibold text-gray-800">{title}</h1>
                    {children}
                </div>
                
                <Footer />
            </div>
        </div>
    );
}