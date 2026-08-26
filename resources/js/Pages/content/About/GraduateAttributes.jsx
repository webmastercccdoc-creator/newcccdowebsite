import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';

// debug: log the imported layout to help diagnose invalid element type errors
console.log('MainLayout import (GraduateAttributes):', MainLayout);

export default function GraduateAttributes() {
    useEffect(() => {
        // Page title
        document.title = 'Graduate Attributes - City College of Cagayan de Oro';
    }, []);

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            
            {/* Full-width Hero Banner */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('')` // Academic/graduation themed image
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <AnimatedBannerText title="Graduate Attributes" description="The qualities, skills, and values our graduates embody upon completion of their studies." />
            </div>

            {/* Empty Main Content Area */}
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
                {/* Content will be added here */}
            </div>

        </MainLayout>
    );
}