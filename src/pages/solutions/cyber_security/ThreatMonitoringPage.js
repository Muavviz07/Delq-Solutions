import React from 'react';
import GenericSolutionPage from '../GenericSolutionPage'; // Fixed import path

export default function ThreatMonitoringPage() {
    return <GenericSolutionPage fetchUrl="/api/solutions/threat-monitoring-data" />;
}