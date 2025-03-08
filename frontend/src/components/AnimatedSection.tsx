import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    id?: string;
}

/**
 * Componente de seção animada que usa Framer Motion para criar efeitos de fade-in
 * conforme o usuário rola a página
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    delay = 0,
    className = '',
    id
}) => {
    const variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <motion.section
            className={className}
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants}
        >
            {children}
        </motion.section>
    );
}; 