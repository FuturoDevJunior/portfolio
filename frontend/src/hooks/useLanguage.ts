import { useState, useCallback, useEffect } from 'react';
import { Language, translations } from '../lib/i18n';

// Definição do tipo para a função de tradução que pode retornar string ou array de strings
export type TranslationFunction = (path: string) => string | string[];

// Tipo genérico para trabalhar com as traduções
export type TranslationRecord = Record<string, unknown>;

// Chave usada para armazenar a preferência de idioma no localStorage
const LANGUAGE_STORAGE_KEY = 'preferred_language';

// Função para obter o idioma preferido do usuário
function getPreferredLanguage(): Language {
  // Verificar se há uma preferência salva no localStorage
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
  if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en' || savedLanguage === 'es')) {
    return savedLanguage;
  }

  // Verificar o idioma do navegador
  const browserLanguages = navigator.languages || [navigator.language];
  for (const lang of browserLanguages) {
    const prefix = lang.slice(0, 2).toLowerCase();
    if (prefix === 'pt') return 'pt';
    if (prefix === 'es') return 'es';
    if (prefix === 'en') return 'en';
  }

  // Padrão para português se nenhuma correspondência for encontrada
  return 'pt';
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    // Não podemos acessar o localStorage durante SSR, então fazemos isso em um efeito
    if (typeof window !== 'undefined') {
      return getPreferredLanguage();
    }
    return 'pt'; // Valor padrão para SSR
  });
  const fallbackLanguage: Language = 'en'; // Idioma de fallback padrão

  // Wrapper para setLanguage que também salva no localStorage
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    }
  }, []);

  // Atualizar o localStorage quando o idioma mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  const t: TranslationFunction = useCallback((path: string) => {
    try {
      // Implementação mais segura que evita erros de tipagem
      const keys = path.split('.');
      let currentValue: unknown = translations[language];
      let fallbackValue: unknown = translations[fallbackLanguage];

      for (const key of keys) {
        if (
          currentValue !== null &&
          typeof currentValue === 'object' &&
          key in (currentValue as Record<string, unknown>)
        ) {
          currentValue = (currentValue as Record<string, unknown>)[key];

          // Manter o fallback alinhado com o caminho atual
          if (
            fallbackValue !== null &&
            typeof fallbackValue === 'object' &&
            key in (fallbackValue as Record<string, unknown>)
          ) {
            fallbackValue = (fallbackValue as Record<string, unknown>)[key];
          } else {
            fallbackValue = null;
          }
        } else {
          console.warn(`Translation path "${path}" leads to undefined at "${key}" for language "${language}"`);

          // Se tivermos um fallback, use-o
          if (
            fallbackValue !== null &&
            typeof fallbackValue === 'object' &&
            key in (fallbackValue as Record<string, unknown>)
          ) {
            currentValue = (fallbackValue as Record<string, unknown>)[key];
            fallbackValue = null; // Já usamos o fallback
          } else {
            // Se não houver fallback, retorne uma string vazia ou um array vazio dependendo do contexto
            return path.includes('.list') ? [] : '';
          }
        }
      }

      // Garantir que o valor retornado seja do tipo correto (string ou string[])
      if (Array.isArray(currentValue)) {
        return currentValue as string[];
      } else if (typeof currentValue === 'string') {
        return currentValue;
      } else if (typeof currentValue === 'object' && currentValue !== null) {
        // Se for um objeto, converta para uma representação string
        return JSON.stringify(currentValue);
      }

      // Tratamento final caso tudo falhe
      return path.includes('.list') ? [] : '';
    } catch (error) {
      console.warn(`Error accessing translation for path "${path}":`, error);
      return path.includes('.list') ? [] : '';
    }
  }, [language]);

  return { language, setLanguage, t };
}