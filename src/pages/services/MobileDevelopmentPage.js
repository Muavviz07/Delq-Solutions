import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function MobileDevelopmentPage() {
    // To add a new page, you just copy this file and change the URL!
    return (
        <GenericServicePage 
            fetchUrl="/api/services/mobile-development-data" 
        />
    );
}
