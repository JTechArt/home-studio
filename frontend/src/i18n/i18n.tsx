import React, { createContext, useContext, useState } from 'react';
import am from './am.json';
import ru from './ru.json';

type Language = 'am' | 'ru';

interface Translations {
  [key: string]: any;
}

const translationsMap: Record<Language, Translations> = { am, ru };

interface I18nContextType {
  locale: Language;
  setLocale: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Language>(() => {
    const saved = localStorage.getItem('locale') as Language;
    return saved === 'am' || saved === 'ru' ? saved : 'am';
  });

  const setLocale = (lang: Language) => {
    setLocaleState(lang);
    localStorage.setItem('locale', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let result: any = translationsMap[locale];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path;
      }
    }
    return typeof result === 'string' ? result : path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
