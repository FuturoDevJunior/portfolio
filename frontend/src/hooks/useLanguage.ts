import { useState, useCallback } from 'react';
import { Language, translations } from '../lib/i18n';

// Definição do tipo para a função de tradução
export type TranslationFunction = (path: string) => string;

// Tipo para representar a estrutura de traduções de forma não-circular
interface TranslationObject {
  [key: string]: string | TranslationObject;
}

type TranslationValue = string | TranslationObject;

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('pt');

  const t: TranslationFunction = useCallback((path: string) => {
    try {
      // Implementação mais segura que evita erros de tipagem
      const keys = path.split('.');
      let value: TranslationValue = translations[language];

      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key];
        } else {
          console.warn(`Translation path "${path}" leads to undefined at "${key}"`);
          return '';
        }
      }

      // Garantir que o valor retornado seja sempre uma string
      return typeof value === 'string' ? value : JSON.stringify(value);
    } catch (error) {
      console.warn(`Error accessing translation for path "${path}":`, error);
      return '';
    }
  }, [language]);

  return { language, setLanguage, t };
}