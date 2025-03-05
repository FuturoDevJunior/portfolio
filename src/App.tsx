import React, { useRef } from 'react';
import {
  Brain,
  Code,
  Database,
  GitBranch,
  Globe,
  LineChart,
  LinkedinIcon,
  Terminal,
  Zap,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2
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
          >
            <Terminal className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold">DevFerreiraG</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <button 
              onClick={() => scrollToSection(servicesRef)} 
              className="hover:text-purple-400 transition-colors"
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => scrollToSection(expertiseRef)} 
              className="hover:text-purple-400 transition-colors"
            >
              {t('nav.expertise')}
            </button>
            <button 
              onClick={() => scrollToSection(casesRef)} 
              className="hover:text-purple-400 transition-colors"
            >
              {t('nav.cases')}
            </button>
            <button 
              onClick={() => scrollToSection(contactRef)} 
              className="hover:text-purple-400 transition-colors"
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
            >
              <LinkedinIcon className="w-4 h-4" />
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
          <div ref={servicesRef} className="mt-32 scroll-mt-24">
            <h2 className="text-4xl font-bold text-center mb-16">{t('services.title')}</h2>
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

          {/* Expertise Section */}
          <div ref={expertiseRef} className="mt-32 scroll-mt-24">
            <h2 className="text-4xl font-bold text-center mb-16">{t('expertise.title')}</h2>
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

          {/* Case Studies Section */}
          <div ref={casesRef} className="mt-32 scroll-mt-24">
            <h2 className="text-4xl font-bold text-center mb-16">{t('cases.title')}</h2>
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
          <div ref={contactRef} className="mt-32 scroll-mt-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">{t('contact.title')}</h2>
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Mail className="w-6 h-6 text-purple-400" />
                      <a href="mailto:Contato.FerreiraG@outlook.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                        Contato.FerreiraG@outlook.com
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="w-6 h-6 text-purple-400" />
                      <a href="tel:+5524998706745" className="text-gray-300 hover:text-purple-400 transition-colors">
                        +55 (24) 99870-6745
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="w-6 h-6 text-purple-400" />
                      <span className="text-gray-300">Rio de Janeiro, Brazil</span>
                    </div>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;