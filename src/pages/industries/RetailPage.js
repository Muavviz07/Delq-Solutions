import React from 'react';
import GenericIndustryPage from './GenericIndustryPage';

export default function RetailPage() {
    return <GenericIndustryPage fetchUrl="/api/industries/retail-data" />;
}
