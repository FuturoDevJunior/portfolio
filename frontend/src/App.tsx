import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Brain,
  ChevronUp,
  Code,
  Database,
  GitBranch,
  LinkedinIcon,
  Mail,
  MapPin,
  Menu,
  Phone,
  Terminal,
  X,
  Zap,
} from 'lucide-react';

import {
  AccessibilityControls,
  AnimatedSection,
  CaseStudyCard,
  ContactForm,
  ExpertiseCard,
  LanguageSelector,
  ServiceCard,
  SkipLink,
  TechStackBadge,
} from './components';
import { useLanguage } from './hooks/useLanguage';
import { usePlausible } from './hooks/usePlausible';

// Helper para garantir que traduções sejam tratadas como string
const asString = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join(' ');
  }
  return String(value);
};

function App() {
  // Referências para seções
  const servicesRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Estado para menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Estado para o botão de voltar ao topo
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Hook de tradução
  const { language, setLanguage, t } = useLanguage();

  // Hook para analytics
  usePlausible();

  // Monitorar o scroll para mostrar/ocultar o botão "Voltar ao topo"
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para scroll suave até uma seção
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    // Fechar menu mobile após clicar em um link
    setIsMobileMenuOpen(false);
  };

  // Função para scroll para o topo da página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Fechar menu mobile após clicar
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Acessibilidade e navegação por teclado */}
      <SkipLink targetId="main-content" />
      <AccessibilityControls />

      {/* Header */}
      <header className="fixed top-0 w-full border-b border-gray-800 bg-black/50 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors"
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            aria-label={asString(t('nav.backToTop'))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
              }
            }}
          >
            <Terminal className="w-6 h-6" aria-hidden="true" />
            <span className="text-xl font-bold">DevFerreiraG</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8" aria-label={asString(t('nav.mainNavigation'))}>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="hover:text-purple-400 transition-colors"
              aria-label={asString(t('nav.services'))}
            >
              {asString(t('nav.services'))}
            </button>
            <button
              onClick={() => scrollToSection(expertiseRef)}
              className="hover:text-purple-400 transition-colors"
              aria-label={asString(t('nav.expertise'))}
            >
              {asString(t('nav.expertise'))}
            </button>
            <button
              onClick={() => scrollToSection(casesRef)}
              className="hover:text-purple-400 transition-colors"
              aria-label={asString(t('nav.cases'))}
            >
              {asString(t('nav.cases'))}
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="hover:text-purple-400 transition-colors"
              aria-label={asString(t('nav.contact'))}
            >
              {asString(t('nav.contact'))}
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />

            {/* Menu mobile toggle */}
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a
              href="https://linkedin.com/in/DevFerreiraG"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition-colors"
              aria-label={asString(t('nav.connectLinkedIn'))}
            >
              <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
              <span>{asString(t('nav.connect'))}</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800 absolute w-full z-50 shadow-xl animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col" aria-label={asString(t('nav.mobileNavigation'))}>
              <button
                onClick={() => scrollToSection(servicesRef)}
                className="py-3 px-4 hover:bg-gray-800 rounded transition-colors text-left"
                aria-label={asString(t('nav.services'))}
              >
                {asString(t('nav.services'))}
              </button>
              <button
                onClick={() => scrollToSection(expertiseRef)}
                className="py-3 px-4 hover:bg-gray-800 rounded transition-colors text-left"
                aria-label={asString(t('nav.expertise'))}
              >
                {asString(t('nav.expertise'))}
              </button>
              <button
                onClick={() => scrollToSection(casesRef)}
                className="py-3 px-4 hover:bg-gray-800 rounded transition-colors text-left"
                aria-label={asString(t('nav.cases'))}
              >
                {asString(t('nav.cases'))}
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="py-3 px-4 hover:bg-gray-800 rounded transition-colors text-left"
                aria-label={asString(t('nav.contact'))}
              >
                {asString(t('nav.contact'))}
              </button>
              <a
                href="https://linkedin.com/in/DevFerreiraG"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition-colors justify-center"
                aria-label={asString(t('nav.connectLinkedIn'))}
              >
                <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                <span>{asString(t('nav.connect'))}</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 md:pt-32 md:pb-20" id="main-content" tabIndex={-1}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text leading-normal md:leading-normal lg:leading-normal py-2 px-1">
              {asString(t('hero.title'))}
            </h1>
            <p className="hero-subtitle text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-1">
              {asString(t('hero.subtitle'))}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-0" aria-labelledby="cta-heading">
              <span id="cta-heading" className="sr-only">Call to Action</span>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold transition-colors flex items-center justify-center gap-2"
                aria-label={asString(t('hero.cta.start'))}
              >
                <Zap className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                {asString(t('hero.cta.start'))}
              </button>
              <button
                onClick={() => scrollToSection(casesRef)}
                className="border border-gray-700 hover:border-purple-500 px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold transition-colors"
                aria-label={asString(t('hero.cta.portfolio'))}
              >
                {asString(t('hero.cta.portfolio'))}
              </button>
            </div>
          </div>

          {/* Tech Stack Section */}
          <AnimatedSection className="mt-20 text-center" delay={0.2}>
            <h2 id="tech-stack-heading" className="text-3xl font-bold mb-8">{asString(t('techStack.title'))}</h2>
            <div
              className="flex flex-wrap justify-center gap-3"
              role="list"
              aria-label="Technology Stack"
            >
              <TechStackBadge name="Python" ecosystem="Data Engineering" />
              <TechStackBadge name="Apache Spark" ecosystem="Big Data" />
              <TechStackBadge name="React" ecosystem="Frontend" />
              <TechStackBadge name="Node.js" ecosystem="Backend" />
              <TechStackBadge name="PostgreSQL" ecosystem="Database" />
              <TechStackBadge name="Kubernetes" ecosystem="DevOps" />
            </div>
          </AnimatedSection>

          {/* Services Section */}
          <section
            id="services"
            ref={servicesRef}
            className="py-20 bg-black"
            aria-labelledby="services-heading"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 id="services-heading" className="text-4xl font-bold mb-6">{asString(t('services.title'))}</h2>
                <p className="text-gray-400">{asString(t('services.subtitle'))}</p>
              </div>
              <div className="responsive-grid">
                <AnimatedSection delay={0.1}>
                  <ServiceCard
                    icon={Database}
                    title={asString(t('services.dataEngineering.title'))}
                    description={asString(t('services.dataEngineering.description'))}
                    skills={['Apache Spark', 'Airflow', 'dbt', 'BigQuery']}
                  />
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <ServiceCard
                    icon={Code}
                    title={asString(t('services.fullstack.title'))}
                    description={asString(t('services.fullstack.description'))}
                    skills={['React', 'Node.js', 'TypeScript', 'PostgreSQL']}
                  />
                </AnimatedSection>
                <AnimatedSection delay={0.3}>
                  <ServiceCard
                    icon={GitBranch}
                    title={asString(t('services.architecture.title'))}
                    description={asString(t('services.architecture.description'))}
                    skills={['Kubernetes', 'Docker', 'AWS', 'Terraform']}
                  />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Expertise Section */}
          <section
            id="expertise"
            ref={expertiseRef}
            className="py-20 bg-gradient-to-b from-gray-900 to-black"
            aria-labelledby="expertise-heading"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 id="expertise-heading" className="text-4xl font-bold mb-6">{asString(t('expertise.title'))}</h2>
                <p className="text-gray-400">{asString(t('expertise.subtitle'))}</p>
              </div>
              <div className="responsive-grid">
                <AnimatedSection delay={0.1}>
                  <ExpertiseCard
                    icon={Brain}
                    title={asString(t('expertise.ai.title'))}
                    description={asString(t('expertise.ai.description'))}
                    technologies={['TensorFlow', 'PyTorch', 'scikit-learn']}
                  />
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <ExpertiseCard
                    icon={Database}
                    title={asString(t('expertise.cloud.title'))}
                    description={asString(t('expertise.cloud.description'))}
                    technologies={['AWS', 'GCP', 'Azure']}
                  />
                </AnimatedSection>
                <AnimatedSection delay={0.3}>
                  <ExpertiseCard
                    icon={GitBranch}
                    title={asString(t('expertise.devops.title'))}
                    description={asString(t('expertise.devops.description'))}
                    technologies={['Kubernetes', 'Terraform', 'Jenkins']}
                  />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section
            id="cases"
            ref={casesRef}
            className="py-20 bg-black"
            aria-labelledby="cases-heading"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 id="cases-heading" className="text-4xl font-bold mb-6">{asString(t('cases.title'))}</h2>
                <p className="text-gray-400">{asString(t('cases.subtitle'))}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection delay={0.1}>
                  <CaseStudyCard
                    title={asString(t('cases.dataWarehouse.title'))}
                    description={asString(t('cases.dataWarehouse.description'))}
                    results={asString(t('cases.dataWarehouse.results'))}
                    technologies={['BigQuery', 'dbt', 'Airflow']}
                    metrics={[
                      { label: asString(t('cases.metrics.processing')), value: '5TB+' },
                      { label: asString(t('cases.metrics.performance')), value: '90%' }
                    ]}
                  />
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <CaseStudyCard
                    title={asString(t('cases.ecommerce.title'))}
                    description={asString(t('cases.ecommerce.description'))}
                    results={asString(t('cases.ecommerce.results'))}
                    technologies={['Next.js', 'Node.js', 'PostgreSQL']}
                    metrics={[
                      { label: asString(t('cases.metrics.conversion')), value: '+45%' },
                      { label: asString(t('cases.metrics.performance')), value: '99.9%' }
                    ]}
                  />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <AnimatedSection delay={0.1} className="p-6 md:p-8">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                50+
              </div>
              <p className="text-gray-400">{asString(t('stats.projects'))}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="p-6 md:p-8">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                10TB+
              </div>
              <p className="text-gray-400">{asString(t('stats.data'))}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.3} className="p-6 md:p-8">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                99.9%
              </div>
              <p className="text-gray-400">{asString(t('stats.uptime'))}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.4} className="p-6 md:p-8">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                24/7
              </div>
              <p className="text-gray-400">{asString(t('stats.support'))}</p>
            </AnimatedSection>
          </div>

          {/* Contact Section */}
          <section
            id="contact"
            ref={contactRef}
            className="py-20 bg-gradient-to-b from-gray-900 to-black"
            aria-labelledby="contact-heading"
          >
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 id="contact-heading" className="text-4xl font-bold mb-6">{asString(t('contact.title'))}</h2>
                  <p className="text-gray-400 mb-8">{asString(t('contact.subtitle'))}</p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/20 p-3 rounded-full">
                        <Mail className="w-6 h-6 text-purple-400" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{asString(t('contact.email'))}</h3>
                        <a
                          href="mailto:Contato.FerreiraG@outlook.com"
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                          aria-label={asString(t('contact.emailAriaLabel'))}
                        >
                          Contato.FerreiraG@outlook.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/20 p-3 rounded-full">
                        <Phone className="w-6 h-6 text-purple-400" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{asString(t('contact.phone'))}</h3>
                        <a
                          href="tel:+5524998706745"
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                          aria-label={asString(t('contact.phoneAriaLabel'))}
                        >
                          +55 24 99870-6745
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/20 p-3 rounded-full">
                        <MapPin className="w-6 h-6 text-purple-400" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{asString(t('contact.location'))}</h3>
                        <p className="text-gray-400">Rio de Janeiro, Brasil</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Botão de volta ao topo */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors z-30"
          aria-label={asString(t('nav.backToTop'))}
        >
          <ChevronUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              className="flex items-center gap-2 mb-6 md:mb-0 cursor-pointer hover:text-purple-400 transition-colors"
              onClick={scrollToTop}
              role="button"
              tabIndex={0}
              aria-label={asString(t('nav.backToTop'))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
            >
              <Terminal className="w-8 h-8 text-purple-500" aria-hidden="true" />
              <span className="text-xl font-bold">DevFerreiraG</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              <nav aria-label={asString(t('footer.navigation'))} className="hidden md:block">
                <ul className="flex gap-8" role="list">
                  <li>
                    <button
                      onClick={() => scrollToSection(servicesRef)}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={asString(t('nav.services'))}
                    >
                      {asString(t('nav.services'))}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(expertiseRef)}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={asString(t('nav.expertise'))}
                    >
                      {asString(t('nav.expertise'))}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(casesRef)}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={asString(t('nav.cases'))}
                    >
                      {asString(t('nav.cases'))}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(contactRef)}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={asString(t('nav.contact'))}
                    >
                      {asString(t('nav.contact'))}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} DevFerreiraG. {asString(t('footer.rights'))}</p>

            <div className="flex gap-6 mt-4 md:mt-0" role="navigation" aria-label={asString(t('footer.legalLinks'))}>
              <a
                href="/privacy"
                className="hover:text-purple-400 transition-colors"
                aria-label={asString(t('footer.privacyPolicy'))}
              >
                {asString(t('footer.privacy'))}
              </a>
              <a
                href="/terms"
                className="hover:text-purple-400 transition-colors"
                aria-label={asString(t('footer.termsOfService'))}
              >
                {asString(t('footer.terms'))}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;