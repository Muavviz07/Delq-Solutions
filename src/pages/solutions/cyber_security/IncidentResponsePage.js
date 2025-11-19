import React from 'react';
import GenericSolutionPage from '../GenericSolutionPage'; // Fixed import path

export default function IncidentResponsePage() {
    return <GenericSolutionPage fetchUrl="/api/solutions/incident-response-data" />;
}