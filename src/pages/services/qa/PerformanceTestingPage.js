import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function PerformanceTestingPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/qa/performance-testing-data"
        />
    );
}