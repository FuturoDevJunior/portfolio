import React from 'react';

import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import { useLanguage } from '../../hooks/useLanguage';
import { TechStackBadge } from '../atoms/TechStackBadge';

interface Metric {
  label: string;
  value: string;
}

interface CaseStudyCardProps {
  title: string;
  description: string;
  results: string;
  technologies: string[];
  metrics: Metric[];
  learnMoreUrl?: string;
}

// Helper para garantir que traduções sejam tratadas como string
const asString = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join(' ');
  }
  return String(value);
};

export function CaseStudyCard({
  title,
  description,
  results,
  technologies,
  metrics,
  learnMoreUrl = "#"
}: CaseStudyCardProps) {
  const { t } = useLanguage();

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-purple-900/50 bg-gradient-to-b from-purple-900/50 to-transparent p-8 transition-all hover:border-purple-700/50">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />

      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-purple-400" aria-hidden="true" />
          {t('caseStudy.results')}
        </h4>
        <p className="text-gray-400">{results}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label={asString(t('caseStudy.technologies'))}>
        {technologies.map((tech) => (
          <TechStackBadge key={tech} name={tech} ecosystem={title} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4" role="list" aria-label={asString(t('caseStudy.metrics'))}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="text-center p-4 rounded-lg bg-purple-900/20 border border-purple-900/50"
            role="listitem"
          >
            <div className="text-2xl font-bold text-purple-400">{metric.value}</div>
            <div className="text-sm text-gray-400">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end">
        <a
          href={learnMoreUrl}
          className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1"
          aria-label={`${t('caseStudy.learnMore')} ${title}`}
        >
          {t('caseStudy.learnMore')}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}