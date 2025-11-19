import React from 'react';
import GenericIndustryPage from './GenericIndustryPage'; // <-- Import the new industry template

export default function EducationPage() {
    return (
        <GenericIndustryPage
            fetchUrl="/api/industries/education-data" // <-- Point to the new API endpoint
        />
    );
}
