import * as React from "react";

export type Mode = 'basic' | 'pro';

const STORAGE_KEY = 'skills-yellow-page-mode';

// Context for sharing mode across components
const ModeContext = React.createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
}>({
  mode: 'basic',
  setMode: () => {},
});

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<Mode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'basic' || stored === 'pro') {
        return stored;
      }
    }
    return 'basic';
  });

  const setMode = React.useCallback((newMode: Mode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newMode);
    }
  }, []);

  return React.createElement(
    ModeContext.Provider,
    { value: { mode, setMode } },
    children
  );
}

export function useMode() {
  return React.useContext(ModeContext);
}
