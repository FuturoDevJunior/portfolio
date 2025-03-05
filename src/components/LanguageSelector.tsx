import { Globe } from 'lucide-react';
import { Language } from '../lib/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-purple-400" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="bg-transparent text-white border-none outline-none cursor-pointer"
      >
        <option value="pt" className="bg-black">Português</option>
        <option value="en" className="bg-black">English</option>
        <option value="es" className="bg-black">Español</option>
      </select>
    </div>
  );
}