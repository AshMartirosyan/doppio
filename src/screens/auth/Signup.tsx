import React, { FC, useCallback, useMemo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from '../../components/atom';
import { AuthScreen } from '../../components/organism';
import colors from '../../constants/colors';
import { EMAIL_REG_EXP } from '../../constants/validation';
import { useTranslation } from '../../context/TranslationProvider';
import { IAuthFormData } from '../../models/auth';
import { AuthStackParams } from '../../navigation/AuthNavigator';
import { verticalScale } from '../../util/scale';
import { ErrorText } from './styles';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParams, 'SignUp'>;
}

export const SignUp: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormData>();

  const onLogin = useCallback(() => navigation.navigate('Login'), [navigation]);
  const onSubmit = useCallback(() => {}, []);

  const errorMessage = useMemo(
    () => errors.username?.message || errors.email?.message || errors.password?.message,
    [errors],
  );

  return (
    <AuthScreen
      backgroundColor={colors.backgroundAuth}
      submitTitle={t('auth.signUp')}
      onSubmit={handleSubmit(onSubmit)}
      bottomNavLink={{
        title: t('auth.authBottomLink1'),
        title2: t('auth.authBottomLink2'),
        onPress: onLogin,
      }}
      hasAlternativeMethod={false}
      isTryAgain={false}>
      <ErrorText fontSize={16}>{errorMessage}</ErrorText>
      <Controller
        name="username"
        control={control}
        rules={{
          required: t('common.requiredMessage'),
          minLength: { value: 4, message: t('auth.usernameErrorMessage') },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={t('common.username')}
            keyboardType="numbers-and-punctuation"
            onChangeText={onChange}
            value={value}
            hasError={!!errors.email?.message}
          />
        )}
      />
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
            wrapperStyle={{ marginTop: verticalScale(12) }}
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
