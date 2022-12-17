import React, {FC, memo} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import styled from 'styled-components';
import colors from '../../constants/colors';
import {horizontalScale, moderateScale, verticalScale} from '../../util/scale';
import Text from './Text';

type ButtonType = 'positive' | 'negative';

const BaseComponent = styled(TouchableOpacity)<{
  disabled?: boolean;
  buttonType?: ButtonType;
}>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-vertical: ${verticalScale(11)}px;
  padding-horizontal: ${horizontalScale(57)}px;
  background-color: ${({disabled, buttonType}) =>
    buttonType === 'negative'
      ? colors.white
      : disabled
      ? colors.greenOpacity
      : colors.greenDark};
  border-width: ${({buttonType}) => (buttonType === 'negative' ? 1 : 0)}px;
  border-color: ${({buttonType}) =>
    buttonType === 'negative' ? colors.greenDark : null}px;
  border-radius: ${moderateScale(50)}px;
`;

const Title = styled(Text)<{buttonType?: ButtonType}>`
  font-weight: 500;
  text-align: center;
  color: ${({buttonType}) =>
    buttonType === 'negative' ? colors.greenDark : colors.white};
`;

export interface CustomButton {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  buttonType?: ButtonType;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onlyDisabledStyle?: boolean;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
}

const Button: FC<CustomButton> = ({
  disabled,
  onPress,
  buttonType = 'positive',
  style,
  textStyle,
  text,
  onlyDisabledStyle = false,
  icon,
  iconPosition = 'left',
}) => {
  return (
    <BaseComponent
      disabled={!onlyDisabledStyle && disabled}
      onPress={onPress}
      buttonType={buttonType}
      style={style}>
      {iconPosition === 'left' && icon}
      <Title
        buttonType={buttonType}
        fontSize={14}
        style={[
          textStyle,
          iconPosition === 'left'
            ? {paddingLeft: horizontalScale(4)}
            : {paddingRight: horizontalScale(4)},
        ]}>
        {text}
      </Title>
      {iconPosition === 'right' && icon}
    </BaseComponent>
  );
};

export default memo(Button);
