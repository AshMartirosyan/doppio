import React, { FC, memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { default as BackIcon } from '../../assets/icons/Back.svg';
import { HEADER_HEIGHT } from '../../constants/sizes';
import { horizontalScale } from '../../util/scale';
import IconButton from './IconButton';

const BaseComponent = styled(View)`
  flex-direction: row;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${horizontalScale(4)}px;
`;

const LeftContainer = styled(View)`
  flex: 1;
`;
const RightContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

interface Props {
  onBack?: () => void;
  rightComponent?: JSX.Element;
  hasBack?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Header: FC<Props> = ({ onBack, rightComponent, hasBack = true, style }) => {
  return (
    <BaseComponent style={style}>
      <LeftContainer>
        {hasBack && <IconButton icon={<BackIcon />} onPress={onBack} />}
      </LeftContainer>
      <RightContainer>{rightComponent}</RightContainer>
    </BaseComponent>
  );
};

export default memo(Header);
