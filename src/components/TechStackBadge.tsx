import { cn } from '../lib/utils';

interface TechStackBadgeProps {
  name: string;
  ecosystem: string;
  className?: string;
}

export function TechStackBadge({ name, ecosystem, className }: TechStackBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-gradient-to-r from-purple-900/50 to-purple-800/30",
        "border border-purple-700/50",
        className
      )}
      role="listitem"
    >
      <span className="text-sm font-medium text-purple-300">{name}</span>
      <span className="text-xs text-purple-400/70" aria-hidden="true">•</span>
      <span className="text-xs text-purple-400/70">
        <span className="sr-only">em</span>
        {ecosystem}
      </span>
    </div>
  );
}