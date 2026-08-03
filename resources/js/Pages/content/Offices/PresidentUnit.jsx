export { default } from './PresiddentUnit';
import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function PresidentUnit() {
    useEffect(() => {
        document.title = "President's Unit - City College of Cagayan de Oro";
    }, []);

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Hero Banner */}
            <div className="relative w-full bg-gradient-to-r from-green-700 to-green-900 shadow-lg min-h-[250px] md:min-h-[300px] lg:min-h-[350px] flex items-center justify-center">
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        President's Unit
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Leadership and administration of the City College of Cagayan de Oro.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
                {/* Content will go here */}
            </div>
        </MainLayout>
    );
}