import React from 'react';
import GenericServicePage from './GenericServicePage'; // Make sure this path is correct

export default function SoftwareDevelopmentPage() {
    // This component renders the overview page for Software Development
    return (
        <GenericServicePage
            fetchUrl="/api/services/software-development-data" // Check this URL matches the endpoint in main.py
        />
    );
}