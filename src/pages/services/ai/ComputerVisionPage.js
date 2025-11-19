import React from 'react';
import GenericServicePage from '../GenericServicePage';

export default function ComputerVisionPage() {
    return (
        <GenericServicePage
            fetchUrl="/api/services/ai/computer-vision-data"
        />
    );
}