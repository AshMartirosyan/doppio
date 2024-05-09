import React, { FC, useCallback } from 'react';
import { Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorText } from './styles';
import { useSignUpMutation } from '../../api/query/auth';
import { UserProfileDeviceTypeEnum } from '../../api/query/types';
import { TextInput } from '../../components/atom';
import { AuthScreen } from '../../components/organism';
import colors from '../../constants/colors';
import { EMAIL_REG_EXP } from '../../constants/validation';
import { useTranslation } from '../../context/TranslationProvider';
import { IAuthFormData } from '../../models/auth';
import { AuthStackParams } from '../../navigation/AuthNavigator';
import { verticalScale } from '../../util/scale';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParams, 'SignUp'>;
}

export const SignUp: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IAuthFormData>();

  const { mutate } = useSignUpMutation({
    onSuccess: async (_, vars) => {
      navigation.push('VerificationCode', { from: 'SignUp', email: vars.args.email });
    },
    onError: (err: any) => {
      setError(err.includes('email') ? 'email' : 'password', { message: err });
    },
  });

  const onLogin = useCallback(() => navigation.navigate('Login'), [navigation]);
  const onSubmit: SubmitHandler<IAuthFormData> = useCallback(
    data => {
      const deviceType =
        Platform.OS === 'ios' ? UserProfileDeviceTypeEnum.Ios : UserProfileDeviceTypeEnum.Android;
      mutate({
        args: {
          ...data,
          deviceType,
        },
      });
    },
    [mutate],
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
