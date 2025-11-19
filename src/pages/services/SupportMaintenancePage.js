import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function SupportMaintenancePage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/support-maintenance-data"
        />
    );
}