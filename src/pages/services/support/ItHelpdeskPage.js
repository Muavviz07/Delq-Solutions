import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function ItHelpdeskPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/support/it-helpdesk-data"
        />
    );
}