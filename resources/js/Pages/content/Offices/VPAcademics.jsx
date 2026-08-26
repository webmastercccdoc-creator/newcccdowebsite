import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import ovpacadsBanner from '../../../assets/banner/ovpacads-banner.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';

export default function VPAcademics() {
    useEffect(() => {
        document.title = "VP for Academics - City College of Cagayan de Oro";
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
                    backgroundImage: `url(${ovpacadsBanner})`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <AnimatedBannerText
                    title="Vice President for Academics"
                    description="Academic leadership and excellence at the City College of Cagayan de Oro."
                />
            </div>

            {/* BELOW BANNER IS COMPLETELY EMPTY */}
        </MainLayout>
    );
}