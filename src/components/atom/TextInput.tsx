import React, { forwardRef, memo, useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components';
import { default as EyeIcon } from '../../assets/icons/Eye.svg';
import colors from '../../constants/colors';
import { horizontalScale, moderateScale } from '../../util/scale';
// import {default as EyeHideIcon} from '../../assets/icons/EyeHide.svg';

const BaseComponent = styled(View)`
  width: 100%;
  min-height: ${moderateScale(56)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${horizontalScale(16)}px;
  padding-right: ${horizontalScale(19)}px;
  border-radius: ${moderateScale(50)}px;
  background-color: ${colors.white};
`;

const Input = styled(TextInput)<{
  hasError?: boolean;
  secureTextEntry?: boolean;
  value?: string;
}>`
  flex: 1;
  font-family:Urbanist
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: ${moderateScale(16)}px;
  font-weight: 300;
  color: ${({ hasError }) => (hasError ? colors.errorRed : colors.textBlack)};
  letter-spacing: ${({ secureTextEntry, value }) =>
    secureTextEntry && value ? horizontalScale(8) : 0}px;
`;

const HideIcon = styled(TouchableOpacity)`
  padding-left: ${horizontalScale(11)}px;
`;

interface Props extends TextInputProps {
  hasError?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  icon?: JSX.Element;
}

const TextInputComponent = forwardRef<TextInput, Props>(
  ({ secureTextEntry = false, hasError = false, wrapperStyle, onLayout, icon, ...rest }, ref) => {
    const [isHidden, setIsHidden] = useState(secureTextEntry && true);
    const onHide = useCallback(() => setIsHidden(prev => !prev), []);

    return (
      <BaseComponent style={wrapperStyle} onLayout={onLayout}>
        {icon && !secureTextEntry ? icon : null}
        <Input
          ref={ref}
          autoCorrect={false}
          spellCheck={false}
          hasError={hasError}
          placeholderTextColor={hasError ? colors.errorRed : colors.text3}
          selectionColor={colors.background3}
          secureTextEntry={isHidden}
          autoCapitalize="none"
          accessible={false}
          {...rest}
        />
        {secureTextEntry && (
          <HideIcon onPress={onHide}>{isHidden ? <EyeIcon /> : <EyeIcon />}</HideIcon>
        )}
      </BaseComponent>
    );
  },
);

export default memo(TextInputComponent);
