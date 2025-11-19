import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function CloudManagementPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/cloud/management-data"
        />
    );
}