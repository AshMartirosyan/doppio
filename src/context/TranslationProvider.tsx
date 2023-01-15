import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { NativeModules, Platform } from 'react-native';
import dictionary from '../constants/dictionary';

enum SupportedLanguages {
  English = 'en',
}

interface TranslationState {
  setLang?: (lang: SupportedLanguages) => void;
  t: (text: string, params?: Record<string, any>) => any;
}

const TranslationContext = createContext<TranslationState>({} as TranslationState);

interface Props {
  children?: JSX.Element;
}

export const TranslationProvider: FC<Props> = ({ children }) => {
  const [isDefaultLanguage, setIsDefaultLanguage] = useState(true);
  const [lang, setLang] = useState<SupportedLanguages>(SupportedLanguages.English);

  const currentLanguage = useMemo(() => {
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;

    const current = locale ? locale.split('_')[0] : 'en';

    return current;
  }, []);

  const t = useCallback(
    (text: string, params: Record<string, any> = {}) => {
      if (!text) {
        return '';
      }
      const [object, key] = text.split('.');

      if (!dictionary[lang]?.[object]?.[key]) {
        return text;
      }

      let newText =
        dictionary[lang][object][`${key}_plural`] || dictionary[lang][object][key] || text;

      Object.keys(params).forEach(param => {
        if (newText.includes(`{{${param}}}`)) {
          const regex = new RegExp(`{{${param}}}`, 'g');
          newText = newText.replace(regex, params[param]);
        }
      });

      return newText;
    },
    [lang],
  );

  useEffect(() => {
    if (isDefaultLanguage) {
      const language = Object.values(SupportedLanguages).find(i => {
        i === currentLanguage;
      });

      setLang(language || SupportedLanguages.English);
    }
  }, [currentLanguage, isDefaultLanguage]);

  return <TranslationContext.Provider value={{ setLang, t }} children={children} />;
};

export const useTranslation = () => useContext(TranslationContext);
