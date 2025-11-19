import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function AutomationTestingPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/qa/automated-testing-data"
        />
    );
}