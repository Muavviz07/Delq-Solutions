import React from 'react';
import GenericSolutionPage from './GenericSolutionPage';

export default function EnterpriseApplicationsPage() {
    return <GenericSolutionPage fetchUrl="/api/solutions/enterprise-applications-data" />;
}