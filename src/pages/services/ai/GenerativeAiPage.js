import React from 'react';
import GenericServicePage from '../GenericServicePage'; // Import parent GenericServicePage

export default function GenerativeAiPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/ai/generative-ai-data"
        />
    );
}