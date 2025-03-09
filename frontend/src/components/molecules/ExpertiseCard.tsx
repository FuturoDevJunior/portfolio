import React from 'react';

import { DivideIcon as LucideIcon } from 'lucide-react';

import { useLanguage } from '../../hooks/useLanguage';
import { TechStackBadge } from '../atoms/TechStackBadge';

interface ExpertiseCardProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  technologies: string[];
}

// Helper para garantir que traduções sejam tratadas como string
const asString = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join(' ');
  }
  return String(value);
};

export function ExpertiseCard({
  icon: Icon,
  title,
  description,
  technologies
}: ExpertiseCardProps) {
  const { t } = useLanguage();

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-purple-900/50 bg-gradient-to-b from-purple-900/50 to-transparent p-8 transition-all hover:border-purple-700/50">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />

      <Icon className="w-12 h-12 text-purple-400 mb-4" aria-hidden="true" />
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>

      <div
        className="flex flex-wrap gap-2"
        role="list"
        aria-label={asString(t('expertise.technologies'))}
      >
        {technologies.map((tech) => (
          <TechStackBadge key={tech} name={tech} ecosystem={title} />
        ))}
      </div>
    </article>
  );
}