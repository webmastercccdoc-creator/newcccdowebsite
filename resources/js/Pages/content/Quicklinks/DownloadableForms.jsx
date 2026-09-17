import { useEffect, useState, useMemo } from "react";
import MainLayout from "../../../layouts/MainLayout";
import AnimatedBannerText from "../../../components/content/AnimatedBannerText";
import formsBannerImg from "../../../assets/banner/the-banner.png"; // ← swap with your forms banner

// Internationalization categories
const INTERNATIONALIZATION_CATEGORIES = [
    "Internationalization",
];

export default function DownloadableForms() {
    useEffect(() => {
        document.title = "Downloadable Forms - City College of Cagayan de Oro";
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");

    // Sample forms — all Internationalization-related
    // Replace `thumbnail` paths with your actual image locations
    const [forms] = useState([
        {
            id: 1,
            title: "Internationalization Form 1",
            description: "Description for Internationalization Form 1.",
            category: "Internationalization",
            fileType: "PDF",
            fileSize: "245 KB",
            uploadDate: "2024-01-15",
            downloads: 1250,
            fileUrl: "/forms/internationalization-form-1.pdf",
            thumbnail: "/thumbnails/internationalization.jpg",
        },
        {
            id: 2,
            title: "Internationalization Form 2",
            description: "Description for Internationalization Form 2.",
            category: "Internationalization",
            fileType: "PDF",
            fileSize: "1.2 MB",
            uploadDate: "2024-02-20",
            downloads: 3200,
            fileUrl: "/forms/internationalization-form-2.pdf",
            thumbnail: "/thumbnails/internationalization.jpg",
        },
        {
            id: 3,
            title: "Internationalization Form 3",
            description: "Description for Internationalization Form 3.",
            category: "Internationalization",
            fileType: "PDF",
            fileSize: "560 KB",
            uploadDate: "2024-03-10",
            downloads: 890,
            fileUrl: "/forms/internationalization-form-3.pdf",
            thumbnail: "/thumbnails/internationalization.jpg",
        },
    ]);

    // Filter dropdown options — "All" + Internationalization categories
    const categories = ["All", ...INTERNATIONALIZATION_CATEGORIES];

    const filteredForms = useMemo(() => {
        let result = [...forms];

        if (searchTerm) {
            result = result.filter(
                (form) =>
                    form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    form.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter((form) => form.category === selectedCategory);
        }

        result.sort((a, b) => {
            switch (sortOrder) {
                case "newest":
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
                case "oldest":
                    return new Date(a.uploadDate) - new Date(b.uploadDate);
                case "popular":
                    return b.downloads - a.downloads;
                case "alphabetical":
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return result;
    }, [forms, searchTerm, selectedCategory, sortOrder]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDownload = (form) => {
        console.log(`Downloading: ${form.title}`);
        window.open(form.fileUrl, "_blank", "noopener,noreferrer");
    };

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
                    backgroundImage: `url('${formsBannerImg}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Downloadable Forms"
                    description="Access and download commonly used forms and templates at City College of Cagayan de Oro."
                />
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Controls: Search + Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    {/* Search Box */}
                    <div className="relative flex-1 min-w-[250px] flex items-center">
                        <input
                            type="text"
                            placeholder="Search forms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search forms"
                            className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[#157d3c]"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="absolute right-3 text-gray-400 hover:text-gray-700 text-base p-1 transition-colors"
                                onClick={() => setSearchTerm("")}
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category Filter + Sort dropdowns */}
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            aria-label="Filter by category"
                            className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-lg text-sm bg-white cursor-pointer outline-none transition-colors duration-200 focus:border-[#157d3c]"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            aria-label="Sort forms"
                            className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-lg text-sm bg-white cursor-pointer outline-none transition-colors duration-200 focus:border-[#157d3c]"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="popular">Most Downloaded</option>
                            <option value="alphabetical">A-Z</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-5 text-gray-500 text-sm">
                    <span>
                        Showing <strong>{filteredForms.length}</strong> of{" "}
                        <strong>{forms.length}</strong> forms
                    </span>
                </div>

                {/* Empty State or Grid */}
                {filteredForms.length === 0 ? (
                    <div className="text-center py-16 px-5 text-gray-500">
                        <h3 className="m-0 mb-2 text-gray-700 text-lg font-semibold">
                            No forms found
                        </h3>
                        <p className="m-0 mb-5">
                            Try adjusting your search or filter criteria
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            className="px-6 py-2.5 bg-[#157d3c] hover:bg-[#0f5c2c] text-white border-none rounded-lg font-semibold cursor-pointer transition-colors duration-200"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredForms.map((form) => (
                            <div
                                key={form.id}
                                className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Thumbnail */}
                                <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                                    {form.thumbnail ? (
                                        <img
                                            src={form.thumbnail}
                                            alt={form.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#157d3c]/10 to-[#157d3c]/20">
                                            <span className="text-sm font-semibold text-[#157d3c] tracking-wide">
                                                {form.fileType}
                                            </span>
                                        </div>
                                    )}

                                    {/* Category Pill overlayed on thumbnail */}
                                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[0.7rem] font-semibold text-[#0f5c2c] rounded-full shadow-sm">
                                        {form.category}
                                    </span>
                                </div>

                                {/* Card Body */}
                                <div className="flex-1 p-5">
                                    <h3 className="m-0 mb-2 text-lg font-semibold text-gray-900 leading-snug">
                                        {form.title}
                                    </h3>
                                    <p className="m-0 mb-4 text-sm text-gray-500 leading-relaxed">
                                        {form.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                        <span>{form.fileSize}</span>
                                        <span>•</span>
                                        <span>{formatDate(form.uploadDate)}</span>
                                        <span>•</span>
                                        <span>
                                            {form.downloads.toLocaleString()} downloads
                                        </span>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-5 py-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => handleDownload(form)}
                                        className="w-full flex items-center justify-center px-4 py-2.5 bg-[#157d3c] hover:bg-[#0f5c2c] active:scale-[0.98] text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}