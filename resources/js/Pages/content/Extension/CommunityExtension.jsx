import { useEffect } from 'react';
import ExtensionComingSoon from './ExtensionComingSoon';

export default function CommunityExtension() {
    useEffect(() => {
        document.title = 'Community Extension Programs - City College of Cagayan de Oro';
    }, []);

    return (
        <ExtensionComingSoon
            title="Community Extension Programs"
            description="Discover the community outreach and extension programs of the City College of Cagayan de Oro."
        />
    );
}
