import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function PartnersLinkages() {
    useEffect(() => {
        document.title = "Partners and Linkages - City College of Cagayan de Oro";
    }, []);

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Banner with Image */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=1200&auto=format&fit=crop')`
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Partners and Linkages
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90 drop-shadow-md">
                        Building strategic partnerships and collaborations for academic excellence and community development.
                    </p>
                </div>
            </div>

            {/* Content will go here */}
        </MainLayout>
    );
}