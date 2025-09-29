import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setTheme } from '../redux/slices/themeSlice';
import type { ThemeMode } from '../redux/slices/themeSlice';

export const useThemeClass = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  // Sadece ilk yüklemede localStorage'dan tema oku
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark') && savedTheme !== themeMode) {
      dispatch(setTheme(savedTheme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Sadece mount sırasında çalış

  // Tema değişimlerini DOM'a uygula ve localStorage'a kaydet
  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  return themeMode;
};