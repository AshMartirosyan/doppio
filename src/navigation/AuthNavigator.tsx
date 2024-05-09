import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/atom';
import { ForgotPassword, Login, ResetPassword, SignUp, VerificationCode } from '../screens';

export type AuthStackParams = {
  Login: undefined;
  ForgotPassword: { email?: string };
  VerificationCode: { from?: 'SignUp' | 'ForgotPassword'; email?: string };
  ResetPassword: undefined;
  SignUp: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParams>();

export type AuthNavigatorProp = NativeStackNavigationProp<AuthStackParams, 'Login'>;

export const AuthNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        header: ({ navigation }) => (
          <Header onBack={() => navigation.goBack()} style={{ marginTop: insets.top }} />
        ),
        headerTransparent: true,
        animation: 'slide_from_right',
      }}>
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Screen name="VerificationCode" component={VerificationCode} />
      <Screen name="ResetPassword" component={ResetPassword} />
      <Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </Navigator>
  );
};
