import { DivideIcon as LucideIcon } from 'lucide-react';
import { TechStackBadge } from './TechStackBadge';

interface ServiceCardProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  skills: string[];
}

export function ServiceCard({ icon: Icon, title, description, skills = [] }: ServiceCardProps) {
  // Verifica se skills existe e é um array, se não, usa um array vazio
  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-purple-900/50 bg-gradient-to-b from-purple-900/50 to-transparent p-8 transition-all hover:border-purple-700/50">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      <Icon className="h-12 w-12 text-purple-400 mb-4" aria-hidden="true" />
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <div
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Skills"
      >
        {safeSkills.map((skill) => (
          <TechStackBadge key={skill} name={skill} ecosystem={title} />
        ))}
      </div>
    </article>
  );
}