import React, { FC, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '../../components/atom';
import { AuthScreen } from '../../components/organism';
import colors from '../../constants/colors';
import { EMAIL_REG_EXP } from '../../constants/validation';
import { useTranslation } from '../../context/TranslationProvider';
import { ILoginFormData } from '../../models/auth';
import { AuthStackParams } from '../../navigation/AuthNavigator';
import { MainStackParams } from '../../navigation/MainNavigation';
import { useAppDispatch } from '../../store';
import { setIsLoggedIn } from '../../store/auth/slice';
import { verticalScale } from '../../util/scale';
import { ErrorText } from './styles';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParams, 'Login'>;
}

export const Login: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<MainStackParams, 'Auth'>>();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ILoginFormData>();

  const onForgot = useCallback(
    () => navigation.navigate('ForgotPassword', { email: getValues().email }),
    [getValues, navigation],
  );
  const onSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);
  const onSubmit: SubmitHandler<ILoginFormData> = useCallback(() => {
    dispatch(setIsLoggedIn());
    navigate('Tab', { screen: 'Home' });
  }, [dispatch, navigate]);

  return (
    <AuthScreen
      backgroundColor={colors.backgroundAuth}
      topNavLink={{ title: t('auth.forgotPasswordLink'), onPress: onForgot }}
      submitTitle={t('auth.login')}
      onSubmit={handleSubmit(onSubmit)}
      bottomNavLink={{
        title: t('auth.loginBottomLink1'),
        title2: t('auth.loginBottomLink2'),
        onPress: onSignUp,
      }}
      isTryAgain={false}>
      <ErrorText fontSize={16}>{errors.email?.message || errors.password?.message}</ErrorText>
      <Controller
        name="email"
        control={control}
        rules={{
          required: t('common.requiredMessage'),
          pattern: {
            value: EMAIL_REG_EXP,
            message: t('auth.emailErrorMessage'),
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={t('common.email')}
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
            hasError={!!errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: t('common.requiredMessage'),
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            wrapperStyle={{ marginTop: verticalScale(12) }}
            placeholder={t('common.password')}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            hasError={!!errors.password?.message}
          />
        )}
      />
    </AuthScreen>
  );
};
