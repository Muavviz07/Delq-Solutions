import React from 'react';
import GenericSolutionPage from '../GenericSolutionPage';

export default function AiMlSolutionsPage() {
    return <GenericSolutionPage fetchUrl="/api/solutions/ai-ml-data" />;
}