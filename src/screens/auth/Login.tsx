import React, { FC, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorText } from './styles';
import { useLoginMutation } from '../../api/query/auth';
import { Checkbox, Text, TextInput } from '../../components/atom';
import { AuthScreen } from '../../components/organism';
import colors from '../../constants/colors';
import { EMAIL_REG_EXP } from '../../constants/validation';
import { useTranslation } from '../../context/TranslationProvider';
import { ILoginFormData } from '../../models/auth';
import { AuthStackParams } from '../../navigation/AuthNavigator';
import { MainStackParams } from '../../navigation/MainNavigation';
import { useAppDispatch } from '../../store';
import { setIsLoggedIn, setToken, setUser } from '../../store/auth/slice';
import { verticalScale } from '../../util/scale';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParams, 'Login'>;
}

const RememberMeText = styled(Text)`
  font-weight: 300;
  color: ${colors.textBlack};
`;

export const Login: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<MainStackParams, 'Auth'>>();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<ILoginFormData>({ defaultValues: { rememberMe: false } });

  const { mutate } = useLoginMutation({
    onSuccess: ({ login }) => {
      dispatch(setIsLoggedIn());
      dispatch(setToken({ accessToken: login.accessToken, refreshToken: login.refreshToken }));
      dispatch(setUser(login.user));
      navigate('Tab', { screen: 'Home' });
    },
    onError: (err: any) => {
      setError(err[0].includes('email') ? 'email' : 'password', { message: err[0] });
    },
  });

  const onForgot = useCallback(
    () => navigation.navigate('ForgotPassword', { email: getValues().email }),
    [getValues, navigation],
  );
  const onSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);
  const onSubmit: SubmitHandler<ILoginFormData> = useCallback(
    data => {
      mutate({ args: { ...data } });
    },
    [mutate],
  );

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
          required: `${t('common.email')} ${t('common.requiredMessage')}`,
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
          required: `${t('common.password')} ${t('common.requiredMessage')}`,
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
      <Controller
        name="rememberMe"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox checked={value} onCheck={onChange}>
            <RememberMeText fontSize={14}> {t('auth.rememberMe')}</RememberMeText>
          </Checkbox>
        )}
      />
    </AuthScreen>
  );
};
