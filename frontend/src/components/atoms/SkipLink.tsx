import React from 'react';

interface SkipLinkProps {
    targetId: string;
    className?: string;
}

const SkipLink: React.FC<SkipLinkProps> = ({
    targetId,
    className = '',
}) => {
    return (
        <a
            href={`#${targetId}`}
            className={`sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-purple-900 focus:text-white focus:top-0 focus:left-0 ${className}`}
        >
            Pular para o conteúdo principal
        </a>
    );
};

export default SkipLink; 