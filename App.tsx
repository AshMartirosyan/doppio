import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './src/context/ThemeProvider';
import { TranslationProvider } from './src/context/TranslationProvider';
import { AppNavigation } from './src/navigation';
import { LunchScreen } from './src/screens/LunchScreen';
import { persistor, store } from './src/store';

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return !hideSplashScreen ? (
    <LunchScreen onEnd={setHideSplashScreen} />
  ) : (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TranslationProvider>
            <ThemeProvider>
              <AppNavigation />
            </ThemeProvider>
          </TranslationProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
