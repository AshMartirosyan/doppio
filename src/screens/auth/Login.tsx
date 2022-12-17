import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import styled from 'styled-components';
import CoffeeShopIcon from '../../assets/icons/CoffeeShop.svg';
import GoogleIcon from '../../assets/icons/Google.svg';
import {PressableText, Screen, Text, TextInput} from '../../components/atom';
import {Button, IconButton} from '../../components/atom';
import colors from '../../constants/colors';
import {EMAIL_REG_EXP, TextHelper} from '../../constants/texts';
import {ILogInFormData} from '../../models/auth';
import {horizontalScale, verticalScale} from '../../util/scale';

const Base = styled(Screen)`
  padding-vertical: ${verticalScale(12)}px;
  padding-horizontal: ${horizontalScale(16)}px;
  background-color: ${colors.background1};
`;

const ErrorText = styled(Text)`
  color: ${colors.errorRed};
  font-weight: 300;
  padding-bottom: ${verticalScale(13)}px;
  text-align: center;
  align-self: flex-start;
  min-height: ${verticalScale(32)}px;
`;

const ForgotPassword = styled(PressableText)`
  padding-top: ${verticalScale(19)}px;
  padding-bottom: ${verticalScale(28)}px;
  align-self: flex-end;
`;

const Divider = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Line = styled(View)`
  flex: 1;
  height: ${verticalScale(1)}px;
  background-color: ${colors.textBlack};
  opacity: 0.8;
`;
const DividerText = styled(Text)`
  padding-horizontal: ${horizontalScale(7)}px;
`;

const IconContainer = styled(View)`
  flex-direction: row;
  padding-top: ${verticalScale(20)}px;
  padding-bottom: ${verticalScale(30)}px;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const BottomNavLink = styled(PressableText)`
  padding-top: ${verticalScale(16)}px;
`;

const NavLinkSecondPart = styled(Text)`
  font-weight: 300;
  color: ${colors.textBlack};
`;

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILogInFormData>();

  const onForgot = useCallback(() => {}, []);
  const onSignUp = useCallback(() => {}, []);
  const onSubmit: SubmitHandler<ILogInFormData> = useCallback(() => {}, []);

  return (
    <Base edges={['left', 'right', 'top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.list}>
        <ErrorText fontSize={16}>
          {errors.username?.message || errors.password?.message}
        </ErrorText>
        <Controller
          name="username"
          control={control}
          rules={{
            required: 'This field is required',
            pattern: {
              value: EMAIL_REG_EXP,
              message: TextHelper.EMAIL_ERROR_TEXT,
            },
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="email"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              hasError={!!errors.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'This field is required',
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              wrapperStyle={{marginTop: verticalScale(12)}}
              placeholder="password"
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              hasError={!!errors.password?.message}
            />
          )}
        />
        <ForgotPassword onPress={onForgot}>forgot password?</ForgotPassword>
        <Divider>
          <Line />
          <DividerText fontSize={17}>or</DividerText>
          <Line />
        </Divider>
        <IconContainer>
          <IconButton icon={<GoogleIcon />} />
        </IconContainer>
        <CoffeeShopIcon />
        <SubmitButton text="login" onPress={handleSubmit(onSubmit)} />
        <BottomNavLink
          textStyle={styles.navLinkText}
          fontSize={14}
          onPress={onSignUp}>
          don’t have an account?{' '}
          <NavLinkSecondPart fontSize={14} fontFamily="Roboto">
            sign up for free
          </NavLinkSecondPart>
        </BottomNavLink>
      </ScrollView>
    </Base>
  );
};

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  navLinkText: {
    fontWeight: '300',
    color: 'rgb(17, 17, 17,0.6)',
  },
});
