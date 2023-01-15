import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

interface ThemeState {
  setTheme?: (lang: ColorSchemeName) => void;
  theme: ColorSchemeName;
}

const ThemeContext = createContext<ThemeState>({} as ThemeState);

interface Props {
  children?: JSX.Element;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const currentTheme = useColorScheme();
  const [isDefaultLanguage, setIsDefaultLanguage] = useState(true);
  const [theme, setTheme] = useState<ColorSchemeName>('light');

  useEffect(() => {
    if (isDefaultLanguage) {
      setTheme(currentTheme);
    }
  }, [currentTheme, isDefaultLanguage]);

  return <ThemeContext.Provider value={{ theme, setTheme }} children={children} />;
};

export const useTheme = () => useContext(ThemeContext);
