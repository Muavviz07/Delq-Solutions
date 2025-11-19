import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function SoftwareSupportPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/support/software-support-data"
        />
    );
}