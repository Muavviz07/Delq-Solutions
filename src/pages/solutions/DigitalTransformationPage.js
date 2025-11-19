import React from 'react';
import GenericSolutionPage from './GenericSolutionPage'; // <-- Import the new generic template

export default function DigitalTransformationPage() {
    return (
        <GenericSolutionPage
            fetchUrl="/api/solutions/digital-transformation-data" // <-- Point to the new API endpoint
            pageType="Digital Transformation" // Optional: helps with breadcrumbs if API doesn't provide them
        />
    );
}
