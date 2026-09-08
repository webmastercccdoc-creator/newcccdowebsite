import { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import Banner from './Banner';
import Department from './Department';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('department');

    const tabs = [
        { id: 'department', label: 'Department' },
        { id: 'banner', label: 'Banner' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'department':
                return <Department />;
            case 'banner':
                return <Banner />;
            default:
                return null;
        }
    };

    return (
        <AdminLayout title="Settings">
            <div className="bg-white rounded-lg shadow">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex flex-wrap -mb-px" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    px-6 py-3 text-sm font-medium border-b-2 transition-colors
                                    ${activeTab === tab.id
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>
        </AdminLayout>
    );
}