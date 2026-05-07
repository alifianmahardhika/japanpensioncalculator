import { createContext, useContext, useState, useEffect } from 'react';
import { T as translate } from '../lib/i18n.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  const T = (key, vars) => translate(lang, key, vars);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, setLang, T }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
