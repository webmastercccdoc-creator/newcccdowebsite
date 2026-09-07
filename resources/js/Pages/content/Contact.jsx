import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../layouts/MainLayout';
import AnimatedBannerText from '../../components/content/AnimatedBannerText';

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

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const officeCardVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.08,
                duration: 0.4,
                ease: "easeOut"
            }
        }),
        hover: {
            x: 5,
            borderColor: "#059669",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        focus: {
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(5, 150, 105, 0.2)",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(5, 150, 105, 0.3)",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.95,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    };

    const mapVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Hero Banner with Image */}
            <motion.div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('')`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Dark Overlay for text readability */}
                <motion.div 
                    className="absolute inset-0 bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
                
                <AnimatedBannerText title="Contact Us" description="The City College of Cagayan de Oro is ready to provide the right solution according to your needs." />
            </motion.div>

            {/* Main Content */}
            <motion.div 
                className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Contact Information */}
                    <motion.div variants={itemVariants}>
                        <motion.h3 
                            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                            variants={titleVariants}
                        >
                            <span className="text-[#059669]">Get</span> in touch
                        </motion.h3>
                        <motion.p 
                            className="text-gray-600 mb-8"
                            variants={titleVariants}
                            transition={{ delay: 0.1 }}
                        >
                            The City College of Cagayan de Oro serves active learners all over different regions of the world.
                        </motion.p>

                        <motion.div className="space-y-4">
                            {offices.map((office, index) => (
                                <motion.div 
                                    key={office.id} 
                                    className="border-l-4 border-transparent hover:border-[#059669] pl-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 group cursor-pointer transition-all duration-300"
                                    custom={index}
                                    variants={officeCardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                >
                                    <motion.h4 
                                        className="font-semibold text-green-800 text-lg mb-2 group-hover:text-[#059669] transition-colors duration-200"
                                    >
                                        {office.title}
                                    </motion.h4>
                                    <motion.p 
                                        className="text-gray-600 text-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.08 + 0.2 }}
                                    >
                                        {office.address}
                                    </motion.p>
                                    <motion.p 
                                        className="text-gray-600 text-sm mt-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.08 + 0.3 }}
                                    >
                                        <span className="font-medium text-[#059669]">Email:</span> {office.email}
                                    </motion.p>
                                    <motion.p 
                                        className="text-gray-600 text-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.08 + 0.4 }}
                                    >
                                        <span className="font-medium text-[#059669]">Phone:</span> {office.phone}
                                    </motion.p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Contact Form and Map */}
                    <motion.div variants={itemVariants}>
                        <motion.div 
                            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
                            variants={formVariants}
                            whileHover={{ 
                                boxShadow: "0 20px 60px rgba(5, 150, 105, 0.12)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.h3 
                                className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
                                variants={titleVariants}
                            >
                                Send us a <span className="text-[#059669]">message</span>
                            </motion.h3>
                            
                            <form className="space-y-4">
                                <motion.div variants={inputVariants}>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <motion.input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition"
                                        placeholder="Enter your name"
                                        whileFocus="focus"
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.1 }}
                                    />
                                </motion.div>

                                <motion.div variants={inputVariants}>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                        Company
                                    </label>
                                    <motion.input
                                        type="text"
                                        id="company"
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition"
                                        placeholder="Enter your company"
                                        whileFocus="focus"
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.2 }}
                                    />
                                </motion.div>

                                <motion.div variants={inputVariants}>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <motion.input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition"
                                        placeholder="Enter your phone number"
                                        whileFocus="focus"
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.3 }}
                                    />
                                </motion.div>

                                <motion.div variants={inputVariants}>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <motion.input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition"
                                        placeholder="Enter your email"
                                        whileFocus="focus"
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.4 }}
                                    />
                                </motion.div>

                                <motion.div variants={inputVariants}>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <motion.input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition"
                                        placeholder="Enter subject"
                                        whileFocus="focus"
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.5 }}
                                    />
                                </motion.div>

                                <motion.div variants={inputVariants}>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <motion.textarea
                                        id="message"
                                        rows="4"
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent outline-none transition resize-none"
                                        placeholder="Enter your message"
                                        whileFocus="focus"
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.6 }}
                                    ></motion.textarea>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#059669] to-[#047857] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#047857] hover:to-[#065f46] transition duration-200 shadow-md hover:shadow-lg"
                                    variants={buttonVariants}
                                    initial="idle"
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Google Maps - Directly Below Form */}
                        <motion.div 
                            className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6"
                            variants={mapVariants}
                            whileHover={{ 
                                boxShadow: "0 20px 60px rgba(5, 150, 105, 0.12)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div 
                                className="w-full h-[300px] md:h-[350px] rounded-lg overflow-hidden"
                                initial={{ scale: 0.98, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
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
                            </motion.div>
                            <motion.p 
                                className="text-center text-gray-500 text-xs md:text-sm mt-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <span className="text-[#059669] font-medium">📍</span> FPQQ+P6F, Cagayan De Oro City, Misamis Oriental
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating Animation Elements */}
            <motion.div
                className="fixed bottom-8 right-8 z-40"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    delay: 1.5,
                    duration: 0.5,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 200
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.a
                    href="mailto:registrar.citycollegeofcdo@gmail.com"
                    className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#059669] to-[#047857] text-white rounded-full shadow-2xl hover:shadow-green-500/30 transition-all duration-200"
                    animate={{
                        boxShadow: [
                            "0 0 0 0 rgba(5, 150, 105, 0.4)",
                            "0 0 0 20px rgba(5, 150, 105, 0)",
                            "0 0 0 0 rgba(5, 150, 105, 0.4)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </motion.a>
            </motion.div>
        </MainLayout>
    );
}