import { useState, useCallback } from 'react';
import { Language, translations } from '../lib/i18n';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('pt');

  const t = useCallback((path: string) => {
    try {
      // Implementação mais segura que evita erros de tipagem
      const keys = path.split('.');
      let value = translations[language];

      for (const key of keys) {
        // @ts-expect-error - Acessando propriedades dinâmicas em objetos aninhados
        if (value && typeof value === 'object' && key in value) {
          // @ts-expect-error - Acessando valores em objetos aninhados com chaves dinâmicas
          value = value[key];
        } else {
          console.warn(`Translation path "${path}" leads to undefined at "${key}"`);
          return '';
        }
      }

      return value || '';
    } catch (error) {
      console.warn(`Error accessing translation for path "${path}":`, error);
      return '';
    }
  }, [language]);

  return {
    language,
    setLanguage,
    t
  };
}