import React from 'react';
import GenericIndustryPage from './GenericIndustryPage';

export default function EnergyPage() {
    return <GenericIndustryPage fetchUrl="/api/industries/energy-data" />;
}
