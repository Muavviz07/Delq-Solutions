import React from 'react';
import GenericServicePage from './GenericServicePage';

export default function DigitalTransformationPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/digital-transformation-data"
        />
    );
}