import React from 'react';
import GenericIndustryPage from './GenericIndustryPage';

export default function HealthcarePage() {
    return <GenericIndustryPage fetchUrl="/api/industries/healthcare-data" />;
}
