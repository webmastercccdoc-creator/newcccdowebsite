import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';

// debug: log the imported layout to help diagnose invalid element type errors
console.log('MainLayout import (GoverningBoard):', MainLayout);

// Import images (PNG format)
import GoverningBoardImage1 from '../../../assets/GoverningBoard/governing-board1.png';
import GoverningBoardImage2 from '../../../assets/GoverningBoard/governing-board2.png';
import GoverningBoardImage3 from '../../../assets/GoverningBoard/banner.png';

export default function GoverningBoard() {
    useEffect(() => {
        // Page title
        document.title = 'Governing Board - City College of Cagayan de Oro';
    }, []);

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            
            {/* Full-width Hero Banner */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('${GoverningBoardImage3}')` 
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <AnimatedBannerText title="Governing Board" description="The highest policy-making body of the City College of Cagayan de Oro." />
            </div>

            {/* Main Content Area - Two Column Layout */}
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* LEFT COLUMN - Governing Board Composition */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-green-800 mb-6 pb-3 border-b border-green-200">
                            Governing Board Composition
                        </h2>
                        
                        <div className="space-y-6">
                            {/* Chairperson */}
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg">Chairperson</h3>
                                <p className="text-gray-600 ml-4">City Mayor</p>
                            </div>

                            {/* Vice Chairperson */}
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg">Vice Chairperson</h3>
                                <p className="text-gray-600 ml-4">City College President</p>
                            </div>

                            {/* Members */}
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg mb-3">Members</h3>
                                <ul className="space-y-2 text-gray-600 ml-4 list-disc list-inside">
                                    <li>President of the duly recognized Faculty Association</li>
                                    <li>President of the duly recognized Supreme Student Council/Government</li>
                                    <li>President of the duly recognized Alumni Association</li>
                                    <li>Chairperson of the City Council's Committee on Education</li>
                                    <li>A representative of the Department of Science and Technology-Region X</li>
                                    <li>A representative of the Department of Agriculture-Region X</li>
                                    <li>A representative of the Department of Trade and Industry-Region X</li>
                                    <li>A representative of the Department of Education Division of Cagayan de Oro</li>
                                    <li>A representative of the Nahilaran IPS</li>
                                    <li>A representative of the National Commission on Indigenous People (NCIP) Region X</li>
                                </ul>
                            </div>

                            {/* Business/Industry Representatives */}
                            <div>
                                <h4 className="font-semibold text-gray-700 text-md mt-4">
                                    Representatives from duly recognized Business or Industry sectors 
                                    <span className="text-sm font-normal text-gray-500 block">(appointed by the GB for a term of two (2) years)</span>
                                </h4>
                                <ul className="space-y-1 text-gray-600 ml-4 list-disc list-inside mt-2">
                                    <li>ICT Industry Sector</li>
                                    <li>Engineering Industry Sector</li>
                                    <li>Business Sector</li>
                                    <li>Health Sector</li>
                                    <li>Others as needed</li>
                                </ul>
                            </div>

                            {/* LGU Representatives */}
                            <div>
                                <h4 className="font-semibold text-gray-700 text-md mt-4">
                                    Representatives from the LGU Cagayan de Oro Executive Department
                                </h4>
                                <ul className="space-y-1 text-gray-600 ml-4 list-disc list-inside mt-2">
                                    <li>City Mayor's Office</li>
                                    <li>City Budget Office</li>
                                    <li>City Legal Office</li>
                                    <li>City General Services Officer</li>
                                    <li>Others as needed</li>
                                </ul>
                            </div>

                            {/* Permanent Resource Persons */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-700 text-lg">Permanent Resource Persons</h3>
                                <ul className="space-y-2 text-gray-600 ml-4 list-disc list-inside mt-2">
                                    <li>A Representative from Commission on Higher Education-Region X designated by the CHED Chairperson</li>
                                    <li>A Representative from the National Economic and Development Authority-Region X</li>
                                    <li>Others as needed</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Images (PNG) */}
                    <div className="space-y-8">
                        {/* Image 1 */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6">
                            <div className="flex items-center justify-center">
                                <img 
                                    src={GoverningBoardImage1} 
                                    alt="Governing Board Meeting" 
                                    className="max-w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Image 2 */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6">
                            <div className="flex items-center justify-center">
                                <img 
                                    src={GoverningBoardImage2} 
                                    alt="Governing Board Members" 
                                    className="max-w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </MainLayout>
    );
}