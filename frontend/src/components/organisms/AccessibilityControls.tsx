import React, {
    useEffect,
    useState,
} from 'react';

import { useLanguage } from '../../hooks/useLanguage';

// Helper para garantir que traduções sejam tratadas como string
const asString = (value: unknown): string => {
    if (Array.isArray(value)) {
        return value.join(' ');
    }
    return String(value);
};

const AccessibilityControls: React.FC = () => {
    const { t } = useLanguage();
    const [highContrast, setHighContrast] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    // Aplicar configurações de acessibilidade
    useEffect(() => {
        // Recuperar configurações salvas
        const savedHighContrast = localStorage.getItem('accessibility_highContrast');
        const savedVisibility = localStorage.getItem('accessibility_buttonVisible');

        if (savedHighContrast === 'true') {
            setHighContrast(true);
            document.documentElement.classList.add('high-contrast');
        }

        if (savedVisibility === 'false') {
            setIsVisible(false);
        }
    }, []);

    // Adiciona atalho de teclado para mostrar o botão mesmo se estiver oculto
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Alt+A para mostrar o controle de acessibilidade
            if (e.altKey && e.key === 'a') {
                setIsVisible(true);
                localStorage.setItem('accessibility_buttonVisible', 'true');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleHighContrast = () => {
        setHighContrast(!highContrast);
        if (!highContrast) {
            document.documentElement.classList.add('high-contrast');
            localStorage.setItem('accessibility_highContrast', 'true');
        } else {
            document.documentElement.classList.remove('high-contrast');
            localStorage.setItem('accessibility_highContrast', 'false');
        }
    };

    const hideAccessibilityButton = () => {
        setIsVisible(false);
        localStorage.setItem('accessibility_buttonVisible', 'false');
    };

    // Se o botão não estiver visível, renderizamos apenas um auxílio de "screen reader only"
    // para informar sobre o atalho Alt+A
    if (!isVisible) {
        return (
            <div className="sr-only" role="note" aria-live="polite">
                {asString(t('acessibilidade.atalhoAltA'))}
            </div>
        );
    }

    return (
        <div className="fixed z-40 bottom-4 right-4 flex flex-col items-end">
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/70 hover:bg-purple-800/90 text-white shadow focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 border border-gray-700/50"
                aria-expanded={isOpen}
                aria-label={asString(t('acessibilidade.toggleMenu'))}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M3 12h3m12 0h3M12 3v3m0 12v3"></path>
                </svg>
            </button>

            {isOpen && (
                <div
                    className="mt-2 p-4 bg-black/85 backdrop-blur-md rounded-lg shadow-lg text-sm border border-gray-700/50 animate-fadeIn w-64"
                    role="dialog"
                    aria-label={asString(t('acessibilidade.opcoesAcessibilidade'))}
                >
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-white text-sm font-medium">
                            {asString(t('acessibilidade.titulo'))}
                        </h2>
                        <p className="text-gray-400 text-xs">Alt+A</p>
                    </div>

                    <div className="mb-3">
                        <p className="text-white text-sm mb-2 font-medium">{asString(t('acessibilidade.contraste'))}</p>
                        <button
                            onClick={toggleHighContrast}
                            className={`w-full text-sm px-3 py-2 rounded-md transition-colors ${highContrast
                                ? 'bg-white text-black font-medium'
                                : 'bg-purple-800 text-white hover:bg-purple-700'
                                }`}
                            aria-pressed={highContrast}
                        >
                            {highContrast
                                ? asString(t('acessibilidade.contrasteNormal'))
                                : asString(t('acessibilidade.contrasteAlto'))
                            }
                        </button>
                    </div>

                    <hr className="border-gray-700 my-3" />

                    <button
                        onClick={hideAccessibilityButton}
                        className="w-full text-center text-xs text-gray-400 hover:text-white p-2 rounded hover:bg-gray-800 transition-colors"
                        aria-label={asString(t('acessibilidade.ocultar'))}
                    >
                        {asString(t('acessibilidade.ocultar'))} (Alt+A para reexibir)
                    </button>
                </div>
            )}
        </div>
    );
};

export default AccessibilityControls; 