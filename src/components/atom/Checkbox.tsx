import React, { FC, memo, ReactNode, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { default as CheckboxIcon } from '../../assets/icons/Checkbox.svg';
import { default as CheckboxCheckedIcon } from '../../assets/icons/CheckboxChecked.svg';
import { horizontalScale, verticalScale } from '../../util/scale';

const BaseComponent = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-horizontal: ${horizontalScale(12)}px;
  padding-vertical: ${verticalScale(12)}px;
`;

const Icon = styled(View)`
  justify-content: center;
  align-items: center;
`;

interface Props {
  onCheck: (value: boolean) => void;
  checked: boolean;
  children?: ReactNode;
}

const Checkbox: FC<Props> = ({ checked = false, onCheck, children }) => {
  const handleCheck = useCallback(() => {
    onCheck(!checked);
  }, [checked, onCheck]);
  return (
    <BaseComponent onPress={handleCheck}>
      <Icon>{checked ? <CheckboxCheckedIcon /> : <CheckboxIcon />}</Icon>
      {children}
    </BaseComponent>
  );
};

export default memo(Checkbox);
