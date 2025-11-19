import React from 'react';
import GenericSolutionPage from '../GenericSolutionPage';

export default function ErpSystemsPage() {
    return <GenericSolutionPage fetchUrl="/api/solutions/supply-chain-data" />;
}