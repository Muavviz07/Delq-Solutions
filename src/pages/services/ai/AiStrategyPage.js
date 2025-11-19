import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function AiStrategyPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/ai/ai-strategy-data"
        />
    );
}