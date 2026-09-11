import { useEffect } from 'react';
import ExtensionComingSoon from './ExtensionComingSoon';

export default function Advocacy() {
    useEffect(() => {
        document.title = 'Advocacy-Based Centers - City College of Cagayan de Oro';
    }, []);

    return (
        <ExtensionComingSoon />
    );
}
