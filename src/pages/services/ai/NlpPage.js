import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function NlpPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/ai/nlp-data"
        />
    );
}