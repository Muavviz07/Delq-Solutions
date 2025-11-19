import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function ITStrategyPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/it-strategy-data"
        />
    );
}