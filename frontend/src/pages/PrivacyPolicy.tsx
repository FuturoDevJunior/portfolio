import React from 'react';
import LegalPage from '../components/LegalPage';

export function PrivacyPolicy() {
    const privacySections = [
        { id: 1, hasMultipleContents: true },
        { id: 2, hasList: true, containsHtml: true },
        { id: 3, hasList: true },
        { id: 4, hasList: true },
        { id: 5, hasList: true, containsHtml: true },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
    ];

    return (
        <LegalPage
            translationRoot="privacyPage"
            sections={privacySections}
            emailContact={true}
        />
    );
}

export default PrivacyPolicy; 