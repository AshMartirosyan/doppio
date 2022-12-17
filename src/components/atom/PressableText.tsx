import React, {FC, memo, ReactNode} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import styled from 'styled-components';
import colors from '../../constants/colors';
import Text, {ITextProps} from './Text';

const BaseComponent = styled(TouchableOpacity)``;

const PressableText = styled(Text)`
  color: ${colors.linkBlack};
  font-weight: 300;
`;

interface Props extends ITextProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: ReactNode;
}

const PressableTextComponent: FC<Props> = ({
  children,
  onPress,
  style,
  textStyle,
  fontFamily = 'Urbanist',
  fontSize = 16,
}) => {
  return (
    <BaseComponent style={style} onPress={onPress}>
      <PressableText
        fontFamily={fontFamily}
        fontSize={fontSize}
        style={textStyle}>
        {children}
      </PressableText>
    </BaseComponent>
  );
};

export default memo(PressableTextComponent);
