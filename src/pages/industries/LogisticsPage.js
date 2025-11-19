import React from 'react';
import GenericIndustryPage from './GenericIndustryPage';

export default function LogisticsPage() {
    return <GenericIndustryPage fetchUrl="/api/industries/logistics-data" />;
}
