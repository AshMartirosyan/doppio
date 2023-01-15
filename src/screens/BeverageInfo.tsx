import React from 'react';
import { ColorSchemeName } from 'react-native';
import styled from 'styled-components';
import { Screen } from '../components/atom';
import colors from '../constants/colors';
import { useTheme } from '../context/ThemeProvider';
import { horizontalScale } from '../util/scale';

const BaseComponent = styled(Screen)<{ theme?: ColorSchemeName }>`
  background-color: ${({ theme }) =>
    theme && theme === 'dark' ? colors.background5 : colors.background1};
  padding-horizontal: ${horizontalScale(16)}px;
`;

export const BeverageInfo = () => {
  const { theme } = useTheme();

  return <BaseComponent theme={theme} />;
};
