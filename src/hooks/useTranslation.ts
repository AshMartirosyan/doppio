// import { useCallback, useEffect, useMemo } from 'react';
// import { NativeModules, Platform } from 'react-native';
// import { languagesSoon, projectLanguages } from '../utils/selects';
// // import * as RNLocalize from 'react-native-localize';
// // import {SET_ACTIVE_LANGUAGE} from '../modules/languages/constant';

// const useTranslation = () => {

//   //const { dictionary, lang, isDefaultLanguage } = useSelector(({ languages }) => languages);

//   const currentLanguage = useMemo(() => {
//     const locale =
//       Platform.OS === 'ios'
//         ? NativeModules.SettingsManager.settings.AppleLocale
//         : NativeModules.I18nManager.localeIdentifier;

//     const current = locale ? locale.split('_')[0] : 'en';

//     return current;
//   }, []);

//   const setLanguage = useCallback(
//     language => {
//       if (!languagesSoon.includes(language)) {
//         dispatch({
//           type: SET_ACTIVE_LANGUAGE,
//           payload: projectLanguages[language],
//         });
//       }
//     },
//     [dispatch],
//   );

//   const i18n = useMemo(
//     () => ({
//       language: lang,
//     }),
//     [lang],
//   );

//   useEffect(() => {
//     if (isDefaultLanguage) {
//       const language = Object.keys(projectLanguages).find(
//         i => projectLanguages[i] === currentLanguage,
//       );

//       setLanguage(!languagesSoon.includes(language) ? language : 'English');
//     }
//   }, [currentLanguage, isDefaultLanguage, setLanguage]);

//   return { t, i18n, setLanguage };
// };

// export default useTranslation;
