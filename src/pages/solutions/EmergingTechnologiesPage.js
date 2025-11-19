import React from 'react';
import GenericSolutionPage from './GenericSolutionPage';

export default function EmergingTechnologiesPage() {
    return <GenericSolutionPage fetchUrl="/api/solutions/emerging-technologies-data" />;
}