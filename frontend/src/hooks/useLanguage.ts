import { useState, useCallback } from 'react';
import { Language, translations } from '../lib/i18n';

// Definir um tipo para a função de tradução que permite retornar
// tanto string quanto objetos aninhados do tipo de tradução
export type TranslationFunction = (path: string) => string | Record<string, any>;

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('pt');

  const t: TranslationFunction = useCallback((path: string) => {
    try {
      // Implementação mais segura que evita erros de tipagem
      const keys = path.split('.');
      let value: any = translations[language];

      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
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