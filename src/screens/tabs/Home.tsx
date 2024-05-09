import React, { useCallback } from 'react';
import { ColorSchemeName, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import styled from 'styled-components';
import { default as SearchIcon } from '../../assets/icons/Search.svg';
import { Screen, TextInput } from '../../components/atom';
import { BeverageListItem } from '../../components/molecule';
import colors from '../../constants/colors';
import { useTheme } from '../../context/ThemeProvider';
import { useTranslation } from '../../context/TranslationProvider';
import { horizontalScale, verticalScale } from '../../util/scale';

const BaseComponent = styled(Screen)<{ theme?: ColorSchemeName }>`
  background-color: ${({ theme }) =>
    theme && theme === 'dark' ? colors.background5 : colors.background1};
  padding-top: ${verticalScale(12)}px;
  padding-horizontal: ${horizontalScale(16)}px;
`;

const HeaderInput = styled(TextInput)`
  padding-left: ${horizontalScale(16)}px;
`;

export const Home = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  useFocusEffect(() => {
    (async () => {
      const a = await RNFS.readDir('/var/mobile/Library/ExternalAccessory');
      console.log({ a });
    })();
  });

  const renderItem = useCallback(({ item }: any) => {
    return <BeverageListItem {...item} />;
  }, []);

  return (
    <BaseComponent theme={theme} edges={['left', 'right', 'top']}>
      <HeaderInput
        placeholder={t('home.searchPlaceholder')}
        wrapperStyle={{
          minHeight: verticalScale(40),
          marginBottom: verticalScale(12),
        }}
        icon={<SearchIcon />}
      />
      <FlatList
        numColumns={2}
        data={[
          { id: 0, name: 'Cappuccino', image: 'cappuccino' },
          { id: 1, name: 'Cappuccino', image: 'cappuccino' },
          { id: 2, name: 'Cappuccino', image: 'cappuccino' },
          { id: 3, name: 'Cappuccino', image: 'cappuccino' },
          { id: 4, name: 'Cappuccino', image: 'cappuccino' },
        ]}
        columnWrapperStyle={{ paddingTop: verticalScale(8), justifyContent: 'space-between' }}
        contentContainerStyle={{
          paddingVertical: verticalScale(12),
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </BaseComponent>
  );
};
