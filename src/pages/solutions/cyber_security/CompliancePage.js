import React from 'react';
import GenericSolutionPage from '../GenericSolutionPage'; // Fixed import path

export default function CompliancePage() {
    return <GenericSolutionPage fetchUrl="/api/solutions/compliance-data" />;
}