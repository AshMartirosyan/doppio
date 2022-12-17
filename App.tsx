import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AppNavigation} from './src/navigation';
import {LunchScreen} from './src/screens/LunchScreen';

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return !hideSplashScreen ? (
    <LunchScreen onEnd={setHideSplashScreen} />
  ) : (
    <AppNavigation />
  );
};

export default App;
