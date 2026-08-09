import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';

export default function Contact() {
    useEffect(() => {
        document.title = "Contact Us - City College of Cagayan de Oro";
    }, []);

    const offices = [
        {
            id: 'registrar',
            title: "Registrar's Office",
            address: "Registrar's Office, Zone 2, Barangay Agusan, Cagayan de Oro, 9000, Philippines",
            email: "registrar.citycollegeofcdo@gmail.com",
            phone: "+63 917 774 2177"
        },
        {
            id: 'academic',
            title: "Academic Affairs Services",
            address: "Office of Academic Affairs, Zone 2, Barangay Agusan, Cagayan de Oro, 9000, Philippines",
            email: "vpaa.citycollege@gmail.com",
            phone: "+63 927 7697 659"
        },
        {
            id: 'administrative',
            title: "Administrative Services",
            address: "Office of Administrative Services, Zone 2, Barangay Agusan, Cagayan de Oro, 9000, Philippines",
            email: "vpadoffice.citycollege@gmail.com",
            phone: "+63 926 1145 351"
        },
        {
            id: 'finance',
            title: "Finance Services",
            address: "Office of Finance Services, Zone 2, Barangay Agusan, Cagayan de Oro, 9000, Philippines",
            email: "financecdotvi@gmail.com",
            phone: "+63 927 7697 659"
        },
        {
            id: 'student-affairs',
            title: "Student Affairs and Services",
            address: "Office of Student Affairs and Services, Zone 2, Barangay Agusan, Cagayan de Oro, 9000, Philippines",
            email: "cccdo.osas@gmail.com",
            phone: "+63 997 5739 090"
        },
        {
            id: 'extension',
            title: "Extension and Social Development Services",
            address: "Office of Extension and Social Development Services, Zone 2, Barangay Agusan, Cagayan de Oro, 9000, Philippines",
            email: "cccdo.osas@gmail.com",
            phone: "+63 917 7742 177"
        },
        {
            id: 'research',
            title: "Research, Innovation, and Technology Transfer Services",
            address: "Office of Research, Innovation, and Technology Transfer Services, Zone 2, Barangay Agusan, Cagayan de Oro, 9000, Philippines",
            email: "cccdo.osas@gmail.com",
            phone: "+63 917 6771 881"
        }
    ];

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
                    backgroundImage: `url('')`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Contact Us
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        The City College of Cagayan de Oro is ready to provide the right solution according to your needs.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in touch</h2>
                        <p className="text-gray-600 mb-8">
                            The City College of Cagayan de Oro serves active learners all over different regions of the world.
                        </p>

                        <div className="space-y-6">
                            {offices.map((office) => (
                                <div key={office.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <h3 className="font-semibold text-green-800 text-lg mb-2">{office.title}</h3>
                                    <p className="text-gray-600 text-sm">{office.address}</p>
                                    <p className="text-gray-600 text-sm mt-1">
                                        <span className="font-medium">Email:</span> {office.email}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-medium">Phone:</span> {office.phone}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Contact Form and Map */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
                            
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        placeholder="Enter your company"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        placeholder="Enter subject"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-800 transition duration-200 shadow-md hover:shadow-lg"
                                >
                                    Send
                                </button>
                            </form>
                        </div>

                        {/* Google Maps - Directly Below Form */}
                        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6">
                            <div className="w-full h-[300px] md:h-[350px] rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps?q=City+College+of+Cagayan+de+Oro&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="City College of Cagayan de Oro Location"
                                ></iframe>
                            </div>
                            <p className="text-center text-gray-500 text-xs md:text-sm mt-3">
                                FPQQ+P6F, Cagayan De Oro City, Misamis Oriental
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}