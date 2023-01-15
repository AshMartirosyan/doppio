import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/atom';
import { BeverageInfo } from '../screens/BeverageInfo';
import { AuthNavigator, AuthStackParams } from './AuthNavigator';
import { MainTabParams, TabNavigation } from './TabNavigation';

export type MainStackParams = {
  Tab: NavigatorScreenParams<MainTabParams>;
  Auth: NavigatorScreenParams<AuthStackParams>;
  BeverageInfo: { id: number };
};

const { Navigator, Screen } = createNativeStackNavigator<MainStackParams>();

export const MainNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Navigator
      initialRouteName="Tab"
      screenOptions={{
        header: ({ navigation }) => (
          <Header onBack={() => navigation.goBack()} style={{ marginTop: insets.top }} />
        ),
        headerTransparent: true,
      }}>
      <Screen name="Tab" component={TabNavigation} options={{ headerShown: false }} />
      <Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false, presentation: 'formSheet' }}
      />
      <Screen name="BeverageInfo" component={BeverageInfo} />
    </Navigator>
  );
};
