import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function EnterpriseSoftwarePage() {
    // This component renders the page for Enterprise Software Development
    return (
        <GenericServicePage
            fetchUrl="/api/services/enterprise-software-data"
        />
    );
}
