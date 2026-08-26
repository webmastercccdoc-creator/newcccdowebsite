import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import theImg from '../../../assets/banner/the-banner.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';

export default function THE() {
    useEffect(() => {
        document.title = "THE - City College of Cagayan de Oro";
    }, []);

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Hero Banner with Image */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('${theImg}')`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <AnimatedBannerText title="THE" description="Transdisciplinary Higher Education at CC de Oro." />
            </div>

            {/* Empty Main Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Content area - empty */}
            </div>
        </MainLayout>
    );
}