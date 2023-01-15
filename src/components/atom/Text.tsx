import React, { FC, memo } from 'react';
import { Text, TextProps } from 'react-native';
import { moderateScale } from '../../util/scale';

export interface ITextProps {
  fontSize?: number;
  fontFamily?: 'Roboto' | 'Urbanist';
}

const TextComponent: FC<ITextProps & TextProps> = ({
  fontSize = 13,
  style,
  children,
  fontFamily = 'Urbanist',
  ...rest
}) => {
  return (
    <Text style={[{ fontSize: moderateScale(fontSize), fontFamily: fontFamily }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default memo(TextComponent);
