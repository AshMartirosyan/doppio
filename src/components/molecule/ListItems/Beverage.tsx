import React, { FC, memo, useCallback } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import InfoIcon from '../../../assets/icons/Info.svg';
import { images } from '../../../assets/images';
import colors from '../../../constants/colors';
import { MainNavigationProp } from '../../../navigation/navigationHelper';
import { moderateScale } from '../../../util/scale';
import { IconButton, Text } from '../../atom';

const BaseComponent = styled(TouchableOpacity)`
  width: ${moderateScale(160, 1)}px;
  height: ${moderateScale(184, 1)}px;
  justify-content: space-between;
  background-color: ${colors.background3};
  border-radius: ${moderateScale(16, 1)}px;
  border-width: ${moderateScale(1)}px;
  border-color: ${colors.background3};
  overflow: hidden;
`;

const BeverageImage = styled(Image)`
  width: ${moderateScale(158, 1)}px;
  height: ${moderateScale(148, 1)}px;
  border-radius: ${moderateScale(16, 1)}px;
`;

const Name = styled(Text)`
  flex: 1;
  padding-top: ${moderateScale(8)}px;
  font-weight: 400;
  padding-horizontal: ${moderateScale(13)}px;
  color: ${colors.text1};
`;

const Info = styled(IconButton)`
  position: absolute;
  height: ${moderateScale(32)}px;
  width: ${moderateScale(32)}px;
  top: 0;
  right: 0;
`;

interface Props {
  id: number;
  name: string;
  image: string;
}

export const BeverageListItem: FC<Props> = memo(({ id, name, image }) => {
  const navigation = useNavigation<MainNavigationProp>();

  const onInfo = useCallback(() => {
    navigation.push('BeverageInfo', { id });
  }, [id, navigation]);

  return (
    <BaseComponent>
      <BeverageImage resizeMode="cover" source={(images as Record<string, any>)[image]} />
      <Name fontSize={13}>{name}</Name>
      <Info
        hitSlop={{ left: moderateScale(12), bottom: moderateScale(12) }}
        icon={<InfoIcon />}
        onPress={onInfo}
      />
    </BaseComponent>
  );
});
