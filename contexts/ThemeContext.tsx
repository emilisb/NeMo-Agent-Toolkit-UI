import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { getSettings, saveSettings } from '@/utils/app/settings';

interface ThemeContextType {
  lightMode: 'light' | 'dark' | 'base44';
  setLightMode: (_mode: 'light' | 'dark' | 'base44') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lightMode, setLightModeState] = useState<'light' | 'dark' | 'base44'>('light');

  // Wrapper function that saves settings when theme changes
  // Memoized to prevent unnecessary re-renders of consumers
  const setLightMode = useCallback((mode: 'light' | 'dark' | 'base44') => {
    setLightModeState(mode);
    const currentSettings = getSettings();
    saveSettings({ ...currentSettings, theme: mode });
  }, []); // Empty deps: setLightModeState is stable from useState

  useEffect(() => {
    const styleId = 'base44-theme-override';
    // Uses [class*=] to match Tailwind's JIT arbitrary value classes
    const base44Css = `
      .base44 [class*="#202123"] { background-color: #7c2d12 !important; }
      .base44 [class*="#343541"] { background-color: rgba(154,52,18,0.85) !important; }
      .base44 [class*="#444654"] { background-color: #c2410c !important; }
      .base44 [class*="#40414"] { background-color: #fed7aa !important; }
      .base44 [class*="76b900"] { color: #f97316 !important; background-color: transparent; }
      .base44 [class*="bg-"][class*="76b900"] { background-color: #f97316 !important; color: #fff !important; }
      .base44 [class*="border-"][class*="76b900"] { border-color: #f97316 !important; }
      .base44 [class*="004D3C"] { background-color: #c2440b !important; }
      .base44 [class*="91c438"] { background-color: #f97316 !important; }
      .base44 [class*="bg-gray-50"] { background-color: #ffedd5 !important; }
    `;

    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

    if (lightMode === 'base44') {
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = base44Css;
    } else {
      styleEl?.remove();
    }
  }, [lightMode]);

  useEffect(() => {
    // Initialize theme from settings
    const settings = getSettings();
    if (settings.theme) {
      setLightModeState(settings.theme);
    }

    // Listen for theme changes in localStorage/sessionStorage
    const handleStorageChange = () => {
      const settings = getSettings();
      if (settings.theme) {
        setLightModeState(settings.theme);
      }
    };

    // Listen for storage events to sync theme across tabs
    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for theme changes within the same tab
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ lightMode, setLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
