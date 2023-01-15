import React, { FC, useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from '../../components/atom';
import { AuthScreen } from '../../components/organism';
import { HEADER_HEIGHT } from '../../constants/sizes';
import { useTranslation } from '../../context/TranslationProvider';
import { IResetPassword } from '../../models/auth';
import { AuthStackParams } from '../../navigation/AuthNavigator';
import { verticalScale } from '../../util/scale';
import { ErrorText } from './styles';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParams, 'ResetPassword'>;
}

export const ResetPassword: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>();

  const onSubmit = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <AuthScreen
      submitTitle={t('common.reset')}
      onSubmit={handleSubmit(onSubmit)}
      hasAlternativeMethod={false}
      isTryAgain={false}
      listContainerStyle={{ paddingTop: HEADER_HEIGHT }}>
      <ErrorText fontSize={16}>
        {errors.password?.message || errors.confirmPassword?.message}
      </ErrorText>
      <Controller
        name="password"
        control={control}
        rules={{
          required: t('common.password') + ' ' + t('common.requiredMessage'),
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={t('common.password')}
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            hasError={!!errors.password?.message}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: t('auth.confirmPassword') + ' ' + t('common.requiredMessage'),
          validate: value => {
            if (watch('password') !== value) {
              return t('auth.confirmPasswordErrorMessage');
            }
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            wrapperStyle={{ marginTop: verticalScale(12) }}
            placeholder={t('auth.confirmPassword')}
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
