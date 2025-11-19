import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function QualityAssurancePage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/quality-assurance-data"
        />
    );
}