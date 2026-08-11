import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Import the local images
import cityhallBg from '../../../assets/images/cityhall.jpg';
import spanishImg from '../../../assets/images/spanish.jpg';
import riverImg from '../../../assets/images/river.jpg';
import cathedralImg from '../../../assets/images/cathedral.jpg';
import defenseImg from '../../../assets/images/defense.jpg';
import misamisImg from '../../../assets/images/misamis.jpg';
import revoltImg from '../../../assets/images/revolt.jpg';
import americanImg from '../../../assets/images/american.jpg';
import charterImg from '../../../assets/images/charter.jpg';
import archbishopImg from '../../../assets/images/archbishop.jpg';

export default function CagayanDeOroCity() {
    useEffect(() => {
        document.title = 'Cagayan de Oro City - City College of Cagayan de Oro';
    }, []);

    // Slide Data
    const slides = [
        { 
            id: 'spanish-arrival', 
            title: 'Spanish Arrival',
            subtitle: '1622 – The Arrival of the Recollect Missionaries',
            image: spanishImg, 
            content: `In 1622, two Augustinian Recollect missionaries first came to Huluga, then called Himologan. Here they met a mixed stock of Bukidnons and Visayas who lived in a settlement perched on a cliff, overlooking a river. The men had massive tattoos, like those of the Visayan pintados, and the women wore intricate jewelry, some made of gold.

The priests were Fray Juan de San Nicolas and Fray Francisco de la Madre de Dios. According to their journals, the natives were polytheistic animists, not Muslims. But they paid tributes to Sultan Kudarat through his emissaries.`
        },
        { 
            id: 'etymology', 
            title: 'Etymology', 
            subtitle: 'The Origin of the Name "Cagayan"',
            image: riverImg, 
            content: `Spanish documents in 1500s already referred to the area around Himologan as Cagayan. On January 25, 1571, the Spanish government granted this area, including what is now Northern Mindanao, as an encomienda to Juan Griego. There is also a Cagayan in Luzon and another in Sulu.

According to Father Miguel Bernad, S.J. of Xavier University, "cagayan" comes from the Malayo-Polynesian word ag, which means "water". Ag is present in words like agus, agusan, and kagay. Agus means "flowing water", and agusan "place of flowing water". Kagay means "river" and kagayan is "place with a river".

According to Dr. Lawrence A Reid, Professor Emeritus, "cagayan" comes from an ancient Philippine word *kaRayan, which means "river".`
        },
        { 
            id: 'conversion', 
            title: 'Conversion to Christianity', 
            subtitle: 'Fray Agustin de San Pedro & Datu Salangsang',
            image: cathedralImg, 
            content: `In 1626, a 26-year old Augustinian Recollect friar arrived in Cagayan. His name was Fray Agustin de San Pedro, a Portuguese. Before his priesthood, he studied mathematics, architecture, gunnery, and military strategy at the University of Salamanca.

Fray Agustin persuaded the leader of Himologan, Datu Salangsang, to transfer his settlement down river, to the area of today's Gaston Park and San Agustin Cathedral. Here, Fray Agustin built a church of native materials. Inside, he baptized Datu Salangsang and his wife, and later his people.`
        },
        { 
            id: 'fortification', 
            title: 'Fortification of Cagayan', 
            subtitle: 'The Fuerza Real de San Jose',
            image: defenseImg, 
            content: `In response to the conversion, Sultan Kudarat sent a fleet of warriors to drive away the Spanish missionaries and to regain the lost tributes. Kudarat's attacks prompted Fray Agustin to build a wooden fortress and watchtower in Cagayan to protect Salangsang's people. He called the fortress Fuerza Real de San Jose, and it occupied an area now filled with Gaston Park and San Agustin Cathedral. Fray Agustin's defense of Cagayan earned him the title "El Padre Capitan".

The fortress was rebuilt with stones in 1730. But Lt. Col. Jose Carvallo, the Spanish politico-military governor of Misamis, demolished it in 1875 and used the stones to pave the streets of the town.`
        },
        { 
            id: 'cagayan-misamis', 
            title: 'Cagayan de Misamis', 
            subtitle: 'Capital of the Segundo Distrito de Misamis',
            image: misamisImg, 
            content: `In 1818, the Manila Spanish divided Mindanao into politico-military districts, one of which was the Segundo Distrito de Misamis, the largest district in Mindanao. This area was composed of today's Misamis Oriental, Misamis Occidental, Camiguin, Bukidnon, Lanao, Zamboanga del Norte, and the northern part of Cotabato.

On February 27, 1872, the Spanish Governor General Carlos Maria de la Torre issued a decree declaring Cagayan the permanent capital of Segundo Distrito de Misamis. All Spanish politico-military governors of Misamis lived at the Casa Real de Cagayan, built in 1831, the site of today's city hall of Cagayan de Oro. During this era, the name of the town was "Cagayan de Misamis".`
        },
        { 
            id: 'katipunan', 
            title: 'The Katipunan Revolt', 
            subtitle: 'The Only Katipunan-led Revolt in Mindanao',
            image: revoltImg, 
            content: `The Katipunan Revolt broke out in Luzon in late August 1896. A month later, on September 29, 1896, a group of Filipinos in Iligan — who had been deported from Luzon to undergo military discipline — received instructions from the Manila Katipunan, and consequently mutinied against the Spanish soldiers. They raided the Spanish armory, then ransacked all convents and homes of Spanish peninsulares from Iligan to Cagayan de Misamis.

They proceeded to Bukidnon, where they forged an alliance with a band of natives. Then they attacked Balingasag, and raided the outpost of Gingoog on January 1897. Anger intensified when the rebels learned of Dr. Jose P. Rizal's execution. But they were subdued when the Spanish government recalled and used a gunboat from the Tercio Distrito de Surigao.

The uprising in Cagayan de Misamis is the only known Katipunan-led revolt in the whole of Mindanao.`
        },
        { 
            id: 'american', 
            title: 'American Occupation', 
            subtitle: 'The Battle of Makahambus Hill (1900)',
            image: americanImg, 
            content: `On March 31, 1900, the Americans invaded Cagayan de Misamis by first bombing the flag fluttering at Macabalan wharf. Filipino resistance fighters had already organized before the attack, but retaliated only on April 7, 1900, led by Gen. Nicolas Capistrano. The fighting erupted in the town center. This was followed by the Battle of Agusan Hill, led by Capt. Vicente Roa Y Racines, who was killed with his men.

On June 4, 1900, however, for the first time in the entire Philippine-American War, the Americans lost to the Filipino revolutionaries in the Battle of Makahambus Hill. Col. Apolinar Velez led the Filipino troop to victory.

The Americans won the war eventually, however. And under foreign rule, Cagayan de Misamis became the center of commerce, migration, and education in Northern Mindanao.`
        },
        { 
            id: 'japanese-charter', 
            title: 'City Charter', 
            subtitle: 'Cagayan de Oro becomes a City (1950)',
            image: charterImg, 
            content: `On May 1, 1942, the Japanese Kawamura Detachment sailed from Iloilo to Cagayan de Misamis, and implemented the "scorched earth policy". They burned most of the town, but used the major buildings as headquarters. Guerrillas fought back, but failed to cause major damage. On October 10, 1944, American planes bombarded Cagayan de Misamis to drive out the Japanese, eventually liberating the place on May 10, 1945.

Starting 1946, Misamis Congressman Pedro S. Baculio lobbied in the Philippine Congress so that Cagayan de Misamis, which was reeling from the ashes of war, would be declared a city. On December 17, 1949, the new Congressman Emmanuel Pelaez introduced House Bill No. 54, entitled "An Act Creating the City of Cagayan de Oro". President Elpidio Quirino signed the city charter at 11:30 am, June 15, 1950.

Pelaez appended "de Oro" to "Cagayan" in recognition of gold mining in the hinterland barrios known to Spanish explorers in 1500s. The first appointed mayor of Cagayan de Oro was Max Y. Suniel, followed by Justiniano R. Borja in 1954.`
        },
        { 
            id: 'archdiocese', 
            title: 'Archdiocese & The Present', 
            subtitle: 'From Xavier University to Today',
            image: archbishopImg, 
            content: `On June 29, 1951, Pope Pius XII created the first Catholic archbishopric in Mindanao, when he elevated the Diocese of Cagayan into an archdiocese. Santiago T. G. Hayes, S.J. was the first archbishop. Hayes founded Ateneo de Cagayan on June 7, 1933. The school was renamed Xavier University on March 22, 1958. It was the first Mindanao university.

During the regime of the dictator Ferdinand E. Marcos, Cagayan de Oro earned the reputation as the center of political opposition in the Philippines. Independent-minded politicians in Cagayan de Oro helped restore democracy at EDSA in 1986.

Today, Cagayan de Oro is the burgeoning center of commerce, education, and government administration in Northern Mindanao. It is a major city. Rich in heritage, it shares with the historical highlights of the Republic of the Philippines.`
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Navigation functions
    const goToSlide = (index) => setCurrentIndex(index);
    const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const goToNext = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    return (
        <MainLayout 
            title="Cagayan de Oro City" 
            showTitle={false} 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0 bg-white"
        >
            {/* ======================================================
                TOP HERO BANNER
            ====================================================== */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${cityhallBg})`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold tracking-widest uppercase text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                    >
                        Local Heritage
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl mb-3"
                    >
                        Cagayan de Oro City
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mx-auto max-w-2xl text-lg md:text-xl text-blue-100 font-light drop-shadow"
                    >
                        The City of Golden Friendship
                    </motion.p>
                </div>
            </div>

            {/* ======================================================
                MAIN CONTENT: SPLIT SCREEN HISTORICAL CAROUSEL 
            ====================================================== */}
            <section className="bg-slate-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-sm font-bold tracking-widest uppercase text-emerald-600">Historical Timeline</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            The CDO Heritage
                        </h2>
                        <div className="w-20 h-1.5 bg-emerald-500 rounded-full mx-auto"></div>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        
                        {/* Slide Counter (Top Right) */}
                        <div className="absolute top-6 right-6 z-30 hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                            <span className="text-emerald-600">{String(currentIndex + 1).padStart(2, '0')}</span>
                            <span>/</span>
                            <span>{String(slides.length).padStart(2, '0')}</span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 min-h-[450px] md:min-h-[550px]"
                            >
                                {/* Left Side: Visual Banner */}
                                {/* Changed to aspect ratio for mobile so it doesn't look cramped */}
                                <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
                                    <img 
                                        src={slides[currentIndex].image} 
                                        alt={slides[currentIndex].title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r"></div>
                                    
                                    {/* Overlay Title on Image for Mobile & Desktop aesthetic */}
                                    <div className="absolute bottom-0 left-0 p-6 md:p-10 z-10">
                                        <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">
                                            {slides[currentIndex].subtitle}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side: Text Content */}
                                {/* Adjusted padding for better mobile reading */}
                                <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                                    {/* Decorative Quote Mark */}
                                    <div className="absolute top-6 right-6 text-7xl md:text-8xl font-serif text-gray-100 select-none leading-none pointer-events-none hidden md:block">
                                        &rdquo;
                                    </div>

                                    <div className="relative z-10">
                                        <motion.h3 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                                        >
                                            {slides[currentIndex].title}
                                        </motion.h3>
                                        
                                        <div className="w-12 h-1 bg-emerald-500 rounded-full mb-6"></div>
                                        
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-line font-light"
                                        >
                                            {slides[currentIndex].content}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button 
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white p-3 text-gray-700 shadow-lg transition hover:bg-emerald-50 hover:text-emerald-600 border border-gray-100"
                            aria-label="Previous slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button 
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white p-3 text-gray-700 shadow-lg transition hover:bg-emerald-50 hover:text-emerald-600 border border-gray-100"
                            aria-label="Next slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots Indicator (Below the card for better layout) */}
                    <div className="flex justify-center items-center space-x-2 mt-8">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                        ? 'w-8 bg-emerald-500 shadow-md' 
                                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </section>
        </MainLayout>
    );
}