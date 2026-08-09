import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function CagayanDeOroCity() {
    useEffect(() => {
        document.title = 'Cagayan de Oro City - City College of Cagayan de Oro';
    }, []);

    // Slide Data – Each slide contains the full text content for that section
    const slides = [
        { 
            id: 'spanish-arrival', 
            title: 'Spanish Arrival', 
            subtitle: '1622 – The Arrival of the Recollect Missionaries',
            image: 'https://images.unsplash.com/photo-1597610210246-dccd12e1095e?q=80&w=1200&auto=format&fit=crop',
            content: `In 1622, two Augustinian Recollect missionaries first came to Huluga, then called Himologan. Here they met a mixed stock of Bukidnons and Visayas who lived in a settlement perched on a cliff, overlooking a river. The men had massive tattoos, like those of the Visayan pintados, and the women wore intricate jewelry, some made of gold.
            
            The priests were Fray Juan de San Nicolas and Fray Francisco de la Madre de Dios. According to their journals, the natives were polytheistic animists, not Muslims. But they paid tributes to Sultan Kudarat through his emissaries.`
        },
        { 
            id: 'etymology', 
            title: 'Etymology', 
            subtitle: 'The Origin of the Name "Cagayan"',
            image: 'https://images.unsplash.com/photo-1570524954315-b6836583353c?q=80&w=1200&auto=format&fit=crop',
            content: `Spanish documents in 1500s already referred to the area around Himologan as Cagayan. On January 25, 1571, the Spanish government granted this area, including what is now Northern Mindanao, as an encomienda to Juan Griego. There is also a Cagayan in Luzon and another in Sulu.
            
            According to Father Miguel Bernad, S.J. of Xavier University, "cagayan" comes from the Malayo-Polynesian word ag, which means "water". Ag is present in words like agus, agusan, and kagay. Agus means "flowing water", and agusan "place of flowing water". Kagay means "river" and kagayan is "place with a river".
            
            According to Dr. Lawrence A Reid, Professor Emeritus, "cagayan" comes from an ancient Philippine word *kaRayan, which means "river".`
        },
        { 
            id: 'conversion', 
            title: 'Conversion to Christianity', 
            subtitle: 'Fray Agustin de San Pedro & Datu Salangsang',
            image: 'https://images.unsplash.com/photo-1597871862678-e7bb4d9c41e9?q=80&w=1200&auto=format&fit=crop',
            content: `In 1626, a 26-year old Augustinian Recollect friar arrived in Cagayan. His name was Fray Agustin de San Pedro, a Portuguese. Before his priesthood, he studied mathematics, architecture, gunnery, and military strategy at the University of Salamanca.
            
            Fray Agustin persuaded the leader of Himologan, Datu Salangsang, to transfer his settlement down river, to the area of today's Gaston Park and San Agustin Cathedral. Here, Fray Agustin built a church of native materials. Inside, he baptized Datu Salangsang and his wife, and later his people.`
        },
        { 
            id: 'fortification', 
            title: 'Fortification of Cagayan', 
            subtitle: 'The Fuerza Real de San Jose',
            image: 'https://images.unsplash.com/photo-1542379653-a53527a0d54e?q=80&w=1200&auto=format&fit=crop',
            content: `In response to the conversion, Sultan Kudarat sent a fleet of warriors to drive away the Spanish missionaries and to regain the lost tributes. Kudarat's attacks prompted Fray Agustin to build a wooden fortress and watchtower in Cagayan to protect Salangsang's people. He called the fortress Fuerza Real de San Jose, and it occupied an area now filled with Gaston Park and San Agustin Cathedral. Fray Agustin's defense of Cagayan earned him the title "El Padre Capitan".
            
            The fortress was rebuilt with stones in 1730. But Lt. Col. Jose Carvallo, the Spanish politico-military governor of Misamis, demolished it in 1875 and used the stones to pave the streets of the town.`
        },
        { 
            id: 'cagayan-misamis', 
            title: 'Cagayan de Misamis', 
            subtitle: 'Capital of the Segundo Distrito de Misamis',
            image: 'https://images.unsplash.com/photo-1561609980-8c5b612e654d?q=80&w=1200&auto=format&fit=crop',
            content: `In 1818, the Manila Spanish divided Mindanao into politico-military districts, one of which was the Segundo Distrito de Misamis, the largest district in Mindanao. This area was composed of today's Misamis Oriental, Misamis Occidental, Camiguin, Bukidnon, Lanao, Zamboanga del Norte, and the northern part of Cotabato.
            
            On February 27, 1872, the Spanish Governor General Carlos Maria de la Torre issued a decree declaring Cagayan the permanent capital of Segundo Distrito de Misamis. All Spanish politico-military governors of Misamis lived at the Casa Real de Cagayan, built in 1831, the site of today's city hall of Cagayan de Oro. During this era, the name of the town was "Cagayan de Misamis".`
        },
        { 
            id: 'katipunan', 
            title: 'The Katipunan Revolt', 
            subtitle: 'The Only Katipunan-led Revolt in Mindanao',
            image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop',
            content: `The Katipunan Revolt broke out in Luzon in late August 1896. A month later, on September 29, 1896, a group of Filipinos in Iligan — who had been deported from Luzon to undergo military discipline — received instructions from the Manila Katipunan, and consequently mutinied against the Spanish soldiers. They raided the Spanish armory, then ransacked all convents and homes of Spanish peninsulares from Iligan to Cagayan de Misamis.
            
            They proceeded to Bukidnon, where they forged an alliance with a band of natives. Then they attacked Balingasag, and raided the outpost of Gingoog on January 1897. Anger intensified when the rebels learned of Dr. Jose P. Rizal's execution. But they were subdued when the Spanish government recalled and used a gunboat from the Tercio Distrito de Surigao.
            
            The uprising in Cagayan de Misamis is the only known Katipunan-led revolt in the whole of Mindanao.`
        },
        { 
            id: 'american', 
            title: 'American Occupation', 
            subtitle: 'The Battle of Makahambus Hill (1900)',
            image: 'https://images.unsplash.com/photo-1520810623577-bb12bedef5c1?q=80&w=1200&auto=format&fit=crop',
            content: `On March 31, 1900, the Americans invaded Cagayan de Misamis by first bombing the flag fluttering at Macabalan wharf. Filipino resistance fighters had already organized before the attack, but retaliated only on April 7, 1900, led by Gen. Nicolas Capistrano. The fighting erupted in the town center. This was followed by the Battle of Agusan Hill, led by Capt. Vicente Roa Y Racines, who was killed with his men.
            
            On June 4, 1900, however, for the first time in the entire Philippine-American War, the Americans lost to the Filipino revolutionaries in the Battle of Makahambus Hill. Col. Apolinar Velez led the Filipino troop to victory.
            
            The Americans won the war eventually, however. And under foreign rule, Cagayan de Misamis became the center of commerce, migration, and education in Northern Mindanao.`
        },
        { 
            id: 'japanese-charter', 
            title: 'City Charter', 
            subtitle: 'Cagayan de Oro becomes a City (1950)',
            image: 'https://images.unsplash.com/photo-1557960286-15ebcb6a7cc6?q=80&w=1200&auto=format&fit=crop',
            content: `On May 1, 1942, the Japanese Kawamura Detachment sailed from Iloilo to Cagayan de Misamis, and implemented the "scorched earth policy". They burned most of the town, but used the major buildings as headquarters. Guerrillas fought back, but failed to cause major damage. On October 10, 1944, American planes bombarded Cagayan de Misamis to drive out the Japanese, eventually liberating the place on May 10, 1945.
            
            Starting 1946, Misamis Congressman Pedro S. Baculio lobbied in the Philippine Congress so that Cagayan de Misamis, which was reeling from the ashes of war, would be declared a city. On December 17, 1949, the new Congressman Emmanuel Pelaez introduced House Bill No. 54, entitled "An Act Creating the City of Cagayan de Oro". President Elpidio Quirino signed the city charter at 11:30 am, June 15, 1950.
            
            Pelaez appended "de Oro" to "Cagayan" in recognition of gold mining in the hinterland barrios known to Spanish explorers in 1500s. The first appointed mayor of Cagayan de Oro was Max Y. Suniel, followed by Justiniano R. Borja in 1954.`
        },
        { 
            id: 'archdiocese', 
            title: 'Archdiocese & The Present', 
            subtitle: 'From Xavier University to Today',
            image: 'https://images.unsplash.com/photo-1509450871972-29b026dc73ee?q=80&w=1200&auto=format&fit=crop',
            content: `On June 29, 1951, Pope Pius XII created the first Catholic archbishopric in Mindanao, when he elevated the Diocese of Cagayan into an archdiocese. Santiago T. G. Hayes, S.J. was the first archbishop. Hayes founded Ateneo de Cagayan on June 7, 1933. The school was renamed Xavier University on March 22, 1958. It was the first Mindanao university.
            
            During the regime of the dictator Ferdinand E. Marcos, Cagayan de Oro earned the reputation as the center of political opposition in the Philippines. Independent-minded politicians in Cagayan de Oro helped restore democracy at EDSA in 1986.
            
            Today, Cagayan de Oro is the burgeoning center of commerce, education, and government administration in Northern Mindanao. It is a major city. Rich in heritage, it shares with the historical highlights of the Republic of the Philippines.`
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Navigation functions (No auto-play)
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
            className="overflow-hidden pb-0"
        >
            {/* ======================================================
                TOP HERO BANNER
            ====================================================== */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1620112402301-a7d5a0a2f9f9?q=80&w=1200&auto=format&fit=crop')`
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Cagayan de Oro City
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        The City of Golden Friendship
                    </p>
                </div>
            </div>

            {/* ======================================================
                MAIN CONTENT: MANUAL CAROUSEL 
                (Added margin-top for spacing and centered all text)
            ====================================================== */}
            <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden bg-white mt-12 md:mt-16 lg:mt-20">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Heavy Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-black/70"></div>

                        {/* CENTERED CONTENT OVERLAY */}
                        <div className="relative z-20 h-full w-full flex items-center justify-center p-6 md:p-10 lg:p-16">
                            <div className="max-w-4xl mx-auto text-center">
                                <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-2 font-bold">
                                    Explore History
                                </p>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg font-runethia mb-2">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl text-white/80 drop-shadow-md font-light mb-6">
                                    {slide.subtitle}
                                </p>

                                {/* Full Content Inside Slide - Centered */}
                                <div className="text-white/90 text-base md:text-lg leading-relaxed font-light whitespace-pre-line max-w-3xl mx-auto">
                                    {slide.content}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Left/Right Arrows */}
                <button 
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition hover:bg-white/40"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button 
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition hover:bg-white/40"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'w-10 bg-green-500 shadow-lg shadow-green-500/50' 
                                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}