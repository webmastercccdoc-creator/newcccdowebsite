import { motion } from 'framer-motion';

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

export default function AnimatedBannerText({ title, description, titleClassName, descriptionClassName }) {
    return (
        <motion.div
            className="relative z-10 mx-auto max-w-5xl px-6 text-center"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.2,
                    },
                },
            }}
        >
            <motion.h1
                variants={textVariants}
                className={titleClassName || 'text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl'}
            >
                {title}
            </motion.h1>
            <motion.p
                variants={textVariants}
                className={descriptionClassName || 'mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md'}
            >
                {description}
            </motion.p>
        </motion.div>
    );
}
