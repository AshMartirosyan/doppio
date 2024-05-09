import React, { FC, useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ErrorText, KeyboardView } from './styles';
import { useVerifyEmailMutation } from '../../api/query/auth';
import { OtpInput } from '../../components/atom';
import { AuthScreen } from '../../components/organism';
import { OTP_LENGTH } from '../../constants/sizes';
import { useTranslation } from '../../context/TranslationProvider';
import { AuthStackParams } from '../../navigation/AuthNavigator';
import { useAppDispatch } from '../../store';
import { setToken } from '../../store/auth/slice';
import { verticalScale } from '../../util/scale';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParams, 'VerificationCode'>;
  route: RouteProp<AuthStackParams, 'VerificationCode'>;
}

export const VerificationCode: FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const { mutate: verifyEmailMutation } = useVerifyEmailMutation({
    onSuccess: ({ verifyEmail }) => {
      console.log(verifyEmail);
      dispatch(
        setToken({
          accessToken: verifyEmail.accessToken,
          refreshToken: verifyEmail.refreshToken,
        }),
      );
    },
    onError: () => {
      setError('Code is incorrect');
    },
  });

  const onSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);
  const onComplete = useCallback(
    (otp: string) => {
      setDisabled(true);
      if (route.params.from === 'SignUp') {
        verifyEmailMutation({ args: { code: otp, email: route.params.email! } });
      }
    },
    [route.params.email, route.params.from, verifyEmailMutation],
  );
  const onSubmit = useCallback(() => {
    navigation.navigate('ResetPassword');
  }, [navigation]);

  return (
    <KeyboardView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={-verticalScale(24)}>
      <AuthScreen
        submitTitle={t('common.send')}
        hasAlternativeMethod={false}
        hasShopIcon={false}
        onSubmit={onSubmit}
        disabled={disabled}
        topContainerStyle={{ flex: 1, justifyContent: 'center' }}
        bottomNavLink={{
          title: t('auth.loginBottomLink1'),
          title2: t('auth.loginBottomLink2'),
          onPress: onSignUp,
        }}>
        <ErrorText fontSize={16}>{error}</ErrorText>
        <OtpInput inputsCount={OTP_LENGTH} onComplete={onComplete} />
      </AuthScreen>
    </KeyboardView>
  );
};
