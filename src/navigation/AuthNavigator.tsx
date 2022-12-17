import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ForgotPassword} from '../screens/auth/ForgotPassword';
import {Login} from '../screens/auth/Login';
import {SignUp} from '../screens/auth/Signup';
import {VerificationCode} from '../screens/auth/VerificationCode';

export type AuthStackParams = {
  Login: undefined;
  ForgotPassword: undefined;
  VerificationCode: undefined;
  CreateNewPassword: undefined;
  SignUp: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<AuthStackParams>();

export type AuthNavigatorProp = NativeStackNavigationProp<
  AuthStackParams,
  'Login'
>;

export const AuthNavigator = () => {
  //   const onForgotPasswordEnd = useCallback((navigation: AuthNavigatorProp) => {
  //     navigation.navigate('Login');
  //   }, []);

  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        // header: ({navigation}) => <Header onBack={() => navigation.goBack()} />,
      }}>
      <Screen name="Login" component={Login} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="VerificationCode" component={VerificationCode} />

      {/* Registration */}
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
};
