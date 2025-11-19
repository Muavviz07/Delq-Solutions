import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function ITConsultingPage() {
    // This component renders the page for IT Consulting
    return (
        <GenericServicePage
            fetchUrl="/api/services/it-consulting-data"
        />
    );
}