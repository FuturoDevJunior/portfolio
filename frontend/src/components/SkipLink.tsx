import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Componente SkipLink para acessibilidade por teclado
 * Permite que usuários de teclado pulem diretamente para o conteúdo principal
 */
const SkipLink: React.FC = () => {
    const { t } = useLanguage();

    const skipText = {
        pt: 'Pular para o conteúdo principal',
        en: 'Skip to main content',
        es: 'Saltar al contenido principal'
    };

    const getSkipText = () => {
        try {
            return t('accessibility.skipToContent');
        } catch {
            // Fallback se a tradução não estiver disponível
            return skipText[t('language') as keyof typeof skipText] || skipText.en;
        }
    };

    return (
        <a
            href="#main-content"
            className="skip-link"
            data-testid="skip-link"
        >
            {getSkipText()}
        </a>
    );
};

export default SkipLink; 