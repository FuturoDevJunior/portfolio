import React from 'react';
import LegalPage from '../components/LegalPage';

export function TermsOfUse() {
    const termsSections = [
        { id: 1 },
        { id: 2 },
        { id: 3, hasList: true },
        { id: 4, hasMultipleContents: true },
        { id: 5 },
        { id: 6 },
        { id: 7, hasList: true },
        { id: 8 },
        { id: 9 },
        { id: 10 },
    ];

    return (
        <LegalPage
            translationRoot="termsPage"
            sections={termsSections}
            emailContact={true}
        />
    );
}

export default TermsOfUse; 