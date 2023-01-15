import { View } from 'react-native';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import { horizontalScale, verticalScale } from '../../../util/scale';
import { Button, PressableText, Screen, Text } from '../../atom';

export const BaseAuth = styled(Screen)<{ backgroundColor?: string }>`
  padding-bottom: ${verticalScale(12)}px;
  padding-horizontal: ${horizontalScale(16)}px;
  background-color: ${({ backgroundColor }) => backgroundColor || colors.backgroundAuth};
`;

export const BottomContainer = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const BottomNavLink = styled(PressableText)`
  padding-top: ${verticalScale(16)}px;
`;

export const NavLinkSecondPart = styled(Text)`
  font-weight: 300;
  color: ${colors.textBlack};
`;

export const NavLink = styled(PressableText)`
  padding-top: ${verticalScale(17)}px;
  padding-bottom: ${verticalScale(19)}px;
  align-self: flex-end;
`;

export const Divider = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Line = styled(View)`
  flex: 1;
  height: ${verticalScale(1)}px;
  background-color: ${colors.textBlack};
  opacity: 0.8;
`;
export const DividerText = styled(Text)`
  padding-horizontal: ${horizontalScale(7)}px;
`;
export const ErrorText = styled(Text)`
  color: ${colors.errorRed};
  font-weight: 300;
  padding-bottom: ${verticalScale(13)}px;
  text-align: center;
  align-self: flex-start;
  min-height: ${verticalScale(32)}px;
`;

export const IconContainer = styled(View)`
  flex-direction: row;
  padding-top: ${verticalScale(20)}px;
  padding-bottom: ${verticalScale(30)}px;
  align-items: center;
  justify-content: center;
`;

export const IconDivider = styled(View)`
  width: ${horizontalScale(64)}px;
`;
