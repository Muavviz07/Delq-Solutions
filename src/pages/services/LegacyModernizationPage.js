import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function LegacyModernizationPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/legacy-modernization-data"
        />
    );
}