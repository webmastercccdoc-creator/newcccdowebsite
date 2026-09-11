import { useEffect } from 'react';
import ExtensionComingSoon from './ExtensionComingSoon';

export default function CommunityExtension() {
    useEffect(() => {
        document.title = 'Community Extension Programs - City College of Cagayan de Oro';
    }, []);

    return (
        <ExtensionComingSoon />
    );
}
