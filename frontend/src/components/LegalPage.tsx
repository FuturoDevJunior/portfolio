import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import DOMPurify from 'isomorphic-dompurify';
import SkipLink from './SkipLink';
import AccessibilityControls from './AccessibilityControls';

interface ListItemProps {
    content: string;
    index: number;
    containsHtml?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ content, index, containsHtml = false }) => {
    if (containsHtml) {
        // Sanitizar HTML antes de renderizar
        const sanitizedContent = DOMPurify.sanitize(content);
        return <li key={index} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
    }
    return <li key={index}>{content}</li>;
};

interface SectionProps {
    translationRoot: string;
    sectionNumber: number;
    containsHtml?: boolean;
    hasList?: boolean;
    hasMultipleContents?: boolean;
    isLastSection?: boolean;
    emailLink?: boolean;
}

const Section: React.FC<SectionProps> = ({
    translationRoot,
    sectionNumber,
    containsHtml = false,
    hasList = false,
    hasMultipleContents = false,
    isLastSection = false,
    emailLink = false
}) => {
    const { t } = useLanguage();
    const base = `${translationRoot}.section${sectionNumber}`;
    const sectionId = `section-${sectionNumber}`;

    return (
        <section className={isLastSection ? '' : 'mb-8'} id={sectionId}>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                {t(`${base}.title`)}
            </h2>

            {hasMultipleContents ? (
                <>
                    <p className="mb-4">{t(`${base}.content1`)}</p>
                    <p>{t(`${base}.content2`)}</p>
                </>
            ) : (
                <p className="mb-4">
                    {t(`${base}.content`)}
                    {emailLink && isLastSection && (
                        <a
                            href="mailto:Contato.FerreiraG@outlook.com"
                            className="text-purple-400 hover:underline ml-1"
                            aria-label="Enviar email para Contato.FerreiraG@outlook.com"
                        >
                            Contato.FerreiraG@outlook.com
                        </a>
                    )}
                </p>
            )}

            {hasList && (
                <ul className="list-disc pl-6 space-y-2" aria-label={`Lista de ${t(`${base}.title`)}`}>
                    {(t(`${base}.list`) as string[]).map((item, idx) => (
                        <ListItem
                            key={idx}
                            content={item}
                            index={idx}
                            containsHtml={containsHtml}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
};

export interface LegalPageProps {
    translationRoot: 'privacyPage' | 'termsPage';
    sections: {
        id: number;
        containsHtml?: boolean;
        hasList?: boolean;
        hasMultipleContents?: boolean;
    }[];
    emailContact?: boolean;
}

const LegalPage: React.FC<LegalPageProps> = ({
    translationRoot,
    sections,
    emailContact = true
}) => {
    const { t } = useLanguage();

    // Determinar o título correto para o documento
    const pageTitle = t(`${translationRoot}.title`);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Skip link para acessibilidade por teclado */}
            <SkipLink />

            {/* Controls para acessibilidade */}
            <AccessibilityControls />

            {/* Header simplificado */}
            <header className="border-b border-gray-800 bg-black/90 backdrop-blur-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2 hover:text-purple-400 transition-colors" aria-label="Voltar para a página inicial">
                        <span className="text-xl font-bold">DevFerreiraG</span>
                    </a>
                </div>
            </header>

            {/* Conteúdo principal */}
            <main id="main-content" className="container mx-auto px-4 py-12" tabIndex={-1}>
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{pageTitle}</h1>

                {/* Navegação de seções */}
                <nav aria-label="Seções do documento" className="mb-8 hidden md:block">
                    <h2 className="sr-only">Navegação de Seções</h2>
                    <ul className="flex flex-wrap gap-2 justify-center">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#section-${section.id}`}
                                    className="text-sm px-3 py-1 bg-gray-800 rounded hover:bg-purple-700 transition-colors"
                                >
                                    {section.id}. {t(`${translationRoot}.section${section.id}.title`)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="max-w-4xl mx-auto bg-gray-900/50 p-6 md:p-8 rounded-lg shadow-lg">
                    {sections.map((section, index) => (
                        <Section
                            key={section.id}
                            translationRoot={translationRoot}
                            sectionNumber={section.id}
                            containsHtml={section.containsHtml}
                            hasList={section.hasList}
                            hasMultipleContents={section.hasMultipleContents}
                            isLastSection={index === sections.length - 1}
                            emailLink={emailContact && index === sections.length - 1}
                        />
                    ))}

                    <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400">
                        <p>
                            {t(`${translationRoot}.lastUpdate`)} {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Botão de volta ao topo */}
                <div className="flex justify-center mt-8">
                    <a
                        href="#"
                        className="bg-gray-800 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
                        aria-label="Voltar ao topo da página"
                    >
                        {t('nav.backToTop')}
                    </a>
                </div>
            </main>

            {/* Footer simplificado */}
            <footer className="bg-black border-t border-gray-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} DevFerreiraG. {t(`${translationRoot}.rights`)}</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a
                                href="/"
                                className="hover:text-purple-400 transition-colors"
                                aria-label="Voltar para a página inicial"
                            >
                                {t(`${translationRoot}.backToHome`)}
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LegalPage; 