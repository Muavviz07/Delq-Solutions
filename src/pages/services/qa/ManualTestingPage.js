import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function ManualTestingPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/qa/manual-testing-data"
        />
    );
}