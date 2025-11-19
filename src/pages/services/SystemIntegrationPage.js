import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function SystemIntegrationPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/system-integration-data"
        />
    );
}
