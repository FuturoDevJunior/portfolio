import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { ChevronLeft, List, X, ChevronUp } from "lucide-react";
import { SkipLink, AccessibilityControls } from "..";

interface LegalPageProps {
  title: string;
  children: ReactNode;
  lastUpdated?: string; // Data opcional da última atualização
}

interface Section {
  id: string;
  title: string;
}

const LegalPage: React.FC<LegalPageProps> = ({
  title,
  children,
  lastUpdated,
}) => {
  const { t, language } = useLanguage();
  const [sections, setSections] = useState<Section[]>([]);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Textos traduzidos
  const texts = {
    home: language === "pt" ? "Início" : "Home",
    legal: language === "pt" ? "Legal" : "Legal",
    termsOfUse: language === "pt" ? "Termos de Uso" : "Terms of Use",
    privacyPolicy:
      language === "pt" ? "Política de Privacidade" : "Privacy Policy",
    backToHome:
      language === "pt" ? "Voltar para a página inicial" : "Back to home",
    lastUpdated: language === "pt" ? "Última atualização" : "Last updated",
    tableOfContents: language === "pt" ? "Índice" : "Table of Contents",
    closeMenu: language === "pt" ? "Fechar menu" : "Close menu",
    backToTop: language === "pt" ? "Voltar ao topo" : "Back to top",
    skipToContent:
      language === "pt" ? "Pular para o conteúdo" : "Skip to content",
    skipToNavigation:
      language === "pt" ? "Pular para a navegação" : "Skip to navigation",
    skipToFooter: language === "pt" ? "Pular para o rodapé" : "Skip to footer",
  };

  // Formatação da data de última atualização
  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString(
        language === "pt" ? "pt-BR" : language === "es" ? "es-ES" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : new Date().toLocaleDateString(
        language === "pt" ? "pt-BR" : language === "es" ? "es-ES" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      );

  // Função para detectar seções no documento
  const detectSections = () => {
    console.log("Detectando seções...");
    setTimeout(() => {
      const sectionElements = document.querySelectorAll("section[id]");
      if (sectionElements.length > 0) {
        const extractedSections = Array.from(sectionElements).map(
          (section) => ({
            id: section.id,
            title: section.querySelector("h2")?.textContent || section.id,
          })
        );
        setSections(extractedSections);
        console.log("Seções detectadas:", extractedSections);
      } else {
        console.log("Nenhuma seção detectada. Tentando novamente...");
        // Se não encontrou seções, tenta novamente após um tempo maior
        setTimeout(detectSections, 1000);
      }
    }, 500);
  };

  // Detectar seções do documento quando o componente for montado
  useEffect(() => {
    detectSections();

    // Também detecta quando o evento customizado for disparado
    const handleContentLoaded = () => {
      console.log("Evento contentLoaded capturado");
      detectSections();
    };

    window.addEventListener("contentLoaded", handleContentLoaded);

    // Última tentativa após um tempo maior para garantir que tudo está carregado
    const finalTimeout = setTimeout(detectSections, 2000);

    return () => {
      window.removeEventListener("contentLoaded", handleContentLoaded);
      clearTimeout(finalTimeout);
    };
  }, [children]);

  // Mostrar/ocultar botão "voltar ao topo" com base no scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para rolar suavemente até uma seção
  const scrollToSection = (sectionId: string) => {
    console.log("Tentando rolar para seção:", sectionId);
    const element = document.getElementById(sectionId);

    if (element) {
      console.log("Elemento encontrado, rolando...");
      // Fecha o menu em dispositivos móveis
      setShowTableOfContents(false);

      // Pequeno delay para garantir que o menu esteja fechado antes de rolar
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
        // Adicionar um pequeno ajuste para considerar o cabeçalho fixo
        window.scrollBy(0, -80);
        // Colocar foco no elemento para leitores de tela
        element.setAttribute("tabindex", "-1");
        element.focus();
      }, 100);
    } else {
      console.log("Elemento não encontrado:", sectionId);
    }
  };

  // Função para rolar ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Renderiza o índice de navegação
  const renderNavigationItems = () => {
    if (sections.length === 0) {
      return <p className="text-gray-400 text-sm">Carregando índice...</p>;
    }

    return (
      <ul className="space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className="hover:text-purple-400 transition-colors w-full text-left py-1"
              type="button"
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      {/* Skip Links para acessibilidade */}
      <div className="skip-links sr-only focus-within:not-sr-only">
        <a
          href="#main-content"
          className="absolute z-50 bg-purple-700 text-white px-4 py-2 left-2 top-2 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {texts.skipToContent}
        </a>
        <a
          href="#table-of-contents"
          className="absolute z-50 bg-purple-700 text-white px-4 py-2 left-2 top-12 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {texts.skipToNavigation}
        </a>
        <a
          href="#footer"
          className="absolute z-50 bg-purple-700 text-white px-4 py-2 left-2 top-22 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {texts.skipToFooter}
        </a>
      </div>

      <AccessibilityControls />

      {/* Cabeçalho com navegação */}
      <header className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-purple-900/30 z-10 shadow-sm shadow-purple-900/10">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            DevFerreiraG
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/terms"
              className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
            >
              {texts.termsOfUse}
            </Link>
            <Link
              to="/privacy"
              className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
            >
              {texts.privacyPolicy}
            </Link>
          </div>
        </nav>
      </header>

      {/* Botão para voltar à página inicial */}
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {texts.backToHome}
        </Link>
      </div>

      {/* Conteúdo principal */}
      <main
        className="container mx-auto px-4 sm:px-6 flex-grow mb-16"
        id="main-content"
        tabIndex={-1}
      >
        <div className="max-w-4xl mx-auto">
          {/* Título da página */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold pb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {title}
            </h1>

            {/* Botão do índice em dispositivos móveis */}
            <button
              className="md:hidden p-2 rounded-full bg-purple-900/20 hover:bg-purple-900/40 transition-colors"
              onClick={() => setShowTableOfContents(!showTableOfContents)}
              aria-label={
                showTableOfContents ? texts.closeMenu : texts.tableOfContents
              }
              type="button"
            >
              {showTableOfContents ? <X size={20} /> : <List size={20} />}
            </button>
          </div>

          {/* Layout flexível para desktop: menu lateral + conteúdo */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Menu de navegação lateral (visível apenas em desktop) */}
            <aside className="hidden md:block w-64 shrink-0">
              <div
                className="sticky top-24 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
                id="table-of-contents"
                tabIndex={-1}
              >
                <h2 className="font-bold text-lg mb-3 pb-2 border-b border-gray-700/50">
                  {texts.tableOfContents}
                </h2>
                <nav aria-label={texts.tableOfContents}>
                  {renderNavigationItems()}
                </nav>
              </div>
            </aside>

            {/* Menu de navegação móvel (overlay) */}
            {showTableOfContents && (
              <div className="md:hidden fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                <div className="bg-gray-800 w-full max-w-sm rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">
                      {texts.tableOfContents}
                    </h2>
                    <button
                      onClick={() => setShowTableOfContents(false)}
                      className="p-1 rounded-full hover:bg-gray-700"
                      aria-label={texts.closeMenu}
                      type="button"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <nav aria-label={texts.tableOfContents}>
                    <ul className="space-y-3">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className="w-full text-left py-2 px-3 rounded hover:bg-gray-700 transition-colors"
                            type="button"
                          >
                            {section.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}

            {/* Conteúdo da página */}
            <div className="flex-1 prose prose-invert prose-lg max-w-none">
              {children}

              {/* Data da última atualização */}
              <div className="mt-10 pt-6 border-t border-gray-700 text-sm">
                <p className="text-gray-400">
                  {texts.lastUpdated}: {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Botão Voltar ao topo */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors z-10 flex items-center justify-center"
          aria-label={texts.backToTop}
          type="button"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Rodapé */}
      <footer
        className="bg-gray-900 border-t border-gray-800 py-8"
        id="footer"
        tabIndex={-1}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              © {new Date().getFullYear()} DevFerreiraG. {t("todosOsDireitos")}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-white hover:text-purple-400 transition-colors"
              >
                {texts.termsOfUse}
              </Link>
              <Link
                to="/privacy"
                className="text-white hover:text-purple-400 transition-colors"
              >
                {texts.privacyPolicy}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
