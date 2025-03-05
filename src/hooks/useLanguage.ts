import { useState, useCallback } from 'react';
import { Language, translations } from '../lib/i18n';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('pt');

  const t = useCallback((path: string) => {
    return path.split('.').reduce((obj, key) => obj[key as keyof typeof obj], translations[language]);
  }, [language]);

  return {
    language,
    setLanguage,
    t
  };
}