import { useState, useEffect, useCallback } from 'react';

// Chaves para armazenar as preferências no localStorage
const HIGH_CONTRAST_KEY = 'accessibility_high_contrast';
const READING_MODE_KEY = 'accessibility_reading_mode';

/**
 * Hook para gerenciar as configurações de acessibilidade
 * Implementa persistência via localStorage e aplica as classes CSS necessárias
 */
export function useAccessibility() {
    // Estados para os diferentes modos
    const [highContrast, setHighContrast] = useState<boolean>(false);
    const [readingMode, setReadingMode] = useState<boolean>(false);

    // Carregar preferências salvas ao inicializar
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Verificar preferências salvas
            const savedHighContrast = localStorage.getItem(HIGH_CONTRAST_KEY) === 'true';
            const savedReadingMode = localStorage.getItem(READING_MODE_KEY) === 'true';

            // Definir estados iniciais
            setHighContrast(savedHighContrast);
            setReadingMode(savedReadingMode);

            // Aplicar classes se necessário
            if (savedHighContrast) {
                document.documentElement.classList.add('high-contrast-mode');
            }

            if (savedReadingMode) {
                document.documentElement.classList.add('reading-mode');
            }

            // Verificar se o usuário tem preferência por contraste no sistema
            const prefersContrast = window.matchMedia('(prefers-contrast: more)').matches;
            if (prefersContrast && !savedHighContrast && !localStorage.getItem(HIGH_CONTRAST_KEY)) {
                setHighContrast(true);
                document.documentElement.classList.add('high-contrast-mode');
                localStorage.setItem(HIGH_CONTRAST_KEY, 'true');
            }
        }
    }, []);

    // Toggle para o modo de alto contraste
    const toggleHighContrast = useCallback(() => {
        setHighContrast(prev => {
            const newValue = !prev;

            if (typeof window !== 'undefined') {
                localStorage.setItem(HIGH_CONTRAST_KEY, String(newValue));

                if (newValue) {
                    document.documentElement.classList.add('high-contrast-mode');
                    // Desativar modo de leitura se estiver ativo
                    if (readingMode) {
                        setReadingMode(false);
                        localStorage.setItem(READING_MODE_KEY, 'false');
                        document.documentElement.classList.remove('reading-mode');
                    }
                } else {
                    document.documentElement.classList.remove('high-contrast-mode');
                }
            }

            return newValue;
        });
    }, [readingMode]);

    // Toggle para o modo de leitura
    const toggleReadingMode = useCallback(() => {
        setReadingMode(prev => {
            const newValue = !prev;

            if (typeof window !== 'undefined') {
                localStorage.setItem(READING_MODE_KEY, String(newValue));

                if (newValue) {
                    document.documentElement.classList.add('reading-mode');
                    // Desativar alto contraste se estiver ativo
                    if (highContrast) {
                        setHighContrast(false);
                        localStorage.setItem(HIGH_CONTRAST_KEY, 'false');
                        document.documentElement.classList.remove('high-contrast-mode');
                    }
                } else {
                    document.documentElement.classList.remove('reading-mode');
                }
            }

            return newValue;
        });
    }, [highContrast]);

    // Resetar todos os modos para padrão
    const resetModes = useCallback(() => {
        if (typeof window !== 'undefined') {
            setHighContrast(false);
            setReadingMode(false);
            localStorage.setItem(HIGH_CONTRAST_KEY, 'false');
            localStorage.setItem(READING_MODE_KEY, 'false');
            document.documentElement.classList.remove('high-contrast-mode', 'reading-mode');
        }
    }, []);

    return {
        highContrast,
        readingMode,
        toggleHighContrast,
        toggleReadingMode,
        resetModes
    };
} 