import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function WebDevelopmentPage() {
    // This component just tells the generic template WHICH data to fetch.
    return (
        <GenericServicePage 
            fetchUrl="/api/services/web-development-data" 
        />
    );
}
