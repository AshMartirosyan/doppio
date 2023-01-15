import React from 'react';
import { ColorSchemeName, InteractionManager } from 'react-native';
import styled from 'styled-components';
import { Button, Screen } from '../../components/atom';
import colors from '../../constants/colors';
import { useTheme } from '../../context/ThemeProvider';
import { navigationRef } from '../../navigation/navigationHelper';
import { useAppDispatch } from '../../store';
import { logOut } from '../../store/commonActions';
import { horizontalScale } from '../../util/scale';

const BaseComponent = styled(Screen)<{ theme?: ColorSchemeName }>`
  background-color: ${({ theme }) =>
    theme && theme === 'dark' ? colors.background5 : colors.background1};
  padding-horizontal: ${horizontalScale(16)}px;
`;

export const More = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  return (
    <BaseComponent theme={theme} style={{ justifyContent: 'center' }}>
      <Button
        style={{ alignSelf: 'center' }}
        text={'Log out'}
        onPress={() => {
          dispatch(logOut());
          navigationRef.current?.navigate('Tab', { screen: 'Home' });
          InteractionManager.runAfterInteractions(() => {
            navigationRef.current?.navigate('Auth', { screen: 'Login' });
          });
        }}
      />
    </BaseComponent>
  );
};
