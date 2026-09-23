import { useEffect, useMemo, useState } from 'react';
import ExtensionComingSoon from './ExtensionComingSoon';

export default function CommunityExtension() {
    useEffect(() => {
        document.title =
            "Community Extension Programs - City College of Cagayan de Oro";
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("All");
    const [sortOrder, setSortOrder] = useState("alphabetical");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const filteredProjects = useMemo(() => {
        let result = [...EXTENSION_PROJECTS];
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.office.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.projectLeader.toLowerCase().includes(q)
            );
        }
        if (selectedYear !== "All")
            result = result.filter((p) => p.year === selectedYear);
        result.sort((a, b) => {
            if (sortOrder === "newest")
                return b.proposedYear.localeCompare(a.proposedYear);
            if (sortOrder === "oldest")
                return a.proposedYear.localeCompare(b.proposedYear);
            if (sortOrder === "alphabetical-desc")
                return b.title.localeCompare(a.title);
            return a.title.localeCompare(b.title);
        });
        return result;
    }, [searchTerm, selectedYear, sortOrder]);

    useEffect(() => setVisibleCount(INITIAL_VISIBLE), [
        searchTerm,
        selectedYear,
        sortOrder,
    ]);

    const visibleProjects = filteredProjects.slice(0, visibleCount);
    const remaining = filteredProjects.length - visibleCount;
    const hasMore = remaining > 0;

    return (
        <ExtensionComingSoon
            title="Community Extension Programs"
            description="Discover the community outreach and extension programs of the City College of Cagayan de Oro."
        />
    );
}
