import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { TechStackBadge } from './TechStackBadge';

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
}

export function CaseStudyCard({
  title,
  description,
  results,
  technologies,
  metrics
}: CaseStudyCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-purple-900/50 bg-gradient-to-b from-purple-900/50 to-transparent p-8 transition-all hover:border-purple-700/50">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-purple-400" />
          Results
        </h4>
        <p className="text-gray-400">{results}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech) => (
          <TechStackBadge key={tech} name={tech} ecosystem={title} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-4 rounded-lg bg-purple-900/20 border border-purple-900/50">
            <div className="text-2xl font-bold text-purple-400">{metric.value}</div>
            <div className="text-sm text-gray-400">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end">
        <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
          Learn more
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}