import { useEffect } from 'react';
import ExtensionComingSoon from '../Extension/ExtensionComingSoon';

export default function NSTP() {
    useEffect(() => {
        document.title = 'National Service Training Program - City College of Cagayan de Oro';
    }, []);

    return (
        <ExtensionComingSoon
            title="National Service Training Program"
            description="Civic welfare, literacy training, and national defense preparedness for the youth."
        />
    );
}