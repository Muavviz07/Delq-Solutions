import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function CloudMigrationPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/cloud/migration-data"
        />
    );
}