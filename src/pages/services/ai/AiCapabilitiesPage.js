import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function AiCapabilitiesPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/ai-capabilities-data"
        />
    );
}