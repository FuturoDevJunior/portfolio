import React from 'react';

/**
 * Componente para controle de modo lúcido em vídeos
 * Implementação para resolver erro de referência
 */
export const LucidModeButton = ({ onClick, isActive = false }: { onClick?: () => void, isActive?: boolean }) => {
    return (
        <button
            className={`flex items-center px-2 py-1 rounded text-sm ${isActive ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={onClick}
            title="Modo Lúcido"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
            >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
            Modo Lúcido
        </button>
    );
};

export default LucidModeButton; 