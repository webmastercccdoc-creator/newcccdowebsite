import { useEffect } from 'react';
import ExtensionComingSoon from './ExtensionComingSoon';

export default function Outreach() {
    useEffect(() => {
        document.title = 'Outreach and Volunteerism - City College of Cagayan de Oro';
    }, []);

    return (
        <ExtensionComingSoon />
    );
}
