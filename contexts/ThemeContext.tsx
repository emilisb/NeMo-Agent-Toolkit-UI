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
      /* --- Sidebar panel --- */
      .base44 .b44-sidebar { background-color: #1e1b4b !important; color: #e0e7ff !important; }
      .base44 .b44-sidebar * { color: #e0e7ff; }
      .base44 .b44-sidebar .text-white,
      .base44 .b44-sidebar button,
      .base44 .b44-sidebar a { color: #fff !important; }
      .base44 .b44-sidebar input { background-color: #312e81 !important; color: #fff !important; border-color: rgba(255,255,255,0.15) !important; }
      .base44 .b44-sidebar input::placeholder { color: rgba(255,255,255,0.5) !important; }
      .base44 .b44-sidebar button:hover { background-color: rgba(99,102,241,0.25) !important; }

      /* --- Sidebar conversation/folder items --- */
      .base44 .b44-sidebar-item { background-color: rgba(99,102,241,0.2) !important; }
      .base44 .b44-sidebar button.b44-sidebar-item:hover { background-color: rgba(99,102,241,0.35) !important; }

      /* --- Brand accent: green → orange --- */
      .base44 [class*="76b900"] { color: #f97316 !important; }
      .base44 [class*="bg-"][class*="76b900"] { background-color: #f97316 !important; color: #fff !important; }
      .base44 [class*="border-"][class*="76b900"] { border-color: #f97316 !important; }
      .base44 [class*="91c438"] { background-color: #f97316 !important; }
      .base44 [class*="004D3C"] { background-color: #4338ca !important; }

      /* --- Mobile navbar --- */
      .base44 nav[class*="202123"] { background-color: #1e1b4b !important; }
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
