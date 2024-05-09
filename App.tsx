import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './src/context/ThemeProvider';
import { TranslationProvider } from './src/context/TranslationProvider';
import { AppNavigation } from './src/navigation';
import { LunchScreen } from './src/screens/LunchScreen';
import { queryClient, reactQueryPersister, reduxPersistor, store } from './src/store';
LogBox.ignoreAllLogs();

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
        <PersistGate loading={null} persistor={reduxPersistor}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: reactQueryPersister }}>
            <TranslationProvider>
              <ThemeProvider>
                <AppNavigation />
              </ThemeProvider>
            </TranslationProvider>
          </PersistQueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
