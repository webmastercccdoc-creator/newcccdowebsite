import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';

export default function Dashboard({ 
    user = null,
    stats: initialStats = null,
    departmentStats: initialDepartmentStats = null,
    userRank: initialUserRank = null
}) {
    const [stats, setStats] = useState({
        totalArticles: 0,
        approved: 0,
        pending: 0,
        rejected: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [departmentStats, setDepartmentStats] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [currentUser, setCurrentUser] = useState(user);
    const [showAllDepartments, setShowAllDepartments] = useState(false);

    useEffect(() => {
        // If data is passed from server (Inertia), use it
        if (initialStats && initialDepartmentStats) {
            setStats(initialStats);
            setDepartmentStats(initialDepartmentStats);
            setUserRank(initialUserRank);
            setIsLoading(false);
        } else {
            // Otherwise fetch from API
            fetchDashboardData();
        }
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch dashboard stats from API
            const apiBase = import.meta.env.BASE_URL || '/';
            const response = await axios.get(`${apiBase}api/dashboard/stats`);
            const data = response.data;
            
            setStats(data.stats || {
                totalArticles: 0,
                approved: 0,
                pending: 0,
                rejected: 0
            });
            setDepartmentStats(data.departmentStats || []);
            setUserRank(data.userRank || null);
            if (data.user) {
                setCurrentUser(data.user);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            setStats({
                totalArticles: 0,
                approved: 0,
                pending: 0,
                rejected: 0
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Stats Cards Configuration with solid colors
    const statCards = [
        {
            title: 'Total Articles',
            value: stats.totalArticles,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            cardBg: 'bg-blue-500'
        },
        {
            title: 'Approved',
            value: stats.approved,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            cardBg: 'bg-emerald-500'
        },
        {
            title: 'Pending Review',
            value: stats.pending,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            cardBg: 'bg-amber-500'
        },
        {
            title: 'Rejected',
            value: stats.rejected,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            cardBg: 'bg-red-500'
        }
    ];

    // Loading Skeleton
    if (isLoading) {
        return (
            <AdminLayout title="Dashboard">
                <div className="mb-6">
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-96 bg-gray-200 rounded mt-2 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                                </div>
                                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </AdminLayout>
        );
    }

    // Get display departments (first one only, or all if showAllDepartments is true)
    const getDisplayDepartments = () => {
        if (!currentUser?.departments || currentUser.departments.length === 0) {
            return [];
        }
        
        if (showAllDepartments) {
            return currentUser.departments;
        }
        
        return currentUser.departments.slice(0, 1);
    };

    const displayDepartments = getDisplayDepartments();
    const totalDepartments = currentUser?.departments?.length || 0;
    const hiddenCount = totalDepartments - 1;

    return (
        <AdminLayout title="Dashboard">
            {/* Welcome Section */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Welcome back, {currentUser?.firstname || currentUser?.name || 'Admin'}! 👋
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                    Here's an overview of your articles and department performance
                </p>
                {currentUser?.departments && currentUser.departments.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">Your Departments:</span>
                        {displayDepartments.map((dept, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                                {dept}
                            </span>
                        ))}
                        {!showAllDepartments && hiddenCount > 0 && (
                            <button
                                onClick={() => setShowAllDepartments(true)}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                +{hiddenCount} more
                            </button>
                        )}
                        {showAllDepartments && hiddenCount > 0 && (
                            <button
                                onClick={() => setShowAllDepartments(false)}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                Show less
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Statistics Cards - Solid Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <div 
                        key={index} 
                        className={`${stat.cardBg} rounded-xl shadow-lg`}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider">
                                        {stat.title}
                                    </p>
                                    <p className="text-4xl font-bold text-white mt-1">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                                    <div className="text-white">
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}