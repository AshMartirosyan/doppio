import React, {FC, memo} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import styled from 'styled-components';
import colors from '../../constants/colors';
import {moderateScale} from '../../util/scale';
import Text from './Text';

const BaseComponent = styled(TouchableOpacity)`
  width: ${moderateScale(48)}px;
  min-height: ${moderateScale(48)}px;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
color: ${colors.white},
font-weight: 700,`;

interface Props {
  icon: JSX.Element;
  onPress?: () => void;
  text?: string;
  style?: StyleProp<ViewStyle>;
}

const IconButtonComponent: FC<Props> = ({icon, onPress, text, style}) => {
  return (
    <BaseComponent style={style} onPress={onPress}>
      {icon}
      {text && <Title fontSize={12}>{text}</Title>}
    </BaseComponent>
  );
};

export default memo(IconButtonComponent);
