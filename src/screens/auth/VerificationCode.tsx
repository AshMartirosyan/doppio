import React, { FC, useCallback } from 'react';
import { Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OtpInput } from '../../components/atom';
import { AuthScreen } from '../../components/organism';
import { OTP_LENGTH } from '../../constants/sizes';
import { useTranslation } from '../../context/TranslationProvider';
import { AuthStackParams } from '../../navigation/AuthNavigator';
import { verticalScale } from '../../util/scale';
import { ErrorText, KeyboardView } from './styles';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParams, 'VerificationCode'>;
}

export const VerificationCode: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const onSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);
  const onComplete = useCallback((otp: string) => {
    console.log({ otp });
  }, []);
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
        topContainerStyle={{ flex: 1, justifyContent: 'center' }}
        bottomNavLink={{
          title: t('auth.loginBottomLink1'),
          title2: t('auth.loginBottomLink2'),
          onPress: onSignUp,
        }}>
        <ErrorText fontSize={16}>{''}</ErrorText>
        <OtpInput inputsCount={OTP_LENGTH} onComplete={onComplete} />
      </AuthScreen>
    </KeyboardView>
  );
};
