import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function BusinessIntelligencePage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/business-intelligence-data"
        />
    );
}
