import React from 'react';
import GenericIndustryPage from './GenericIndustryPage';

export default function ManufacturingPage() {
    return <GenericIndustryPage fetchUrl="/api/industries/manufacturing-data" />;
}
