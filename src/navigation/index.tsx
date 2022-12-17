import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './AuthNavigator';

export const AppNavigation = () => {
  //   const isLoggedId = useAppSelector(getIsLoggedIn);
  //   const isFirstTime = useAppSelector(getIsFirstTime);

  const Children = useMemo(() => {
    // if (isLoggedId) {
    //   if (isFirstTime) {
    //     return <CompleatProfileNavigator />;
    //   }
    //   return <MainNavigation />;
    // }
    return <AuthNavigator />;
  }, []);

  return <NavigationContainer>{Children}</NavigationContainer>;
};
