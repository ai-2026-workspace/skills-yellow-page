import * as React from "react";

export type Mode = 'basic' | 'pro';

const STORAGE_KEY = 'skills-yellow-page-mode';

function getInitialMode(): Mode {
  // SSR safety check
  if (typeof window === 'undefined') {
    return 'basic';
  }

  // 1. Check URL search params first
  const urlParams = new URLSearchParams(window.location.search);
  const urlMode = urlParams.get('mode');
  if (urlMode === 'basic' || urlMode === 'pro') {
    return urlMode;
  }

  // 2. Check localStorage
  const storedMode = localStorage.getItem(STORAGE_KEY);
  if (storedMode === 'basic' || storedMode === 'pro') {
    return storedMode;
  }

  // 3. Default to 'basic'
  return 'basic';
}

export function useMode() {
  const [mode, setModeState] = React.useState<Mode>(getInitialMode);

  const setMode = React.useCallback((newMode: Mode) => {
    setModeState(newMode);

    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    // Update localStorage
    localStorage.setItem(STORAGE_KEY, newMode);

    // Update URL via replaceState (no reload)
    const url = new URL(window.location.href);
    url.searchParams.set('mode', newMode);
    window.history.replaceState({}, '', url.toString());
  }, []);

  const toggleMode = React.useCallback(() => {
    setMode(mode === 'basic' ? 'pro' : 'basic');
  }, [mode, setMode]);

  return { mode, setMode, toggleMode };
}