import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function SecurityTestingPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/qa/security-testing-data"
        />
    );
}
