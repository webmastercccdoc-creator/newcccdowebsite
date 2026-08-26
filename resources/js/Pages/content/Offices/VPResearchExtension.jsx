import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import bannerImage from '../../../assets/banner/ovpreseaechextension-banner.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';

export default function VPResearchExtension() {
    useEffect(() => {
        document.title = "VP for Research & Extension - City College of Cagayan de Oro";
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
                    backgroundImage: `url(${bannerImage})`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <AnimatedBannerText
                    title="Vice President for Research & Extension"
                    description="Advancing knowledge and community engagement at the City College of Cagayan de Oro."
                />
            </div>

            {/* BELOW BANNER IS COMPLETELY EMPTY */}
        </MainLayout>
    );
}