import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function CloudServicesPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/cloud-services-data"
        />
    );
}