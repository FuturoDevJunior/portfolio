import React, { useRef } from 'react';
import {
  Brain,
  Code,
  Database,
  GitBranch,
  LinkedinIcon,
  Terminal,
  Zap,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { ServiceCard } from './components/ServiceCard';
import { TechStackBadge } from './components/TechStackBadge';
import { LanguageSelector } from './components/LanguageSelector';
import { useLanguage } from './hooks/useLanguage';
import { CaseStudyCard } from './components/CaseStudyCard';
import { ExpertiseCard } from './components/ExpertiseCard';
import { ContactForm } from './components/ContactForm';

function App() {
  const { language, setLanguage, t } = useLanguage();

  // Refs for smooth scrolling
  const servicesRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full border-b border-gray-800 bg-black/50 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors"
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            aria-label={t('nav.backToTop')}
            onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
          >
            <Terminal className="w-8 h-8 text-purple-500" aria-hidden="true" />
            <span className="text-xl font-bold">DevFerreiraG</span>
          </div>
          <nav className="hidden md:flex gap-8" aria-label={t('nav.mainNavigation')}>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="hover:text-purple-400 transition-colors"
              aria-label={t('nav.services')}
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection(expertiseRef)}
              className="hover:text-purple-400 transition-colors"
              aria-label={t('nav.expertise')}
            >
              {t('nav.expertise')}
            </button>
            <button
              onClick={() => scrollToSection(casesRef)}
              className="hover:text-purple-400 transition-colors"
              aria-label={t('nav.cases')}
            >
              {t('nav.cases')}
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="hover:text-purple-400 transition-colors"
              aria-label={t('nav.contact')}
            >
              {t('nav.contact')}
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
            <a
              href="https://linkedin.com/in/DevFerreiraG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition-colors"
              aria-label={t('nav.connectLinkedIn')}
            >
              <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
              <span>{t('nav.connect')}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection(contactRef)}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                {t('hero.cta.start')}
              </button>
              <button
                onClick={() => scrollToSection(casesRef)}
                className="border border-gray-700 hover:border-purple-500 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
              >
                {t('hero.cta.portfolio')}
              </button>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('techStack.title')}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <TechStackBadge name="Python" ecosystem="Data Engineering" />
              <TechStackBadge name="Apache Spark" ecosystem="Big Data" />
              <TechStackBadge name="React" ecosystem="Frontend" />
              <TechStackBadge name="Node.js" ecosystem="Backend" />
              <TechStackBadge name="PostgreSQL" ecosystem="Database" />
              <TechStackBadge name="Kubernetes" ecosystem="DevOps" />
            </div>
          </div>

          {/* Services Section */}
          <section
            id="services"
            ref={servicesRef}
            className="py-20 bg-black"
            aria-labelledby="services-heading"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 id="services-heading" className="text-4xl font-bold mb-6">{t('services.title')}</h2>
                <p className="text-gray-400">{t('services.subtitle')}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ServiceCard
                  icon={Database}
                  title={t('services.dataEngineering.title')}
                  description={t('services.dataEngineering.description')}
                  skills={['Apache Spark', 'Airflow', 'dbt', 'BigQuery']}
                />
                <ServiceCard
                  icon={Code}
                  title={t('services.fullstack.title')}
                  description={t('services.fullstack.description')}
                  skills={['React', 'Node.js', 'TypeScript', 'PostgreSQL']}
                />
                <ServiceCard
                  icon={GitBranch}
                  title={t('services.architecture.title')}
                  description={t('services.architecture.description')}
                  skills={['Kubernetes', 'Docker', 'AWS', 'Terraform']}
                />
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
                <h2 id="expertise-heading" className="text-4xl font-bold mb-6">{t('expertise.title')}</h2>
                <p className="text-gray-400">{t('expertise.subtitle')}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ExpertiseCard
                  icon={Brain}
                  title={t('expertise.ai.title')}
                  description={t('expertise.ai.description')}
                  technologies={['TensorFlow', 'PyTorch', 'scikit-learn']}
                />
                <ExpertiseCard
                  icon={Database}
                  title={t('expertise.cloud.title')}
                  description={t('expertise.cloud.description')}
                  technologies={['AWS', 'GCP', 'Azure']}
                />
                <ExpertiseCard
                  icon={GitBranch}
                  title={t('expertise.devops.title')}
                  description={t('expertise.devops.description')}
                  technologies={['Kubernetes', 'Terraform', 'Jenkins']}
                />
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
                <h2 id="cases-heading" className="text-4xl font-bold mb-6">{t('cases.title')}</h2>
                <p className="text-gray-400">{t('cases.subtitle')}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <CaseStudyCard
                  title={t('cases.dataWarehouse.title')}
                  description={t('cases.dataWarehouse.description')}
                  results={t('cases.dataWarehouse.results')}
                  technologies={['BigQuery', 'dbt', 'Airflow']}
                  metrics={[
                    { label: t('cases.metrics.processing'), value: '5TB+' },
                    { label: t('cases.metrics.performance'), value: '90%' }
                  ]}
                />
                <CaseStudyCard
                  title={t('cases.ecommerce.title')}
                  description={t('cases.ecommerce.description')}
                  results={t('cases.ecommerce.results')}
                  technologies={['Next.js', 'Node.js', 'PostgreSQL']}
                  metrics={[
                    { label: t('cases.metrics.conversion'), value: '+45%' },
                    { label: t('cases.metrics.performance'), value: '99.9%' }
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <div className="mt-32 grid md:grid-cols-4 gap-8 text-center">
            <div className="p-8">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                50+
              </div>
              <p className="text-gray-400">{t('stats.projects')}</p>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                10TB+
              </div>
              <p className="text-gray-400">{t('stats.data')}</p>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                99.9%
              </div>
              <p className="text-gray-400">{t('stats.uptime')}</p>
            </div>
            <div className="p-8">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                24/7
              </div>
              <p className="text-gray-400">{t('stats.support')}</p>
            </div>
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
                  <h2 id="contact-heading" className="text-4xl font-bold mb-6">{t('contact.title')}</h2>
                  <p className="text-gray-400 mb-8">{t('contact.subtitle')}</p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/20 p-3 rounded-full">
                        <Mail className="w-6 h-6 text-purple-400" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t('contact.email')}</h3>
                        <a
                          href="mailto:contact@devferreirag.com"
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                          aria-label={t('contact.emailAriaLabel')}
                        >
                          contact@devferreirag.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/20 p-3 rounded-full">
                        <Phone className="w-6 h-6 text-purple-400" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t('contact.phone')}</h3>
                        <a
                          href="tel:+5511912345678"
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                          aria-label={t('contact.phoneAriaLabel')}
                        >
                          +55 11 91234-5678
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/20 p-3 rounded-full">
                        <MapPin className="w-6 h-6 text-purple-400" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{t('contact.location')}</h3>
                        <p className="text-gray-400">São Paulo, Brasil</p>
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

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              className="flex items-center gap-2 mb-6 md:mb-0 cursor-pointer hover:text-purple-400 transition-colors"
              onClick={scrollToTop}
              role="button"
              tabIndex={0}
              aria-label={t('nav.backToTop')}
              onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
            >
              <Terminal className="w-8 h-8 text-purple-500" aria-hidden="true" />
              <span className="text-xl font-bold">DevFerreiraG</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              <nav aria-label={t('footer.navigation')}>
                <ul className="flex gap-8">
                  <li>
                    <button
                      onClick={() => scrollToSection(servicesRef)}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={t('nav.services')}
                    >
                      {t('nav.services')}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(expertiseRef)}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={t('nav.expertise')}
                    >
                      {t('nav.expertise')}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(casesRef)}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={t('nav.cases')}
                    >
                      {t('nav.cases')}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection(contactRef)}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={t('nav.contact')}
                    >
                      {t('nav.contact')}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} DevFerreiraG. {t('footer.rights')}</p>

            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="/privacy"
                className="hover:text-purple-400 transition-colors"
                aria-label={t('footer.privacyPolicy')}
              >
                {t('footer.privacy')}
              </a>
              <a
                href="/terms"
                className="hover:text-purple-400 transition-colors"
                aria-label={t('footer.termsOfService')}
              >
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;