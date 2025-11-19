import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function SaasDevelopmentPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/cloud/saas-data"
        />
    );
}