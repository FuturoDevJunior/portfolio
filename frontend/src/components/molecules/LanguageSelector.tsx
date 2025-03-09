import React from 'react';

import { Globe } from 'lucide-react';

import { useLanguage } from '../../hooks/useLanguage';
import { Language } from '../../lib/i18n';

// Helper para garantir que traduções sejam tratadas como string
const asString = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join(' ');
  }
  return String(value);
};

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const { t } = useLanguage();
  const languageNames = {
    pt: "Português",
    en: "English",
    es: "Español"
  };

  return (
    <div className="flex items-center gap-2 relative">
      <Globe className="w-4 h-4 text-purple-400" aria-hidden="true" />
      <label htmlFor="language-selector" className="sr-only">
        {t('language.selectLanguage')}
      </label>
      <select
        id="language-selector"
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="bg-transparent text-white border-none outline-none cursor-pointer focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-sm"
        aria-label={asString(t('language.selectLanguage'))}
      >
        <option value="pt" className="bg-black">Português</option>
        <option value="en" className="bg-black">English</option>
        <option value="es" className="bg-black">Español</option>
      </select>
      <span className="sr-only" aria-live="polite">
        {t('language.selected')}: {languageNames[currentLanguage]}
      </span>
    </div>
  );
}