import React, { FC, ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import {
  BaseAuth,
  BottomContainer,
  BottomNavLink,
  Divider,
  DividerText,
  IconContainer,
  IconDivider,
  Line,
  NavLink,
  NavLinkSecondPart,
  SubmitButton,
} from './styles';
import { default as AppleIcon } from '../../../assets/icons/Apple.svg';
import { default as CoffeeShopIcon } from '../../../assets/icons/CoffeeShop.svg';
import { default as GoogleIcon } from '../../../assets/icons/Google.svg';
import { useTranslation } from '../../../context/TranslationProvider';
import { verticalScale } from '../../../util/scale';
import { IconButton } from '../../atom';

type NavLink = { title: string; title2?: string; onPress: () => void };

interface Props {
  children?: ReactNode;
  topNavLink?: NavLink;
  hasAlternativeMethod?: boolean;
  hasShopIcon?: boolean;
  submitTitle: string;
  onSubmit?: () => void;
  bottomNavLink?: NavLink;
  backgroundColor?: string;
  listContainerStyle?: StyleProp<ViewStyle>;
  topContainerStyle?: StyleProp<ViewStyle>;
  isTryAgain?: boolean;
  disabled?: boolean;
}

export const AuthScreen: FC<Props> = ({
  topNavLink,
  children,
  hasAlternativeMethod = true,
  hasShopIcon = true,
  submitTitle,
  onSubmit,
  bottomNavLink,
  backgroundColor,
  topContainerStyle,
  listContainerStyle,
  isTryAgain = false,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <BaseAuth backgroundColor={backgroundColor} edges={['left', 'right', 'bottom']}>
      <ScrollView
        contentContainerStyle={[styles.list, listContainerStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={topContainerStyle}>
          {children}
          {!!topNavLink && <NavLink onPress={topNavLink.onPress}>{topNavLink.title}</NavLink>}
          {hasAlternativeMethod && (
            <>
              <Divider>
                <Line />
                <DividerText fontSize={17}>{t('common.or')}</DividerText>
                <Line />
              </Divider>
              <IconContainer>
                <IconButton width={40} height={40} icon={<GoogleIcon />} />
                <IconDivider />
                <IconButton width={40} height={40} icon={<AppleIcon />} />
              </IconContainer>
            </>
          )}
        </View>
        <BottomContainer>
          {hasShopIcon && <CoffeeShopIcon />}
          <SubmitButton
            disabled={disabled}
            text={isTryAgain ? t('common.tryAgain') : submitTitle}
            onPress={onSubmit}
          />
          {!!bottomNavLink && (
            <BottomNavLink
              textStyle={styles.navLinkText}
              fontSize={14}
              onPress={bottomNavLink.onPress}>
              {bottomNavLink.title}{' '}
              <NavLinkSecondPart fontSize={14} fontFamily="Roboto">
                {bottomNavLink.title2}
              </NavLinkSecondPart>
            </BottomNavLink>
          )}
        </BottomContainer>
      </ScrollView>
    </BaseAuth>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navLinkText: {
    fontWeight: '300',
    color: 'rgb(17, 17, 17,0.6)',
  },
});
