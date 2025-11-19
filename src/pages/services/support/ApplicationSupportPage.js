import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function ApplicationSupportPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/support/application-support-data"
        />
    );
}