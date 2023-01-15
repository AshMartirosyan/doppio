import React, { FC, memo } from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import colors from '../../constants/colors';
import { moderateScale } from '../../util/scale';

const BaseComponent = styled(Animated.View)<{ focused: boolean }>`
  background-color: ${({ focused }) => focused && colors.background2};
  border-radius: ${moderateScale(24)}px;
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  justify-content: center;
  align-items: center;
`;

interface TabIconProps {
  icon: JSX.Element;
  focused: boolean;
}

const TabIcon: FC<TabIconProps> = ({ icon, focused }) => {
  return <BaseComponent focused={focused}>{icon}</BaseComponent>;
};

export default memo(TabIcon);
