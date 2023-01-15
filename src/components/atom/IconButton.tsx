import React, { FC, memo } from 'react';
import { Insets, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components';
import colors from '../../constants/colors';
import { moderateScale } from '../../util/scale';
import Text from './Text';

const BaseComponent = styled(TouchableOpacity)<{ width?: number; height?: number }>`
  width: ${({ width }) => moderateScale(width || 48)}px;
  height: ${({ height }) => moderateScale(height || 48)}px;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  color: ${colors.white};
  font-weight: 700;
`;

interface Props {
  icon: JSX.Element;
  width?: number;
  height?: number;
  onPress?: () => void;
  text?: string;
  style?: StyleProp<ViewStyle>;
  hitSlop?: Insets;
}

const IconButtonComponent: FC<Props> = ({ icon, text, ...rest }) => {
  return (
    <BaseComponent {...rest}>
      {icon}
      {text && <Title fontSize={12}>{text}</Title>}
    </BaseComponent>
  );
};

export default memo(IconButtonComponent);
