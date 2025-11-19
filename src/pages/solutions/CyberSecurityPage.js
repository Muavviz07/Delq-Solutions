import React from 'react';
import GenericSolutionPage from './GenericSolutionPage';

export default function CyberSecurityPage() {
    return <GenericSolutionPage fetchUrl="/api/solutions/cyber-security-data" />;
}