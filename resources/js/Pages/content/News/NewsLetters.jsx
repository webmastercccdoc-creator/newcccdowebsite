import { useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";
import NewsLetterBanner from "../../../assets/banner/news-letter.jpg";
import AnimatedBannerText from "../../../components/content/AnimatedBannerText";

export default function NewsLetters() {
    useEffect(() => {
        document.title = "Newsletters - City College of Cagayan de Oro";
    }, []);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* Banner copied from UpcomingEvents (image + overlay + centered text) */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${NewsLetterBanner})`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Newsletters"
                    description="Stay updated with the latest news and announcements from the City College of Cagayan de Oro."
                />
            </div>

            {/* BELOW BANNER IS COMPLETELY EMPTY */}
        </MainLayout>
    );
}
