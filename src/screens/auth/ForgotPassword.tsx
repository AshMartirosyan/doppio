import React, { FC, useCallback } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '../../components/atom';
import { AuthScreen } from '../../components/organism';
import colors from '../../constants/colors';
import { EMAIL_REG_EXP } from '../../constants/validation';
import { useTranslation } from '../../context/TranslationProvider';
import { IForgotPasswordFormData } from '../../models/auth';
import { AuthStackParams } from '../../navigation/AuthNavigator';
import { ErrorText } from './styles';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParams, 'ForgotPassword'>;
  route: RouteProp<AuthStackParams, 'ForgotPassword'>;
}

export const ForgotPassword: FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormData>({ defaultValues: { email: route.params.email } });

  const onBackLogin = useCallback(() => navigation.navigate('Login'), [navigation]);
  const onSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);
  const onSubmit: SubmitHandler<IForgotPasswordFormData> = useCallback(() => {
    navigation.push('VerificationCode');
  }, [navigation]);

  return (
    <AuthScreen
      backgroundColor={colors.backgroundForgot}
      topNavLink={{ title: t('auth.loginLink'), onPress: onBackLogin }}
      submitTitle={t('common.send')}
      onSubmit={handleSubmit(onSubmit)}
      bottomNavLink={{
        title: t('auth.loginBottomLink1'),
        title2: t('auth.loginBottomLink2'),
        onPress: onSignUp,
      }}
      isTryAgain={false}>
      <ErrorText fontSize={16}>{errors.email?.message}</ErrorText>
      <Controller
        name={t('common.email')}
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
    </AuthScreen>
  );
};
