import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function SystemMaintenancePage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/support/system-maintenance-data"
        />
    );
}