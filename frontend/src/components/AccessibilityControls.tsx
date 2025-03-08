import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { EyeIcon, BookOpenIcon, SunIcon } from 'lucide-react';

/**
 * Componente que fornece controles de acessibilidade seguindo os padrões WCAG 2.1 AA
 * Permite alternar entre modo padrão, alto contraste e modo de leitura
 */
const AccessibilityControls: React.FC = () => {
    const {
        highContrast,
        readingMode,
        toggleHighContrast,
        toggleReadingMode,
        resetModes
    } = useAccessibility();

    return (
        <div
            className="fixed right-4 bottom-4 z-50 flex flex-col gap-2 bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-700"
            role="region"
            aria-label="Controles de acessibilidade"
        >
            <button
                onClick={resetModes}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors ${!highContrast && !readingMode ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                aria-label="Modo padrão"
                aria-pressed={!highContrast && !readingMode}
                title="Modo padrão"
            >
                <SunIcon className="h-5 w-5" />
            </button>

            <button
                onClick={toggleHighContrast}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors ${highContrast ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                aria-label="Alternar modo de alto contraste"
                aria-pressed={highContrast}
                title="Modo de alto contraste"
            >
                <EyeIcon className="h-5 w-5" />
            </button>

            <button
                onClick={toggleReadingMode}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors ${readingMode ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                aria-label="Alternar modo de leitura"
                aria-pressed={readingMode}
                title="Modo de leitura"
            >
                <BookOpenIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default AccessibilityControls; 